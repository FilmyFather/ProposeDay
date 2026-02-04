let currentPage=1;
const pages=document.querySelectorAll(".page");
const music=document.getElementById("music");
const opts=document.getElementById("options");

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
 let h=document.createElement("div");
 h.className="heart";h.innerText="❤️";
 h.style.left=Math.random()*100+"%";
 h.style.top=Math.random()*100+"%";
 h.style.fontSize=12+Math.random()*18+"px";
 hb.appendChild(h);
}

/* MUSIC */
music.addEventListener("loadedmetadata",()=>{
 music.currentTime=62;
});
music.volume=0.5;

function toggleOptions(){opts.classList.toggle("show");}
function setVolume(v){
 if(v===0){music.pause();}
 else{
  music.volume=v;
  if(music.paused)music.play().catch(()=>{});
 }
 opts.classList.remove("show");
}

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
 let val=password.value.toLowerCase().trim();
 if(val===PASSWORD){
  confetti({particleCount:220,spread:140});
  music.play();
  go(2);
 }else{
  lockMsg.innerText+=taunts[wrong]+"\n";
  wrong++;
  if(wrong===5){
   lockMsg.innerHTML+=`<div style="opacity:.5;margin-top:6px">
   Hint: Agar Yuvraj Rajkumar hai… to tum uski kya ho?
   </div>`;
  }
  password.classList.add("shake");
  setTimeout(()=>password.classList.remove("shake"),300);
 }
}

/* QUIZ */
const quiz=[
 {o:["Me","You","Both","Us","Always You"],a:2},
 {o:["Expensive Gift","One Night Stand","Whole Day Together","Stay Together For Life","Party"],a:3},
 {o:["Looks","Money","Trust","Fame","Status"],a:2},
 {o:["Friends","Family","Yuvraj","Everyone","Fate"],a:2},
 {o:["Yes","Beyond","Belong","Breath","All Above"],a:4},
 {o:["Yes","Always","Lifetime","Already","All Above"],a:4},
 {o:["Timepass","Habit","Mood","Trust","Drama"],a:3},
 {o:["No","Maybe","Yes","Smile","Silence"],a:2}
];
let qi=0;

function loadQuestion(){
 qNo.innerText=`0${qi+1}.`;
 optionsQuiz.innerHTML="";
 quiz[qi].o.forEach((t,i)=>{
  let b=document.createElement("div");
  b.className="quiz-option";
  b.innerText=t;
  b.onclick=()=>{
   if(i===quiz[qi].a){
    b.classList.add("correct");
    confetti({particleCount:80,spread:80});
    setTimeout(()=>{qi++;qi<quiz.length?loadQuestion():go(3)},600);
   }else{
    b.classList.add("wrong","shake");
    navigator.vibrate?.(200);
   }
  };
  optionsQuiz.appendChild(b);
 });
}

/* PAGE 3 */
noBtn.onmouseover=()=>{noBtn.style.left=Math.random()*80+"%";noBtn.style.top=Math.random()*80+"%"}

/* HUNT */
let found=0;
function initHunt(){
 found=0;ringCount.innerText=0;huntGrid.innerHTML="";
 let items=["💍","💍","💍","🍃","🍃","🍃","🍃","🍃","🍃"].sort(()=>Math.random()-.5);
 items.forEach(it=>{
  let c=document.createElement("div");
  c.className="card";c.innerText="🍃";
  c.onclick=()=>{
   c.innerText=it==="💍"?"💍":"💩";
   if(it==="💍"&&++found===3)go(5);
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
  let h=document.createElement("div");
  h.className="fall-heart";h.innerText="❤️";h.style.left=Math.random()*90+"%";
  h.onclick=()=>{
   caught++;bar.style.width=(caught/12*100)+"%";
   h.remove();if(caught>=12){clearInterval(intv);go(6)}
  };
  gameBox.appendChild(h);
  setTimeout(()=>h.remove(),3000);
 },600);
}

/* LETTER */
function openLetter(){document.getElementById("letter").style.display="block"}

/* PHOTOS */
function openPhoto(s){modalImg.src=s;photoModal.style.display="flex"}
function closePhoto(){photoModal.style.display="none"}

/* YES NO */
let ys=1;
function noClick(){ys+=.3;yesBtn.style.transform=`scale(${ys})`;if(ys>2.5)noBtn8.style.display="none"}
function finalYes(){confetti({particleCount:300,spread:160});go(9)}

/* FINAL */
function replay(){location.reload()}
