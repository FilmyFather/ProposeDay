let currentPage=1;
const pages=document.querySelectorAll(".page");
const music=document.getElementById("bgMusic");

/* DOM */
const password=document.getElementById("password");
const lockMsg=document.getElementById("lockMsg");
const qNo=document.getElementById("qNo");
const question=document.getElementById("question");
const options=document.getElementById("options");
const huntGrid=document.getElementById("huntGrid");
const gameBox=document.getElementById("gameBox");
const bar=document.getElementById("bar");
const letter=document.getElementById("letter");

/* NAV */
function go(n){
  pages.forEach(p=>p.classList.remove("active"));
  document.getElementById("p"+n).classList.add("active");
  currentPage=n;
  if(n===2)loadQuestion();
  if(n===4)initHunt();
}

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
  if(password.value.trim().toLowerCase()===PASSWORD){
    music.currentTime=62;music.play();go(2);
  }else{
    wrong++;password.classList.add("shake");
    setTimeout(()=>password.classList.remove("shake"),300);
    lockMsg.innerText=taunts[Math.min(wrong-1,4)];
    if(wrong===5)lockMsg.innerText+="\nHint: Agar Yuvraj Rajkumar hai…";
  }
}

/* PAGE 2 */
const quizData=[
 {q:"01. Who is the lucky one?",options:["Me","You","Both"],correct:2},
 {q:"02. Perfect gift?",options:["Gift","Party","Whole Day","Stay Forever","Trip"],correct:3},
 {q:"03. What matters most?",options:["Looks","Money","Trust","Fame"],correct:2},
 {q:"04. Who do you trust?",options:["Friends","Family","Yuvraj","All"],correct:2},
 {q:"05. Be mine forever?",options:["Yes","Beyond","Belong","Till end","All"],correct:4},
 {q:"06. Choose me daily?",options:["Yes","Always","Lifetime","Chosen","All"],correct:4},
 {q:"07. Love means?",options:["Timepass","Habit","Mood","Trust"],correct:3},
 {q:"08. Final answer?",options:["No","Maybe","Yes"],correct:2}
];
let qi=0;
function loadQuestion(){
 const q=quizData[qi];
 qNo.innerText=q.q.split(".")[0]+".";
 question.innerText=q.q.substring(3);
 options.innerHTML="";
 q.options.forEach((o,i)=>{
  const b=document.createElement("button");
  b.innerText=o;
  b.onclick=()=>checkAnswer(i,b);
  options.appendChild(b);
 });
}
function checkAnswer(i,btn){
 if(i===quizData[qi].correct){
  btn.style.background="green";
  setTimeout(()=>{qi++;qi<quizData.length?loadQuestion():go(3)},500);
 }else{
  btn.style.background="red";btn.classList.add("shake");
 }
}

/* PAGE 3 */
function noFinal(b){
 b.style.position="absolute";
 b.style.left=Math.random()*80+"%";
 b.style.top=Math.random()*80+"%";
}

/* PAGE 4 */
let found=0;
function initHunt(){
 huntGrid.innerHTML="";found=0;
 for(let i=0;i<9;i++){
  const c=document.createElement("div");
  c.className="card";
  const ring=i%3===0;
  c.onclick=()=>{c.innerText=ring?"💍":"💩";if(ring&&++found===3)go(5)};
  huntGrid.appendChild(c);
 }
}

/* PAGE 5 */
let caught=0,intv;
function startGame(){
 caught=0;bar.style.width="0%";
 intv=setInterval(()=>{
  if(currentPage!==5)return;
  const h=document.createElement("span");
  h.className="fall-heart";h.innerText="❤️";
  h.style.left=Math.random()*90+"%";
  h.onclick=()=>{caught++;bar.style.width=(caught/12*100)+"%";h.remove();if(caught>=12){clearInterval(intv);go(6)}};
  gameBox.appendChild(h);
  setTimeout(()=>h.remove(),3000);
 },600);
}

/* PAGE 6 */
function openLetter(){letter.classList.add("open")}

/* PAGE 8 */
let yesSize=1;
function noClick(b){yesSize+=.3;document.getElementById("yesBtn").style.transform=`scale(${yesSize})`}
function finalYes(){go(9)}
