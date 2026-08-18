(()=>{
  const JOKES=[
    ['🐘','Why don’t elephants use computers?','They’re afraid of the mouse.'],
    ['🐂','What do you call a sleeping bull?','A bulldozer.'],
    ['🐄','Why did the cow cross the road?','To get to the udder side.'],
    ['🐻','What do you call a bear with no teeth?','A gummy bear.'],
    ['🐟','Why are fish so smart?','Because they live in schools.'],
    ['🐊','What do you call an alligator in a vest?','An investigator.'],
    ['🐱','What do cats eat for breakfast?','Mice Krispies.'],
    ['🐷','What do you call a pig that knows karate?','A pork chop.'],
    ['🦪','Why don’t oysters share their pearls?','Because they’re shellfish.'],
    ['🐰','What do you call a rabbit with fleas?','Bugs Bunny.'],
    ['🐔','Why did the chicken join a band?','Because it had the drumsticks.'],
    ['🐕','What do you call a dog magician?','A Labracadabrador.'],
    ['🐒','What kind of key opens a banana?','A monkey.'],
    ['🦆','Why did the duck become a detective?','It always quacked the case.'],
    ['🐄','What do you call a cow during an earthquake?','A milkshake.'],
    ['🐌','What do you call a snail on a ship?','A snailor.'],
    ['🐸','Why are frogs so happy?','They eat whatever bugs them.'],
    ['🦉','What do you call an owl who does magic?','Hoo-dini.'],
    ['🐧','What do penguins wear on their heads?','Ice caps.']
  ];

  const style=document.createElement('style');
  style.textContent=`
  #masonMilestone{position:fixed;inset:0;z-index:5000;display:grid;place-items:center;padding:20px;background:radial-gradient(circle at 50% 45%,rgba(255,31,73,.28),rgba(0,0,0,.88) 64%);backdrop-filter:blur(8px);animation:msFade .25s ease-out both;touch-action:none}
  #masonMilestone .msCard{position:relative;width:min(430px,91vw);padding:30px 24px 28px;border-radius:24px;border:1px solid rgba(255,255,255,.22);background:linear-gradient(145deg,#171719,#060607 62%,#25050c);box-shadow:0 30px 90px #000,0 0 55px rgba(255,31,73,.28);text-align:center;animation:msPop .55s cubic-bezier(.18,.9,.22,1.2) both;overflow:hidden;color:#fff}
  #masonMilestone .msCard:before{content:'';position:absolute;inset:-60%;background:conic-gradient(from 45deg,transparent,#ff1f4930,transparent,#fff2,transparent);animation:msSpin 5s linear infinite;pointer-events:none}
  #masonMilestone .msX{position:absolute;right:12px;top:12px;z-index:2;width:42px;height:42px;border-radius:50%;border:1px solid #ffffff33;background:#050505e8;color:#fff;font-size:24px;line-height:38px;font-weight:900}
  #masonMilestone .msEmoji{position:relative;z-index:1;font-size:72px;line-height:1;margin:4px 0 12px;filter:drop-shadow(0 10px 18px #0008);animation:msBounce .7s .15s both}
  #masonMilestone .msPts{position:relative;z-index:1;color:#ff9cb1;font-size:10px;font-weight:900;letter-spacing:.24em;text-transform:uppercase}
  #masonMilestone h2{position:relative;z-index:1;margin:10px 0 12px;font:900 clamp(25px,7.5vw,38px)/1.02 Impact,'Arial Black',sans-serif;letter-spacing:.02em}
  #masonMilestone .msAnswer{position:relative;z-index:1;margin:0;color:#ffb34f;font:900 clamp(23px,7vw,34px)/1.05 Impact,'Arial Black',sans-serif}
  #masonMilestone .msResume{position:relative;z-index:1;margin:18px 0 0;color:#aaa;font-size:8px;letter-spacing:.16em;text-transform:uppercase}
  #masonExplosion{position:fixed;inset:0;z-index:6000;overflow:hidden;background:radial-gradient(circle at 50% 50%,#fff 0 2%,#ffd15a 8%,#ff4b20 20%,#a60024 42%,#090002 74%);animation:boomBg 4.7s ease-out forwards;touch-action:none}
  #masonExplosion .boomTitle{position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);z-index:4;width:100%;text-align:center;font:900 clamp(56px,18vw,118px)/.82 Impact,'Arial Black',sans-serif;color:#fff;text-shadow:0 0 18px #fff,0 0 50px #ff3b16,0 7px 0 #65000e;animation:boomTitle 4.5s cubic-bezier(.12,.8,.2,1) forwards}
  #masonExplosion .boomTitle small{display:block;font:900 clamp(15px,4vw,24px)/1 Arial,sans-serif;letter-spacing:.28em;margin-top:18px;text-shadow:0 0 18px #ff5a2d}
  #masonExplosion .shard{position:absolute;left:50%;top:50%;width:var(--w);height:var(--h);background:linear-gradient(135deg,#fff,#ff9d31 30%,#bd092d 74%,#250006);box-shadow:0 0 18px #ff4b23;animation:shardFly var(--dur) cubic-bezier(.08,.8,.15,1) forwards;animation-delay:var(--delay)}
  @keyframes msFade{from{opacity:0}to{opacity:1}}@keyframes msPop{0%{transform:scale(.58) rotate(-4deg);opacity:0}70%{transform:scale(1.04) rotate(1deg);opacity:1}100%{transform:scale(1);opacity:1}}@keyframes msSpin{to{transform:rotate(360deg)}}@keyframes msBounce{0%{transform:translateY(-35px) scale(.4) rotate(-18deg);opacity:0}70%{transform:translateY(6px) scale(1.12) rotate(6deg);opacity:1}100%{transform:none;opacity:1}}
  @keyframes boomBg{0%{opacity:0;transform:scale(.3)}8%{opacity:1;transform:scale(1.18)}18%{transform:scale(1)}72%{opacity:1}100%{opacity:0}}@keyframes boomTitle{0%{opacity:0;transform:translate(-50%,-50%) scale(.1) rotate(-18deg)}15%{opacity:1;transform:translate(-50%,-50%) scale(1.2) rotate(4deg)}32%{transform:translate(-50%,-50%) scale(.96)}80%{opacity:1}100%{opacity:0;transform:translate(-50%,-50%) scale(1.8)}}@keyframes shardFly{0%{transform:translate(-50%,-50%) rotate(0) scale(.3);opacity:1}100%{transform:translate(calc(-50% + var(--x)),calc(-50% + var(--y))) rotate(var(--r)) scale(1.8);opacity:0}}
  `;
  document.head.appendChild(style);

  const milestoneScript=document.currentScript;
  const milestoneBase=(milestoneScript&&milestoneScript.src?milestoneScript.src:'').replace(/milestone\.js(?:\?.*)?$/,'');
  const audio=new Audio(); audio.preload='auto'; audio.volume=1;
  let audioReady=false,userInteracted=false,primed=false,lastTriggered=0,open=false,frozen=false,queued=[];
  fetch(milestoneBase+'milestone.b64',{cache:'force-cache'}).then(r=>{if(!r.ok)throw new Error('audio');return r.text()}).then(b64=>{audio.src='data:audio/mpeg;base64,'+b64.trim();audio.load();audioReady=true;if(userInteracted)primeAudio()}).catch(()=>{});
  const nativeRAF=window.requestAnimationFrame.bind(window);
  const nativeCancel=window.cancelAnimationFrame.bind(window);

  function primeAudio(){
    userInteracted=true;if(primed||!audioReady)return;primed=true;
    const p=audio.play();
    if(p&&p.then)p.then(()=>{audio.pause();audio.currentTime=0}).catch(()=>{});
  }
  document.addEventListener('pointerdown',primeAudio,{once:true,capture:true});
  document.addEventListener('touchstart',primeAudio,{once:true,capture:true,passive:true});

  function playClip(){
    const sound=document.getElementById('sound');
    if(sound&&sound.classList.contains('muted'))return;
    try{audio.pause();audio.currentTime=0;const p=audio.play();if(p&&p.catch)p.catch(()=>{});}catch(e){}
  }

  function freezeGame(){
    if(frozen)return;frozen=true;queued=[];
    window.requestAnimationFrame=cb=>{queued.push(cb);return -queued.length};
    window.cancelAnimationFrame=id=>{if(id<0){const i=-id-1;if(i>=0&&i<queued.length)queued[i]=null}else nativeCancel(id)};
    const cv=document.getElementById('gameCanvas');if(cv)cv.style.pointerEvents='none';
  }
  function resumeGame(){
    if(!frozen)return;frozen=false;
    window.requestAnimationFrame=nativeRAF;window.cancelAnimationFrame=nativeCancel;
    const cv=document.getElementById('gameCanvas');if(cv)cv.style.pointerEvents='';
    const q=queued.filter(Boolean);queued=[];q.forEach(cb=>nativeRAF(cb));
  }

  function showJoke(points){
    open=true;freezeGame();playClip();
    const j=JOKES[Math.max(0,Math.min(JOKES.length-1,points/10-1))];
    const ov=document.createElement('div');ov.id='masonMilestone';
    ov.innerHTML=`<div class="msCard"><button class="msX" aria-label="Close joke">×</button><div class="msPts">${points} POINTS • ANIMAL BREAK</div><div class="msEmoji">${j[0]}</div><h2>${j[1]}</h2><div class="msAnswer">${j[2]}</div><div class="msResume">Close to keep shooting</div></div>`;
    document.body.appendChild(ov);
    ov.querySelector('.msX').onclick=()=>{if(!ov.isConnected)return;ov.style.animation='msFade .2s ease-in reverse both';setTimeout(()=>{ov.remove();open=false;resumeGame();},180)};
  }

  function explode200(){
    open=true;freezeGame();playClip();
    const ex=document.createElement('div');ex.id='masonExplosion';let shards='';
    for(let i=0;i<42;i++){const a=Math.PI*2*i/42+(Math.random()-.5)*.26,d=220+Math.random()*520,x=Math.cos(a)*d,y=Math.sin(a)*d,r=Math.random()*900-450,w=12+Math.random()*44,h=7+Math.random()*28,dur=1.2+Math.random()*2,delay=Math.random()*.18;shards+=`<i class="shard" style="--x:${x}px;--y:${y}px;--r:${r}deg;--w:${w}px;--h:${h}px;--dur:${dur}s;--delay:${delay}s"></i>`}
    ex.innerHTML=`${shards}<div class="boomTitle">200!<small>ABSOLUTE ANIMAL</small></div>`;document.body.appendChild(ex);
    setTimeout(()=>{try{audio.pause()}catch(e){};location.reload()},4700);
  }

  function checkScore(){
    if(open)return;const sc=document.getElementById('sc');if(!sc)return;
    const n=parseInt(sc.textContent||'0',10);if(!Number.isFinite(n)||n<10||n>200||n%10!==0||n===lastTriggered)return;
    lastTriggered=n;n===200?explode200():showJoke(n);
  }
  new MutationObserver(checkScore).observe(document.documentElement,{subtree:true,childList:true,characterData:true});
  setInterval(checkScore,500);
})();
