const pages=document.querySelectorAll(".page");
const music=document.getElementById("music");
const options=document.getElementById("options");

music.addEventListener("loadedmetadata",()=>{music.currentTime=62});

function go(n){
 pages.forEach(p=>p.classList.remove("active"));
 document.getElementById("p"+n).classList.add("active");
}

function toggleOptions(){options.classList.toggle("show")}
function setVolume(v){
 if(v===0){music.pause()}
 else{music.volume=v;music.play()}
}

/* HEARTS */
const hb=document.getElementById("hearts");
for(let i=0;i<25;i++){
 let h=document.createElement("div");
 h.className="heart";h.innerText="❤️";
 h.style.left=Math.random()*100+"%";
 h.style.top=Math.random()*100+"%";
 hb.appendChild(h);
}

/* LOCK */
let wrong=0;
const taunts=[
 "Arre Ghelsodi 😝",
 "Dhapudiii 😜",
 "Bhilan ❌",
 "Wagri 🤯",
 "Gaanduu Insaan 🤦‍♂️"
];
function unlock(){
 if(password.value.toLowerCase()==="rajkumari"){
  music.play();go(2)
 }else{
  lockMsg.innerText=taunts[wrong]||"";
  wrong++;
 }
}

/* QUIZ */
const quiz=[
 {q:"01. Who is the lucky one?",o:["Me","You","Both","Us","Always You"],a:2},
 {q:"02. What do you want from me?",o:["Expensive Gift","One Night Stand","Whole Day Together","Stay Together For Life","Party"],a:3}
];
let qi=0;
function loadQuiz(){
 qNo.innerText=quiz[qi].q;
 question.innerText=quiz[qi].q;
 optionsQuiz.innerHTML="";
 quiz[qi].o.forEach((t,i)=>{
  let d=document.createElement("div");
  d.className="quiz-option";d.innerText=t;
  d.onclick=()=>{i===quiz[qi].a?(confetti(),qi++,qi<quiz.length?loadQuiz():go(3)):(d.classList.add("wrong","shake"))};
  optionsQuiz.appendChild(d);
 });
}
document.getElementById("p2").addEventListener("click",loadQuiz);

/* HUNT */
const items=["💩","💩","💍","💩","💍","💩","💩","💩","💍"];
function initHunt(){
 ringCount.innerText=0;huntGrid.innerHTML="";
 let found=0;
 items.forEach(it=>{
  let c=document.createElement("div");
  c.className="card";c.innerText="🍃";
  c.onclick=()=>{
   c.innerText=it==="💍"?"💍":"💩";
   if(it==="💍"&&++found===3)setTimeout(()=>go(5),1000);
  };
  huntGrid.appendChild(c);
 });
}

/* GAME */
let caught=0;
function startGame(){
 caught=0;bar.style.width="0%";
 let int=setInterval(()=>{
  let h=document.createElement("div");
  h.className="fall-heart";h.innerText="𓆩❤︎𓆪";
  h.style.left=Math.random()*90+"%";
  h.onclick=()=>{
   caught++;bar.style.width=(caught/12*100)+"%";
   if(caught>=12){clearInterval(int);go(6)}
  };
  gameBox.appendChild(h);
  setTimeout(()=>h.remove(),3000);
 },600);
}

/* LETTER */
function openLetter(){letter.style.display="block"}

/* PHOTOS */
function openPhoto(s){modalImg.src=s;photoModal.style.display="flex"}
function closePhoto(){photoModal.style.display="none"}

/* YES NO */
let size=1;
function noClick(){size+=.3;yesBtn.style.transform=`scale(${size})`}
function finalYes(){confetti();go(9)}
