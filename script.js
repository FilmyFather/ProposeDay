let currentPage=1;
const pages=document.querySelectorAll(".page");
const music=document.getElementById("bgMusic");

/* PAGE SWITCH */
function go(n){
 pages.forEach(p=>p.classList.remove("active"));
 document.getElementById("p"+n).classList.add("active");
 currentPage=n;
 if(n===2)loadQuestion();
 if(n===4)initHunt();
}

/* HEARTS */
const hb=document.getElementById("hearts");
for(let i=0;i<30;i++){
 const h=document.createElement("div");
 h.className="heart";h.innerText="❤️";
 h.style.left=Math.random()*100+"%";
 h.style.top=Math.random()*100+"%";
 h.style.fontSize=12+Math.random()*18+"px";
 hb.appendChild(h);
}

/* MUSIC */
const opts=document.getElementById("musicOpts");
function toggleOptions(){opts.classList.toggle("show")}
function setVolume(v){
 if(v===0)music.pause();
 else{music.volume=v;if(music.paused)music.play().catch(()=>{})}
 opts.classList.remove("show");
}

/* DRAG MUSIC */
const wrap=document.getElementById("musicWrap");
let drag=false,dx=0,dy=0;
wrap.onpointerdown=e=>{drag=true;dx=e.offsetX;dy=e.offsetY};
document.onpointermove=e=>{
 if(!drag)return;
 wrap.style.left=(e.clientX-dx)+"px";
 wrap.style.top=(e.clientY-dy)+"px";
 wrap.style.right="auto";
};
document.onpointerup=()=>drag=false;

/* LOCK */
const PASSWORD="rajkumari";
let wrong=0;
const taunts=[
 "Arre Ghelsodi 😝 poora dhyaan de!",
 "Dhapudiii 😜 fir se galat!",
 "Bhilan ❌ itna mushkil nahi!",
 "Wagri 🤯 soch ke daal!",
 "Gaanduu Insaan 🤦‍♂️"
];

function unlock(){
 const val=password.value.toLowerCase().trim();
 if(val===PASSWORD){
  confetti({particleCount:200,spread:120});
  music.currentTime=62;
  music.play().catch(()=>{});
  go(2);
  return;
 }
 if(wrong<taunts.length)lockMsg.innerText=taunts[wrong];
 wrong++;
 if(wrong===5){
  lockMsg.innerHTML+=`<div class="hint-box">Hint: Agar Yuvraj Rajkumar hai… to tum uski kya ho?</div>`;
 }
 password.classList.add("shake");
 setTimeout(()=>password.classList.remove("shake"),300);
}

/* QUIZ */
const quiz=[
 {q:"Who is the lucky one?",o:["Me","You","Both","Us","Always You"],a:2},
 {q:"After 3 years, what matters most?",o:["Looks","Money","Trust","Fame","Status"],a:2}
];
let qi=0;

function loadQuestion(){
 question.innerText=quiz[qi].q;
 options.innerHTML="";
 quiz[qi].o.forEach((t,i)=>{
  const b=document.createElement("div");
  b.className="quiz-option";b.innerText=t;
  b.onclick=()=>{
   if(i===quiz[qi].a){
    b.classList.add("correct");
    confetti({particleCount:80});
    setTimeout(()=>{qi++;qi<quiz.length?loadQuestion():go(3)},600);
   }else b.classList.add("wrong","shake");
  };
  options.appendChild(b);
 });
}

/* PAGE 3 NO */
noBtn.onmouseover=()=>{noBtn.style.left=Math.random()*80+"%";noBtn.style.top=Math.random()*80+"%"};

/* HUNT */
let found=0;
function initHunt(){
 found=0;ringCount.innerText="0";huntGrid.innerHTML="";
 const items=["💍","💍","💍","🍃","🍃","🍃","🍃","🍃","🍃"].sort(()=>Math.random()-.5);
 items.forEach(it=>{
  const c=document.createElement("div");
  c.className="card";c.innerText="❓";
  c.onclick=()=>{
   if(it==="💍"){c.innerText="💍";ringCount.innerText=++found;if(found===3)setTimeout(()=>go(5),1000);}
   else c.innerText="💩";
   c.onclick=null;
  };
  huntGrid.appendChild(c);
 });
}

/* GAME */
let caught=0,intv;
function startGame(){
 caught=0;bar.style.width="0%";gameBox.innerHTML="";
 clearInterval(intv);
 intv=setInterval(()=>{
  if(currentPage!==5)return;
  const h=document.createElement("div");
  h.className="fall-heart";h.innerText="❤️";h.style.left=Math.random()*85+"%";
  h.onclick=e=>{
   e.stopPropagation();
   caught++;bar.style.width=(caught/12*100)+"%";
   h.remove();
   if(caught>=12){clearInterval(intv);setTimeout(()=>go(6),500);}
  };
  gameBox.appendChild(h);
  setTimeout(()=>h.remove(),3000);
 },600);
}

/* LETTER */
function openLetter(){letter.classList.toggle("show")}

/* PHOTOS */
function openPhoto(s){modalImg.src=s;photoModal.style.display="flex"}
function closePhoto(){photoModal.style.display="none"}

/* PAGE 8 */
let ys=1;
function noClick(){ys+=.3;yesBtn.style.transform=`scale(${ys})`;if(ys>2.5)noBtn8.style.display="none"}
function finalYes(){confetti({particleCount:300});go(9)}
