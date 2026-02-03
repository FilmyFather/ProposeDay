const pages=document.querySelectorAll(".page");
const music=document.getElementById("music");
let current=1;

/* NAV */
function go(n){
 pages.forEach(p=>p.classList.remove("active"));
 document.getElementById("p"+n).classList.add("active");
 current=n;
 if(n===2)loadQuestion();
 if(n===4)initHunt();
}

/* HEARTS */
const hbox=document.getElementById("hearts");
for(let i=0;i<30;i++){
 let h=document.createElement("div");
 h.className="heart";h.innerText="❤️";
 h.style.left=Math.random()*100+"%";
 h.style.top=Math.random()*100+"%";
 h.style.fontSize=12+Math.random()*18+"px";
 hbox.appendChild(h);
}

/* MUSIC */
const opts=document.getElementById("options");
function toggleOptions(){opts.classList.toggle("show")}
music.addEventListener("loadedmetadata",()=>music.currentTime=62);
function setVolume(v){v===0?music.pause():(music.volume=v,music.play())}

/* LOCK */
const PASSWORD="rajkumari";
let wrong=0;
const taunts=[
 "Arre Ghelsodi 😝 itna bhi nahi pata?",
 "Dhapudiii 😜 thoda dimaag laga",
 "Bhilan ❌ filmy ban na",
 "Wagri 🤯 soch ke daal",
 "Gaanduu Insaan 🤦‍♂️ hint le le"
];
function unlock(){
 const val=password.value.toLowerCase().trim();
 if(val===PASSWORD){
  confetti({particleCount:200,spread:140});
  music.play();
  go(2);
 }else{
  lockMsg.innerText=taunts[wrong]||"";
  if(++wrong===5)lockMsg.innerText+="\nHint: Agar Yuvraj Rajkumar hai… to tum uski kya ho?";
  password.classList.add("shake");
  setTimeout(()=>password.classList.remove("shake"),300);
 }
}

/* QUIZ */
const quiz=[
 {q:"Who is the lucky one?",o:["Me","You","Both","Us","Always You"],a:2},
 {q:"What do you want from me?",o:["Expensive Gift","One Night Stand","Whole Day Together","Stay Together For Life","Party"],a:3},
 {q:"After 3 years, what matters most?",o:["Looks","Money","Trust","Fame","Status"],a:2},
 {q:"Who do you trust the most?",o:["Friends","Family","Yuvraj","Everyone","Fate"],a:2},
 {q:"Will you be mine forever?",o:["Yes","Beyond","Belong","Breath","All Above"],a:4},
 {q:"Will you choose me again?",o:["Yes","Always","Lifetime","Already","All Above"],a:4},
 {q:"Love means?",o:["Timepass","Habit","Mood","Trust","Drama"],a:3},
 {q:"Final answer?",o:["No","Maybe","Yes","Smile","Silence"],a:2}
];
let qi=0;
function loadQuestion(){
 qNo.innerText="Q"+(qi+1);
 question.innerText=quiz[qi].q;
 optionsBox.innerHTML="";
 quiz[qi].o.forEach((t,i)=>{
  let b=document.createElement("div");
  b.className="quiz-option";b.innerText=t;
  b.onclick=()=>{
   if(i===quiz[qi].a){
    b.classList.add("correct");
    confetti({particleCount:120,spread:100});
    navigator.vibrate?.(120);
    setTimeout(()=>{qi++;qi<quiz.length?loadQuestion():go(3)},700);
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
   ringCount.innerText=found;c.onclick=null;
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
  if(current!==5)return;
  let h=document.createElement("div");
  h.className="fall-heart";h.innerText="❤️";h.style.left=Math.random()*90+"%";
  h.onclick=()=>{caught++;bar.style.width=(caught/12*100)+"%";h.remove();if(caught>=12){clearInterval(intv);go(6)}};
  gameBox.appendChild(h);setTimeout(()=>h.remove(),3000);
 },600);
}

/* LETTER */
function openLetter(){letter.style.display="block"}

/* YES NO */
let ys=1;
function noClick(){ys+=.3;yesBtn.style.transform=`scale(${ys})`;if(ys>2.5)event.target.style.display="none"}
function finalYes(){confetti({particleCount:300,spread:160});go(9)}
