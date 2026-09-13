export const REEL_MARKUP = `
<div class="reel" id="reel" tabindex="0" aria-label="StackIn promotional reel &mdash; use arrow keys to navigate, space to pause, escape to close">
  <div class="stage" id="stage">
    <div class="progress" id="progress">
      <div class="seg"><span class="fill"></span></div>
      <div class="seg"><span class="fill"></span></div>
      <div class="seg"><span class="fill"></span></div>
      <div class="seg"><span class="fill"></span></div>
      <div class="seg"><span class="fill"></span></div>
      <div class="seg"><span class="fill"></span></div>
      <div class="seg"><span class="fill"></span></div>
    </div>

    <div class="brandmark"><div class="brand-logo brand-logo--mark" role="img" aria-label="StackIn"></div></div>
    <a class="close-btn" href="/" aria-label="Close and return to the StackIn website">&times;</a>

    <section class="scene active" data-duration="4200" id="scene0">
      <canvas class="chaos-canvas" id="chaosCanvas"></canvas>
      <h1 class="headline">You didn't start a business<br>to become an accountant.</h1>
    </section>

    <section class="scene" data-duration="4800" id="scene1">
      <h2 class="headline small">Complicated dashboards.<br>Endless menus.<br>A learning curve you don't have time for.</h2>
      <div class="tag-row">
        <span class="tag">12 menus, one report</span>
        <span class="tag">38-minute setup video</span>
        <span class="tag">Accounting degree not included</span>
      </div>
    </section>

    <section class="scene" data-duration="3600" id="scene2">
      <div class="logo-reveal">
        <div class="brand-logo brand-logo--reveal" role="img" aria-label="StackIn"></div>
      </div>
      <p class="sub">No tutorials. No manual. Just your numbers.</p>
    </section>

    <section class="scene" data-duration="4800" id="scene3">
      <h2 class="headline small">Connect your accounts<br>once.</h2>
      <p class="sub">Every deposit, every expense &mdash; sorted the moment it hits your bank.</p>
      <svg class="sync-diagram" viewBox="0 0 300 140">
        <path class="sync-path" pathLength="100" d="M60,70 C130,20 170,120 240,70"></path>
        <circle class="sync-dot" r="4" style="offset-path: path('M60,70 C130,20 170,120 240,70');"></circle>

        <circle class="node-ring" cx="60" cy="70" r="26"></circle>
        <g class="bank-mark" transform="translate(60,70)">
          <path d="M -13,7 L 13,7 M -10,7 L -10,-3 M -3,7 L -3,-3 M 3,7 L 3,-3 M 10,7 L 10,-3 M -14,-3 L 0,-12 L 14,-3 Z"></path>
        </g>
        <text class="node-label" x="60" y="112" text-anchor="middle">YOUR BANK</text>

        <circle class="node-ring" cx="240" cy="70" r="26"></circle>
        <text class="stackin-mark" x="240" y="76" text-anchor="middle">$</text>
        <text class="node-label" x="240" y="112" text-anchor="middle">STACKIN</text>
      </svg>
    </section>

    <section class="scene" data-duration="5200" id="scene4">
      <h2 class="headline small">Know your real profit.<br>Every day.</h2>
      <div class="stats-row">
        <div class="stat">
          <span class="label">Revenue, this month</span>
          <span class="value" data-countup="6140">$0</span>
        </div>
        <div class="stat">
          <span class="label">Net profit, this month</span>
          <span class="value" data-countup="4286">$0</span>
        </div>
      </div>
      <div class="bars">
        <span class="bar" style="--h:26%; --i:0;"></span>
        <span class="bar" style="--h:34%; --i:1;"></span>
        <span class="bar" style="--h:30%; --i:2;"></span>
        <span class="bar" style="--h:48%; --i:3;"></span>
        <span class="bar" style="--h:60%; --i:4;"></span>
        <span class="bar" style="--h:78%; --i:5;"></span>
      </div>
      <p class="bars-caption">Monthly &middot; quarterly &middot; yearly reports</p>
    </section>

    <section class="scene" data-duration="3400" id="scene5">
      <h2 class="headline payoff">Less guessing.<br>More knowing where you stand.</h2>
      <span class="payoff-rule"></span>
    </section>

    <section class="scene" data-duration="7000" id="scene6">
      <div class="brand-logo brand-logo--cta" role="img" aria-label="StackIn"></div>
      <p class="tagline">Built for people who run their own show.</p>
      <a class="cta-button" href="/#pricing" target="_top">Start Free &rarr;</a>
      <button class="replay" id="replayBtn" type="button">&#8635; Watch again</button>
    </section>
  </div>
</div>
`;
