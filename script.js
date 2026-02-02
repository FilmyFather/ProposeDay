/* GLOBAL */
function go(n){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById("page"+n).classList.add("active");
}

/* HEART BACKGROUND */
for(let i=0;i<25;i++){
  let h=document.createElement("span");
  h.innerText="❤️";
  h.style.left=Math.random()*100+"vw";
  h.style.top=Math.random()*100+"vh";
  document.getElementById("heart-bg").appendChild(h);
}

/* MUSIC */
const music=document.getElementById("bgMusic");
document.getElementById("musicCtrl").onclick=()=>{
  music.paused?music.play():music.pause();
};

/* PAGE 1 */
let tries=0;
const taunts=[
 "Arre Ghelsodi 😝 thoda soch!",
 "Dhapudiii 😜 dimag lagao!",
 "Bhilan ❌ galat hai!",
 "Wagri 🤯 firse galat!",
 "Gaanduu Insaan 🤦‍♂️ itna bhi nahi?"
];
function unlock(){
  const v=document.getElementById("passInput").value.toLowerCase();
  if(v==="rajkumari"){
    music.play();
    go(2);
  }else{
    document.getElementById("wrongText").innerText=taunts[tries%5];
    tries++;
    if(tries>=5)document.getElementById("hint").classList.remove("hidden");
  }
}

/* PAGE 3 NO BUTTON */
const no=document.getElementById("noBtn");
if(no){
  no.onmouseenter=()=>moveNo();
  no.onclick=()=>moveNo();
}
function moveNo(){
  no.style.position="absolute";
  no.style.left=Math.random()*70+"vw";
  no.style.top=Math.random()*60+"vh";
}

/* PAGE 4 HUNT */
const hunt=document.getElementById("huntGrid");
const pattern=["💍","💩","💩","💩","💍","💩","💩","💩","💍"];
let found=0;
if(hunt){
  pattern.sort(()=>Math.random()-0.5);
  pattern.forEach(it=>{
    let d=document.createElement("div");
    d.innerText="🌿";
    d.onclick=()=>{
      d.innerText=it;
      if(it==="💍"){
        found++;
        document.getElementById("ringCount").innerText=found;
        if(found===3)setTimeout(()=>go(5),600);
      }
    };
    hunt.appendChild(d);
  });
}

/* PAGE 5 GAME */
const box=document.getElementById("gameBox");
const bar=document.getElementById("barFill");
let caught=0;
document.getElementById("startGame").onclick=()=>{
  caught=0;bar.style.width="0%";
  let i=setInterval(()=>{
    if(!document.getElementById("page5").classList.contains("active")){clearInterval(i);return;}
    let h=document.createElement("div");
    h.className="heart";h.innerText="❤️";
    h.style.left=Math.random()*80+"%";
    h.onclick=()=>{
      caught++;bar.style.width=(caught/12*100)+"%";h.remove();
      if(caught>=12){clearInterval(i);go(6);}
    };
    box.appendChild(h);
    setTimeout(()=>h.remove(),3000);
  },600);
};

/* PAGE 6 LETTER */
const env=document.getElementById("envelope");
if(env){
  env.onclick=()=>{
    env.classList.add("open");
    document.getElementById("letterNext").classList.remove("hidden");
  };
}

/* PAGE 8 YES NO */
let stage=0;
const yes=document.getElementById("yesBtn");
const no8=document.getElementById("noBtn8");
const texts=["NO","PLEASE","ARE YOU SURE?","CLICK YES!"];
if(no8){
  no8.onclick=()=>{
    stage++;
    yes.style.transform=`scale(${1+stage*0.25})`;
    if(stage<texts.length)no8.innerText=texts[stage];
    else no8.style.display="none";
  };
}
if(yes){
  yes.onclick=()=>{
    if(stage>=texts.length){
      confetti();setTimeout(()=>go(9),700);
    }
  };
}
