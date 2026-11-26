// PROTOTYPE - NOT FOR PRODUCTION
// The ad layer: the ONLY file to edit when the real ad network arrives.
//
// The game never talks to an ad network itself. It asks this file for one of two things:
//   Ads.rewarded(placement, rewardText)  -> Promise<boolean>   true only when the ad was watched to the end
//   Ads.interstitial(placement)          -> Promise<void>      resolves when the ad is closed
// Until a network is wired in, both show a test card ("إعلان تجريبي") that makes no network request.
//
// To wire a real network, set window.GAME_ADS before this file runs, or fill ADS_SETUP and write the two
// functions at the bottom (realRewarded, realInterstitial). The shape follows Google's H5 Ad Placement API
// (adBreak with type 'reward' / 'next'), which is what a web game on a phone can use.
//
// Placements, and the rules the game follows (see config.js for the numbers):
//   extra_stop     rewarded   stuck screen: one more stop, once per level attempt
//   undo_refill    rewarded   when the free undos are used up: more undos, once per level attempt
//   stuck_undo     rewarded   stuck screens: take back the last move, when the free undos are used up
//   skip_level     rewarded   after several stuck screens on one level: move on to the next level
//   hint           rewarded   during play: the next move of a line that still wins, after the attempt's free hint
//   between_levels interstitial  only after a win, on "next level": never after a loss, never on restart,
//                               never before the win screen, never before a new era's opening scene
window.ADS_SETUP = {
  network: 'test',        // 'test' until the owner picks a network
  rewardedId: '',         // the network's rewarded unit id
  interstitialId: '',     // the network's interstitial unit id
};

window.Ads = (() => {
  const tune = k => (window.CONFIG && window.CONFIG[k] ? window.CONFIG[k].value : 0);
  const now = () => performance.now() / 1000;
  const KEY = 'gamelab:time-jam:ads';
  let busy = false, lastAdAt = -1e9, winsSinceAd = 0, shownThisSession = 0;

  // Counts per placement, on this device only: offered, started, completed (reward given / ad closed), closed (left early).
  let stats = {};
  try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && typeof s === 'object') stats = s; } catch (e) { /* no storage */ }
  function count(placement, what) {
    const r = stats[placement] || (stats[placement] = { offered: 0, started: 0, completed: 0, closed: 0 });
    r[what] = (r[what] || 0) + 1;
    try { localStorage.setItem(KEY, JSON.stringify(stats)); } catch (e) { /* no storage */ }
  }
  function totals() {
    const t = { offered: 0, started: 0, completed: 0, closed: 0 };
    for (const k in stats) for (const w in t) t[w] += stats[k][w] || 0;
    return t;
  }

  // ---- The test card: a full-screen layer over the game, in the page's own font -------------------
  function card(kind, placement, rewardText, seconds, skipAfter) {
    return new Promise(resolve => {
      const el = document.createElement('div');
      el.setAttribute('dir', 'rtl');
      el.style.cssText = 'position:fixed;inset:0;z-index:99;background:rgba(6,8,20,0.94);display:flex;align-items:center;justify-content:center;font-family:Almarai,"SF Arabic","Geeza Pro","Noto Sans Arabic",Tahoma,sans-serif;color:#fff;touch-action:none;user-select:none;-webkit-user-select:none';
      const box = document.createElement('div');
      box.style.cssText = 'width:min(86vw,420px);background:linear-gradient(#232a4a,#161b33);border:2px solid #ffd34d;border-radius:22px;padding:22px 20px 20px;text-align:center;box-shadow:0 12px 40px rgba(0,0,0,0.6)';
      const tag = document.createElement('div');
      tag.textContent = 'إعلان تجريبي';
      tag.style.cssText = 'display:inline-block;background:#ffd34d;color:#2a1c00;font-weight:800;font-size:15px;border-radius:999px;padding:4px 14px;margin-bottom:14px';
      const title = document.createElement('div');
      title.textContent = kind === 'rewarded' ? 'هنا سيظهر إعلان بمكافأة' : 'هنا سيظهر إعلان بين المراحل';
      title.style.cssText = 'font-weight:800;font-size:22px;margin-bottom:8px';
      const sub = document.createElement('div');
      sub.textContent = kind === 'rewarded' ? `أكمل المشاهدة لتأخذ: ${rewardText}` : 'إعلان قصير، ثم تكمل اللعب';
      sub.style.cssText = 'font-size:17px;color:#cfe0ff;margin-bottom:16px';
      const slot = document.createElement('div'); // where the creative will sit
      slot.style.cssText = 'height:150px;border:2px dashed rgba(255,255,255,0.35);border-radius:14px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;margin-bottom:16px;color:#9fb3d9;font-size:14px';
      const big = document.createElement('div'); big.style.cssText = 'font-weight:800;font-size:44px;color:#fff';
      const where = document.createElement('div'); where.textContent = `الموضع: ${placement}`; where.setAttribute('dir', 'ltr');
      slot.append(big, where);
      const bar = document.createElement('div'); bar.style.cssText = 'height:8px;background:rgba(255,255,255,0.15);border-radius:99px;overflow:hidden;margin-bottom:16px';
      const fill = document.createElement('div'); fill.style.cssText = 'height:100%;width:0;background:#3fe08f;border-radius:99px'; bar.append(fill);
      const btn = document.createElement('button');
      btn.style.cssText = 'font:inherit;font-weight:700;font-size:17px;border-radius:14px;border:2px solid rgba(255,255,255,0.4);background:rgba(255,255,255,0.08);color:#fff;padding:12px 18px;min-height:48px;min-width:200px';
      box.append(tag, title, sub, slot, bar, btn); el.append(box); document.body.append(el);

      const t0 = now(); let done = false, timer = 0;
      const finish = watched => { if (done) return; done = true; clearInterval(timer); el.remove(); resolve(watched); };
      const paint = () => {
        const t = now() - t0, left = Math.max(0, seconds - t);
        big.textContent = left > 0 ? String(Math.ceil(left)) : 'تم';
        fill.style.width = `${Math.min(100, t / Math.max(0.01, seconds) * 100)}%`;
        if (kind === 'rewarded') { btn.textContent = left > 0 ? 'إغلاق (بدون مكافأة)' : 'خذ المكافأة'; btn.disabled = false; }
        else { const wait = skipAfter - t; btn.disabled = wait > 0 && left > 0; btn.style.opacity = btn.disabled ? '0.45' : '1'; btn.textContent = left <= 0 ? 'متابعة' : wait > 0 ? `تخطي بعد ${Math.ceil(wait)}` : 'تخطي'; }
        if (left <= 0 && t > seconds + 0.6) finish(true); // nobody has to press anything at the end
      };
      btn.addEventListener('click', () => { const t = now() - t0; if (btn.disabled) return; finish(t >= seconds); });
      timer = setInterval(paint, 100); paint();
    });
  }

  // ---- Real network hooks: write these two when the ids arrive -------------------------------------
  // Each must resolve exactly once. realRewarded resolves true only if the network says the ad was viewed.
  function realRewarded(placement) { return Promise.resolve(false); }
  function realInterstitial(placement) { return Promise.resolve(); }
  const live = () => window.ADS_SETUP.network !== 'test';

  function run(kind, placement, rewardText) {
    if (busy) return Promise.resolve(false);
    busy = true; count(placement, 'started');
    const ext = window.GAME_ADS; // a provider injected from outside wins over everything here
    const p = ext ? (kind === 'rewarded' ? ext.rewarded(placement) : Promise.resolve(ext.interstitial(placement)).then(() => true))
      : live() ? (kind === 'rewarded' ? realRewarded(placement) : realInterstitial(placement).then(() => true))
      : card(kind, placement, rewardText, tune('ads_test_seconds'), tune('ads_test_skip'));
    return Promise.resolve(p).catch(() => false).then(watched => {
      busy = false; lastAdAt = now(); winsSinceAd = 0; // any ad, rewarded too, restarts the wait before the next forced one
      count(placement, watched ? 'completed' : 'closed');
      return !!watched;
    });
  }

  return {
    get busy() { return busy; },
    get stats() { return stats; },
    totals,
    /** The game shows a button that leads to an ad: counted so the owner can see offer -> watch rates. */
    offered(placement) { count(placement, 'offered'); },
    /** A rewarded ad the player asked for. With ads switched off (ads_on 0) the reward is simply given. */
    rewarded(placement, rewardText) { return tune('ads_on') ? run('rewarded', placement, rewardText) : Promise.resolve(true); },
    /** A level was won: the forced-ad rules count wins, not attempts. */
    noteWin() { winsSinceAd++; },
    /** Is a between-levels ad due after winning this level? Never on a new era's opening, never too soon. */
    interstitialDue(level, eraChange) {
      return !!tune('ads_on') && !busy && !eraChange && level >= tune('ads_first_level') && winsSinceAd >= tune('ads_every_wins')
        && now() - lastAdAt >= tune('ads_gap') && shownThisSession < tune('ads_session_cap');
    },
    interstitial(placement) { shownThisSession++; return run('interstitial', placement, '').then(() => {}); },
  };
})();
