const pages=document.querySelectorAll(".page");
const music=document.getElementById("bgMusic");
const opts=document.getElementById("options");

music.volume=0.5;
music.addEventListener("loadedmetadata",()=>{music.currentTime=62});

function toggleOptions(){opts.classList.toggle("show")}
function setVolume(v){
 if(v===0){music.pause()}
 else{music.volume=v;if(music.paused)music.play().catch(()=>{})}
}

function go(n){
 pages.forEach(p=>p.classList.remove("active"));
 document.getElementById("p"+n).classList.add("active");
 if(n===2)loadQuestion();
 if(n===4)initHunt();
}

const PASSWORD="rajkumari";
let wrong=0;
const taunts=["Arre Ghelsodi 😝","Dhapudiii 😜","Bhilan ❌","Wagri 🤯","Gaanduu Insaan 🤦‍♂️"];

function unlock(){
 const val=password.value.trim().toLowerCase();
 if(val===PASSWORD){
  confetti({particleCount:200,spread:120});
  music.currentTime=62;music.play().catch(()=>{});
  go(2);
 }else{
  lockMsg.innerText=taunts[wrong]||lockMsg.innerText;
  if(++wrong===5){
   lockMsg.innerText+="\n\nHint: Agar Yuvraj Rajkumar hai… to tum uski kya ho?";
   lockMsg.style.opacity="0.5";
  }
  password.classList.add("shake");
  setTimeout(()=>password.classList.remove("shake"),300);
 }
}

/* HEARTS */
const hb=document.getElementById("hearts");
for(let i=0;i<35;i++){
 let h=document.createElement("div");
 h.className="heart";h.innerText="❤️";
 h.style.left=Math.random()*100+"%";
 h.style.top=Math.random()*100+"%";
 h.style.fontSize=12+Math.random()*18+"px";
 hb.appendChild(h);
}

/* QUIZ */
const quiz=[
 {q:"01. Who is the lucky one?",o:["Me","You","Both","Us","Always You"],a:2},
 {q:"02. What do you want from me?",o:["Expensive Gift","One Night Stand","Whole Day Together","Stay Together For Life","Party"],a:3},
 {q:"03. After 3 years, what matters most?",o:["Looks","Money","Trust","Fame","Status"],a:2},
 {q:"04. Who do you trust the most?",o:["Friends","Family","Yuvraj","Everyone","Fate"],a:2},
 {q:"05. Will you be mine forever?",o:["Yes","Beyond","Belong","Breath","All Above"],a:4},
 {q:"06. Choose me again?",o:["Yes","Always","Lifetime","Already","All Above"],a:4},
 {q:"07. Love means?",o:["Timepass","Habit","Mood","Trust","Drama"],a:3},
 {q:"08. Final answer?",o:["No","Maybe","Yes","Silence","Smile"],a:2}
];
let qi=0;

function loadQuestion(){
 qNo.innerText=quiz[qi].q;
 optionsBox.innerHTML="";
 quiz[qi].o.forEach((t,i)=>{
  let b=document.createElement("div");
  b.className="quiz-option";b.innerText=t;
  b.onclick=()=>{
   if(i===quiz[qi].a){
    b.classList.add("correct");
    confetti({particleCount:120,spread:80});
    setTimeout(()=>{qi++;qi<quiz.length?loadQuestion():go(3)},600);
   }else{
    b.classList.add("wrong","shake");
    navigator.vibrate?.(200);
   }
  };
  optionsBox.appendChild(b);
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
   ringCount.innerText=found;
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
  let h=document.createElement("div");
  h.className="fall-heart";h.innerText="❤️";
  h.style.left=Math.random()*90+"%";
  h.onclick=()=>{
   caught++;bar.style.width=(caught/12*100)+"%";
   h.remove();if(caught>=12){clearInterval(intv);go(6)}
  };
  gameBox.appendChild(h);setTimeout(()=>h.remove(),3000);
 },600);
}

/* LETTER */
function openLetter(){document.getElementById("letter").style.display="block"}

/* PAGE 8 */
let ys=1;
function noClick(){ys+=.3;yesBtn.style.transform=`scale(${ys})`;if(ys>2.5)noBtn8.style.display="none"}
function finalYes(){confetti({particleCount:300,spread:160});go(9)}
