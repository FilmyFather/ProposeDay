let currentPage = 1;

/* PAGE NAV */
function go(n){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  if(document.getElementById("p"+n)){
    document.getElementById("p"+n).classList.add("active");
    currentPage = n;
    if(n===2) loadQuiz();
  }
}

/* HEARTS */
const heartsBox=document.getElementById("hearts");
for(let i=0;i<30;i++){
  const h=document.createElement("div");
  h.className="heart";
  h.innerText="❤️";
  h.style.left=Math.random()*100+"%";
  h.style.top=Math.random()*100+"%";
  heartsBox.appendChild(h);
}

/* MUSIC */
const music=document.getElementById("bgMusic");
let vol=2;
function toggleMusic(){
  const levels=[0,0.3,0.6,1];
  vol=(vol+1)%4;
  music.volume=levels[vol];
  if(music.paused) music.play();
}

/* PAGE 1 */
const PASSWORD="rajkumari";
let wrong=0;
const taunts=[
  "Arre Ghelsodi 😝 itna bhi mushkil nahi!",
  "Dhapudiii 😜 dil se try kar!",
  "Bhilan ❌ 3 saal yaad nahi?",
  "Wagri 🤯 galat fir galat!",
  "Gaanduu Insaan 🤦‍♂️ last chance!"
];

function unlock(){
  const input=document.getElementById("password");
  const msg=document.getElementById("lockMsg");
  if(input.value.trim().toLowerCase()===PASSWORD){
    confetti({particleCount:150,spread:120});
    music.currentTime=62;
    music.play();
    go(2);
  }else{
    wrong++;
    input.classList.add("shake");
    setTimeout(()=>input.classList.remove("shake"),400);
    msg.innerText=taunts[Math.min(wrong-1,4)];
    if(wrong===5){
      msg.innerText+="\nHint ❤️ Agar Yuvraj Rajkumar hai… to tum uski Rajkumari ho 👑";
    }
  }
}

/* PAGE 2 QUIZ */
const quizData=[/* SAME AS LOCKED */];
let qi=0;

function loadQuiz(){
  const q=quizData[qi];
  document.getElementById("quizQno").innerText=`Question ${qi+1}`;
  document.getElementById("quizQ").innerText=q.q;
  document.getElementById("quizOptions").innerHTML=
    q.options.map((o,i)=>`<div class="quiz-option" onclick="checkQuiz(${i},this)">${o}</div>`).join("");
}

function checkQuiz(i,el){
  if(i===quizData[qi].correct){
    el.classList.add("correct");
    confetti({particleCount:80,spread:80});
    setTimeout(()=>{
      qi++;
      qi<quizData.length?loadQuiz():go(3);
    },600);
  }else{
    el.classList.add("wrong","shake");
    navigator.vibrate?.(200);
  }
}

/* PAGE 3 NO BUTTON */
const noBtn=document.getElementById("noBtn");
noBtn.addEventListener("mouseenter",()=>{
  if(currentPage===3){
    noBtn.style.position="fixed";
    noBtn.style.left=Math.random()*80+"%";
    noBtn.style.top=Math.random()*80+"%";
  }
});
