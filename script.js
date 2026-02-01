/* =========================
   GLOBAL STATE
========================= */

let currentPage = 1;
let gameStarted = false;
let caught = 0;
let wrongAttempts = 0;

/* =========================
   PAGE NAVIGATION
========================= */

function go(n) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById("p" + n).classList.add("active");
  currentPage = n;
}

/* =========================
   MUSIC CONTROL
========================= */

const bgMusic = document.getElementById("audio");

function startMusic() {
  if (!bgMusic) return;
  bgMusic.volume = 0.7;
  bgMusic.play().catch(() => {
    // mobile autoplay restriction
    document.body.addEventListener("click", () => bgMusic.play(), { once: true });
  });
}

/* =========================
   UNLOCK / LOCK SYSTEM
========================= */

function unlock(correct) {
  if (correct) {
    startMusic();
    go(2);
  } else {
    wrongAttempts++;
    shake(document.getElementById("lockBox"));
    if (wrongAttempts >= 5) {
      document.getElementById("hint").innerText =
        "Hint: It’s our special date ❤️";
    }
  }
}

/* =========================
   SHAKE EFFECT
========================= */

function shake(el) {
  if (!el) return;
  el.classList.add("shake");
  setTimeout(() => el.classList.remove("shake"), 400);
}

/* =========================
   QUIZ LOGIC
========================= */

document.querySelectorAll(".quiz-option").forEach(btn => {
  btn.onclick = () => {
    const correct = btn.dataset.correct === "true";

    if (correct) {
      btn.classList.add("correct");
      confettiBoom();
      setTimeout(() => go(currentPage + 1), 700);
    } else {
      btn.classList.add("wrong");
      shake(btn);
      setTimeout(() => btn.classList.remove("wrong"), 500);
    }
  };
});

/* =========================
   CONFETTI (LIGHT)
========================= */

function confettiBoom() {
  for (let i = 0; i < 15; i++) {
    const c = document.createElement("span");
    c.innerText = "🎉";
    c.style.position = "fixed";
    c.style.left = Math.random() * 100 + "vw";
    c.style.top = "-20px";
    c.style.fontSize = "20px";
    c.style.transition = "top 2s linear";
    document.body.appendChild(c);

    setTimeout(() => (c.style.top = "100vh"), 50);
    setTimeout(() => c.remove(), 2000);
  }
}

/* =========================
   HEART CATCH GAME (PAGE 5)
========================= */

const box = document.getElementById("gameBox");
const bar = document.getElementById("bar");
const startBtn = document.getElementById("startGame");

if (startBtn) {
  startBtn.onclick = () => {
    gameStarted = true;
    caught = 0;
    bar.style.width = "0%";
    startBtn.style.display = "none";
  };
}

setInterval(() => {
  if (
    document.getElementById("p5")?.classList.contains("active") &&
    gameStarted
  ) {
    const h = document.createElement("span");
    h.innerText = "❤️";
    h.style.position = "absolute";
    h.style.left = Math.random() * 85 + "%";
    h.style.top = "-30px";
    h.style.fontSize = "28px";
    h.style.cursor = "pointer";
    h.style.transition = "top 3s linear";

    h.onclick = () => {
      caught++;
      bar.style.width = (caught / 12) * 100 + "%";
      h.remove();

      if (caught >= 12) {
        gameStarted = false;
        go(6);
      }
    };

    box.appendChild(h);

    setTimeout(() => (h.style.top = "260px"), 50);
    setTimeout(() => h.remove(), 3200);
  }
}, 600);

/* =========================
   YES / NO LOGIC (PAGE 8)
========================= */

let yesScale = 1;

function noClicked(btn) {
  yesScale += 0.2;
  document.getElementById("yesBtn").style.transform =
    `scale(${yesScale})`;
  btn.innerText =
    btn.innerText === "No" ? "Please 🥺" : "Are you sure?";
}

function yesClicked() {
  confettiBoom();
  setTimeout(() => go(9), 800);
}

/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", () => {
  go(1);
});
