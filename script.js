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

/* MUSIC */
music.volume=0.5;
function toggleMusicOptions(){
 document.getElementById("musicOptions").classList.toggle("show");
}
function setVolume(v){music.volume=v;music.play()}
function muteMusic(){music.pause()}

/* LOCK */
const PASSWORD="rajkumari";let wrong=0;
const taunts=["Arre Ghelsodi 😝","Dhapudiii 😜","Bhilan ❌","Wagri 🤯","Gaanduu Insaan 🤦‍♂️"];
function unlock(){
 let val=password.value.toLowerCase().trim();
 if(val===PASSWORD){
  confetti({particleCount:200,spread:120});
  music.currentTime=62;
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
 options.innerHTML="";
 quiz[qi].o.forEach((t,i)=>{
  let b=document.createElement("div");
  b.className="quiz-option";
  b.innerText=t;
  b.onclick=()=>{
   if(i===quiz[qi].a){
    b.classList.add("correct");
    setTimeout(()=>{qi++;qi<quiz.length?loadQuestion():go(3)},600);
   }else{
    b.classList.add("wrong","shake");
   }
  };
  options.appendChild(b);
 });
}

/* PAGE 3 NO */
noBtn.onmouseover=()=>{
 noBtn.style.position="absolute";
 noBtn.style.left=Math.random()*80+"%";
 noBtn.style.top=Math.random()*80+"%";
}

/* PAGE 4 */
let found=0;
function initHunt(){
 found=0;ringCount.innerText=0;huntGrid.innerHTML="";
 let items=["💍","💍","💍","🍃","🍃","🍃","🍃","🍃","🍃"].sort(()=>Math.random()-.5);
 items.forEach(it=>{
  let c=document.createElement("div");
  c.className="card";
  c.innerText="🍃";
  c.onclick=()=>{
   c.innerText=it==="💍"?"💍":"💩";
   if(it==="💍"&&++found===3)go(5);
   c.onclick=null;
  };
  huntGrid.appendChild(c);
 });
}

/* PAGE 5 */
let caught=0,intv;
function startGame(){
 caught=0;bar.style.width="0%";gameBox.innerHTML="";
 clearInterval(intv);
 intv=setInterval(()=>{
  if(currentPage!==5)return;
  let h=document.createElement("div");
  h.className="fall-heart";h.innerText="❤️";
  h.style.left=Math.random()*90+"%";
  h.onclick=()=>{
   caught++;bar.style.width=(caught/12*100)+"%";
   h.remove();
   if(caught>=12){clearInterval(intv);go(6)}
  };
  gameBox.appendChild(h);
  setTimeout(()=>h.remove(),3000);
 },600);
}

/* LETTER */
function openLetter(){document.getElementById("letter").style.display="block"}

/* YES NO */
let ys=1;
function noClick(){
 ys+=.3;
 yesBtn.style.transform=`scale(${ys})`;
 if(ys>2.5)noBtn8.style.display="none";
}
function finalYes(){
 confetti({particleCount:300,spread:160});
 go(9);
}
function replay(){location.reload()}
