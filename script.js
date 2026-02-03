/* ================= HEARTS ================= */
const heartsBox = document.getElementById("hearts");

for(let i=0;i<35;i++){
  const h=document.createElement("div");
  h.className="heart";
  h.innerText="❤️";
  h.style.left=Math.random()*100+"%";
  h.style.top=Math.random()*100+"%";
  h.style.animationDuration=6+Math.random()*4+"s";
  heartsBox.appendChild(h);
}

/* ================= MUSIC ================= */
const music = document.getElementById("bgMusic");
let volumeState = 1; // 1=mid

function toggleMusic(){
  if(music.paused){
    music.volume = volumeState===0?0.3:volumeState===1?0.6:1;
    music.play();
  }else{
    volumeState=(volumeState+1)%4;
    if(volumeState===0){music.volume=0;}
    if(volumeState===1){music.volume=0.3;}
    if(volumeState===2){music.volume=0.6;}
    if(volumeState===3){music.volume=1;}
  }
}

/* ================= LOCK ================= */
const PASSWORD="rajkumari";
let wrongCount=0;

const taunts=[
  "Arre Ghelsodi 😝 itna bhi mushkil nahi tha!",
  "Dhapudiii 😜 thoda dil se try kar!",
  "Bhilan ❌ 3 saal ka pyaar yaad nahi?",
  "Wagri 🤯 itna galat kaise ho sakti ho!",
  "Gaanduu Insaan 🤦‍♂️ last chance…"
];

function unlock(){
  const input=document.getElementById("password");
  const msg=document.getElementById("lockMsg");
  const val=input.value.trim().toLowerCase();

  if(val===PASSWORD){
    msg.innerText="💖 Unlocked Successfully 💖";
    confettiBoom();
    music.currentTime=62;
    music.play();
  }else{
    wrongCount++;
    input.classList.add("shake");
    setTimeout(()=>input.classList.remove("shake"),400);

    if(wrongCount<=taunts.length){
      msg.innerText=taunts[wrongCount-1];
    }

    if(wrongCount===5){
      msg.innerText +=
      "\n\nHint ❤️\nAgar Yuvraj Rajkumar hai…\nTo tum uski Rajkumari ho 👑";
    }
  }
}

/* ================= CONFETTI ================= */
function confettiBoom(){
  for(let i=0;i<30;i++){
    const c=document.createElement("div");
    c.innerText="❤️";
    c.style.position="fixed";
    c.style.left=Math.random()*100+"%";
    c.style.top="50%";
    c.style.fontSize="24px";
    c.style.animation="boom 1.2s forwards";
    document.body.appendChild(c);
    setTimeout(()=>c.remove(),1200);
  }
}

const style=document.createElement("style");
style.innerHTML=`
@keyframes boom{
  from{transform:translateY(0) scale(1);opacity:1;}
  to{transform:translateY(-200px) scale(1.5);opacity:0;}
}`;
document.head.appendChild(style);
