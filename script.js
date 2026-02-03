/* =====================================================
   GLOBAL
===================================================== */

let currentPage = 1;
const pages = document.querySelectorAll(".page");
const music = document.getElementById("bgMusic");

/* page navigation */
function go(n) {
  pages.forEach(p => p.classList.remove("active"));
  document.getElementById("p" + n).classList.add("active");
  currentPage = n;

  if (n === 2) loadQuestion();
  if (n === 4) initHunt();
}

/* =====================================================
   PAGE 1 — LOCK / UNLOCK
===================================================== */

const PASSWORD = "rajkumari";
let wrongCount = 0;

const taunts = [
  "Arre Ghelsodi 😝 thoda dhyaan se!",
  "Dhapudiii 😜 ye bhi galat!",
  "Bhilan ❌ itna bhi mushkil nahi!",
  "Wagri 🤯 soch ke daal!",
  "Gaanduu Insaan 🤦‍♂️ hint le le!"
];

function unlock() {
  const input = document.getElementById("password").value.trim().toLowerCase();
  const msg = document.getElementById("lockMsg");

  if (input === PASSWORD) {
    msg.innerText = "";
    music.currentTime = 62; // 01:02
    music.play();
    go(2);
  } else {
    wrongCount++;
    document.getElementById("password").classList.add("shake");
    setTimeout(()=>document.getElementById("password").classList.remove("shake"),300);

    if (wrongCount <= taunts.length) {
      msg.innerText = taunts[wrongCount - 1];
    }

    if (wrongCount === 5) {
      msg.innerText += "\nHint: Agar Yuvraj Rajkumar hai… to tum uski kya ho? ❤️";
    }
  }
}

/* =====================================================
   PAGE 2 — QUIZ
===================================================== */

const quizData = [
  {
    q: "01. Who is the lucky one?",
    options: ["Me", "You", "Both"],
    correct: 2
  },
  {
    q: "02. What do you want from me?",
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
    q: "03. After 3 years, what matters most?",
    options: ["Looks", "Money", "Trust", "Fame"],
    correct: 2
  },
  {
    q: "04. Who do you trust the most?",
    options: ["Friends", "Family", "Yuvraj", "Everyone"],
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
    options: ["Timepass", "Habit", "Mood", "Trust"],
    correct: 3
  },
  {
    q: "08. Final answer?",
    options: ["No", "Maybe", "Yes"],
    correct: 2
  }
];

let qIndex = 0;
const quizBox = document.getElementById("quizBox");

function loadQuestion() {
  const q = quizData[qIndex];
  quizBox.innerHTML = `
    <h3>${q.q}</h3>
    <div class="options">
      ${q.options.map((o,i)=>`
        <button class="optBtn" onclick="checkAnswer(${i},this)">${o}</button>
      `).join("")}
    </div>
  `;
}

function checkAnswer(i, btn) {
  const correct = quizData[qIndex].correct;

  if (i === correct) {
    btn.style.background = "green";
    confetti({particleCount:80,spread:80});
    setTimeout(()=>{
      qIndex++;
      if (qIndex < quizData.length) {
        loadQuestion();
      } else {
        confetti({particleCount:200,spread:120});
        go(3);
      }
    },600);
  } else {
    btn.style.background = "red";
    btn.classList.add("shake");
    navigator.vibrate?.(200);
  }
}

/* =====================================================
   PAGE 3 — FINAL SECURITY
===================================================== */

function yesFinal() {
  go(4);
}

function noFinal(btn) {
  btn.style.position = "absolute";
  btn.style.left = Math.random()*80 + "%";
  btn.style.top  = Math.random()*80 + "%";
}

/* =====================================================
   PAGE 4 — PROPOSAL HUNT
===================================================== */

let ringsFound = 0;

function initHunt() {
  ringsFound = 0;
  document.getElementById("ringCount").innerText = "0/3";
}

function clickItem(el, isRing) {
  if (isRing) {
    ringsFound++;
    el.innerText = "💍";
    el.onclick = null;
    document.getElementById("ringCount").innerText = ringsFound + "/3";
    if (ringsFound === 3) {
      setTimeout(()=>go(5),800);
    }
  } else {
    el.innerText = "💩";
  }
}

/* =====================================================
   PAGE 5 — CATCH MY LOVE
===================================================== */

let caught = 0;
let gameInterval;

function startGame() {
  caught = 0;
  document.getElementById("bar").style.width = "0%";
  const box = document.getElementById("gameBox");

  gameInterval = setInterval(()=>{
    if (currentPage !== 5) return;

    const h = document.createElement("span");
    h.innerText = "❤️";
    h.style.left = Math.random()*90 + "%";
    h.style.top = "-20px";
    h.className = "fallHeart";

    h.onclick = ()=>{
      caught++;
      document.getElementById("bar").style.width = (caught/12*100) + "%";
      h.remove();
      if (caught >= 12) {
        clearInterval(gameInterval);
        go(6);
      }
    };

    box.appendChild(h);
    setTimeout(()=>h.remove(),3000);
  },600);
}

/* =====================================================
   PAGE 6 — LETTER
===================================================== */

function openLetter() {
  document.getElementById("letter").classList.add("open");
}

/* =====================================================
   PAGE 7 — PHOTOS
===================================================== */

function openPhoto(src) {
  const m = document.getElementById("photoModal");
  m.querySelector("img").src = src;
  m.style.display = "flex";
}

function closePhoto() {
  document.getElementById("photoModal").style.display = "none";
}

/* =====================================================
   PAGE 8 — YES / NO DRAMA
===================================================== */

let yesSize = 1;

function noClick(btn) {
  yesSize += 0.3;
  document.getElementById("yesBtn").style.transform = `scale(${yesSize})`;
  btn.innerText = ["NO","PLEASE","ARE YOU SURE?","CLICK YES!"][Math.min(yesSize|0,3)];
}

function finalYes() {
  confetti({particleCount:300,spread:160});
  go(9);
}

/* =====================================================
   PAGE 9 — FINAL
===================================================== */

function replay() {
  location.reload();
  }
