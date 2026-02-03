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
  "Arre Ghelsodi 😝 Itna Bhi Mushkil Nahi!",
  "Dhapudiii 😜 Dil se Try Karooo!",
  "Bhilan ❌ 3 Saal Ka Pyar Yaad Nahi?",
  "Wagri 🤯 Galat Hai Abhi Bhi... Fir Galat!",
  "Gaanduu Insaan 🤦‍♂️ Mujhe Pata Tha Tumse Nahi Ho Payega Ye Lo Hint!"
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
        msg.innerText+="\nHint ❤️ - Agar Yuvraj Rajkumar Hai… To Tum Uski Kya Honge..??";
    }
  }
}

/* =====================================================
   PAGE 2 — QUIZ (FIXED, CSS MATCHED)
===================================================== */

let qIndex = 0;

const quizData = [
  {
    q: "01. Who is the lucky one?",
    options: ["Me", "You", "Both", "Us", "Always You"],
    correct: 2
  },
  {
    q: "02. What is the perfect Propose Day gift?",
    options: [
      "Expensive Gift",
      "One Night Stand",
      "Whole Day Spend Together",
      "Stay Together For Life",
      "Party Out of State"
    ],
    correct: 3
  },
  {
    q: "03. After 3 years, what matters the most?",
    options: ["Looks", "Money", "Trust", "Fame", "Timepass"],
    correct: 2
  },
  {
    q: "04. Who do you trust the most?",
    options: ["Friends", "Family", "Yuvraj", "Everyone", "Myself"],
    correct: 2
  },
  {
    q: "05. After 3 beautiful years together, will you be mine forever? 💍",
    options: [
      "Yes, today and always ❤️",
      "Forever and beyond ♾️",
      "I already belong to you 😘",
      "Till my last breath 💕",
      "All of the above 💍❤️"
    ],
    correct: 4
  },
  {
    q: "06. Will you choose me again every single day? 💖",
    options: [
      "Yes, without thinking",
      "Always and forever",
      "In every lifetime",
      "Already chosen ❤️",
      "All of the above 💕"
    ],
    correct: 4
  },
  {
    q: "07. Love for you means?",
    options: ["Timepass", "Habit", "Mood", "Trust", "Nothing"],
    correct: 3
  },
  {
    q: "08. Final answer?",
    options: ["No", "Maybe", "Yes", "Thinking", "Forever"],
    correct: 2
  }
];

const qNoEl = document.getElementById("qNo");
const qEl   = document.getElementById("question");
const optEl = document.getElementById("options");

function loadQuestion() {
  const q = quizData[qIndex];

  qNoEl.innerText = q.q;
  qEl.innerText = "";

  optEl.innerHTML = "";

  q.options.forEach((opt, i) => {
    const btn = document.createElement("div");
    btn.className = "quiz-option"; // ✅ CSS MATCH
    btn.innerText = opt;

    btn.onclick = () => checkAnswer(i, btn);

    optEl.appendChild(btn);
  });
}

function checkAnswer(i, btn) {
  const correct = quizData[qIndex].correct;

  if (i === correct) {
    btn.classList.add("correct");
    confetti({ particleCount: 80, spread: 70 });

    setTimeout(() => {
      qIndex++;
      if (qIndex < quizData.length) {
        loadQuestion();
      } else {
        confetti({ particleCount: 200, spread: 120 });
        go(3); // Page 3
      }
    }, 600);

  } else {
    btn.classList.add("wrong", "shake");
    navigator.vibrate?.(200);
  }
}

/* Page 2 open hone par call */
if (document.getElementById("p2")) {
  loadQuestion();
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
