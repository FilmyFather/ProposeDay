const pages=document.querySelectorAll(".page");
const music=document.getElementById("bgMusic");
const control=document.getElementById("musicControl");

function go(n){
 pages.forEach(p=>p.classList.remove("active"));
 document.getElementById("p"+n).classList.add("active");
 if(n===2)loadQuiz();
 if(n===4)initHunt();
}

/* MUSIC */
control.onclick=()=> music.paused?music.play():music.pause();

/* PAGE 1 */
const PASSWORD="rajkumari";
let wrong=0;
const taunts=[
 "Arre Ghelsodi 😝",
 "Dhapudiii 😜",
 "Bhilan ❌",
 "Wagri 🤯",
 "Gaanduu Insaan 🤦‍♂️"
];
function unlock(){
 const v=password.value.trim().toLowerCase();
 if(v===PASSWORD){
  music.currentTime=62;music.play();go(2);
 }else{
  lockMsg.innerText=taunts[Math.min(wrong,4)];
  if(++wrong===5)lockMsg.innerText+="\nHint: Agar Yuvraj Rajkumar hai…";
 }
}

/* PAGE 2 */
const quiz=[
 ["Who is lucky one?",["Me","You","Both"],2],
 ["Perfect gift?",["Gift","ONS","Day Together","Stay Forever","Trip"],3],
 ["What matters?",["Looks","Money","Trust","Fame"],2],
 ["Who you trust?",["Friends","Family","Yuvraj","All"],2],
 ["Be mine forever?",["Yes","Beyond","Belong","Till end","All"],4],
 ["Choose me daily?",["Yes","Always","Lifetime","Chosen","All"],4],
 ["Love means?",["Timepass","Habit","Mood","Trust"],3],
 ["Final answer?",["No","Maybe","Yes"],2]
];
let qi=0;
function loadQuiz(){
 qNo.innerText="0"+(qi+1);
 question.innerText=quiz[qi][0];
 options.innerHTML="";
 quiz[qi][1].forEach((o,i)=>{
  const b=document.createElement("button");
  b.innerText=o;
  b.onclick=()=> i===quiz[qi][2]?next():b.style.background="red";
  options.appendChild(b);
 });
}
function next(){qi++;qi<quiz.length?loadQuiz():go(3);}

/* PAGE 3 */
noBtn.onmouseover=()=>{noBtn.style.left=Math.random()*80+"%";noBtn.style.top=Math.random()*80+"%";noBtn.style.position="absolute"};

/* PAGE 4 */
let found=0;
function initHunt(){
 hunt.innerHTML="";found=0;foundSpan.innerText=0;
 for(let i=0;i<9;i++){
  const d=document.createElement("div");
  const ring=i%3===0;
  d.onclick=()=>{d.innerText=ring?"💍":"💩";if(ring&&++found===3)go(5);foundSpan.innerText=found};
  hunt.appendChild(d);
 }
}

/* PAGE 5 */
let caught=0;
function startGame(){
 caught=0;barFill.style.width="0";
 const int=setInterval(()=>{
  if(caught>=12){clearInterval(int);go(6);return;}
  const h=document.createElement("span");
  h.className="heart";h.innerText="❤️";
  h.style.left=Math.random()*90+"%";
  h.onclick=()=>{caught++;barFill.style.width=(caught/12*100)+"%";h.remove()};
  gameBox.appendChild(h);
  setTimeout(()=>h.remove(),3000);
 },600);
}

/* PAGE 6 */
function openLetter(){letter.classList.add("open")}

/* PAGE 8 */
let scale=1;
function noDrama(b){scale+=0.3;yesBtn.style.transform=`scale(${scale})`}
function finalYes(){go(9)}
