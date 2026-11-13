const g=`
  <div class="dining-floor"></div>
  <div class="dining-wall rear"><div class="room-window"><i></i></div><div class="room-door"></div><div class="wall-trim"></div></div>
  <div class="dining-wall side"><div class="wall-trim"></div></div>
  <div class="dining-rug"></div>
  <div class="character"><i class="head"></i><i class="body"></i><i class="legs"></i><i class="arm cover"></i><i class="arm grip"></i></div>
  <div class="dining-table"><i class="table-top"></i><i class="table-front"></i><i class="table-side"></i><i class="leg rear-left"></i><i class="leg rear-right"></i><i class="leg front-left"></i><i class="leg front-right"></i></div>`,u=`
  <div class="junction-base"></div>
  <div class="junction-river"></div>
  <div class="junction-road"></div>
  <div class="junction-hill"></div>
  <div class="junction-path"></div>
  <div class="junction-bridge"></div>
  <div class="trees"><i></i><i></i><i></i><i></i><i></i></div>
  <div class="route-walker"></div>`,h={"dining-hall":{artwork:g,labels:{table:"Sturdy table",window:"Window",doorway:"Doorway"},response:"Get low, cover your head and neck, and hold the table leg."},"flood-junction":{artwork:u,labels:{road:"Flooded road",uphill:"Dry uphill path",bridge:"Bridge approach"},response:"Follow the dry path uphill without entering the water."}};function w(l,{scenario:e,calmMode:r,reducedMotion:n,feedback:t=!1,onReady:o,onChoose:c}){const s=h[e.sceneId];if(!s)throw new Error("Unknown scene: "+e.sceneId);const v=r||n;l.innerHTML=`
    <div class="spatial-view ${e.sceneId} ${v?"stable":""} ${t?"demonstration":""}">
      <div class="scene-world" aria-hidden="true">${s.artwork}</div>
      ${t?"":e.choices.map((i,a)=>`
        <button type="button" class="scene-target target-${a}" data-target="${i.id}" aria-label="${s.labels[i.id]}: ${i.label}">
          <span aria-hidden="true">${String.fromCharCode(65+a)}</span>${s.labels[i.id]}
        </button>`).join("")}
    </div>
    <p class="scene-instruction">${t?s.response:"Select a marked spot or use the action list."}</p>`;function d(i){const a=i.target.closest("[data-target]");a&&c(a.dataset.target)}return t||l.addEventListener("click",d),o(),{destroy(){l.removeEventListener("click",d),l.replaceChildren()}}}export{w as mountChallenge};
