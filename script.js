function go(n){
  document.querySelectorAll(".page")
    .forEach(p=>p.classList.remove("active"));
  document.getElementById("p"+n).classList.add("active");
}

/* MUSIC */
function unlock(){
  const m=document.getElementById("music");
  m.currentTime=62;
  m.play();
  go(2);
}

/* HEART GAME */
let caught=0, interval;
const box=document.getElementById("gameBox");
const bar=document.getElementById("bar");
const startBtn=document.getElementById("startGame");

startBtn.onclick=()=>{
  caught=0;
  bar.style.width="0%";
  interval=setInterval(()=>{
    const h=document.createElement("span");
    h.innerText="❤️";
    h.style.position="absolute";
    h.style.left=Math.random()*90+"%";
    h.style.top="-20px";
    h.style.fontSize="24px";
    h.onclick=()=>{
      caught++;
      bar.style.width=(caught/12*100)+"%";
      h.remove();
      if(caught>=12){
        clearInterval(interval);
        go(3);
      }
    };
    box.appendChild(h);
    setTimeout(()=>h.remove(),3000);
  },600);
};

/* YES NO */
let scale=1;
function noClick(){
  scale+=0.2;
  document.getElementById("yesBtn").style.transform=`scale(${scale})`;
  const n=document.getElementById("noBtn");
  if(n.innerText==="No") n.innerText="Please 🥺";
  else if(n.innerText==="Please 🥺") n.innerText="Are you sure?";
  else n.innerText="Click YES!";
}

function yesClick(){
  go(4);
}
