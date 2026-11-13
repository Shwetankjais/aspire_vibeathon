import { icon } from '../../app/icons.js';

export function home() {
  return `
    <main class="home wrap" id="main">
      <section class="hero" aria-labelledby="home-title">
        <div class="hero-copy">
          <p class="eyebrow"><span class="accent-dot"></span> THE DISASTER PREPAREDNESS GAME</p>
          <h1 id="home-title">Disaster<br><span>Dash<span class="title-stop">.</span></span></h1>
          <p class="hero-line">Make the call. Keep your village safe.</p>
          <p class="hero-description">Three emergencies. One decision at a time.<br class="desktop-break"> See how your choices shape what happens next.</p>
          <a id="play-link" class="button primary hero-button" href="#/play">${icon('play')} Play Disaster Dash ${icon('arrow')}</a>
        </div>
        <div class="hero-art" aria-hidden="true"><div class="art-inner"></div><i class="art-corner top"></i><i class="art-corner bottom"></i></div>
      </section>
      <section class="home-facts" aria-label="Game features">
        <div><span class="fact-icon yellow">${icon('grid')}</span><div><strong>Three scenarios</strong><p>Earthquake, flood, and fire</p></div></div>
        <div><span class="fact-icon pink">${icon('clock')}</span><div><strong>Timed decisions</strong><p>20 seconds per round</p></div></div>
        <div><span class="fact-icon mint">${icon('calm')}</span><div><strong>Calm Mode</strong><p>Play at your own pace</p></div></div>
      </section>
    </main>`;
}
