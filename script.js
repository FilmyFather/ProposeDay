let currentPage = 1;
const pages = document.querySelectorAll(".page");
const music = document.getElementById("bgMusic");

/* PAGE SWITCH */
function go(n){
  pages.forEach(p=>p.classList.remove("active"));
  document.getElementById("p"+n).classList.add("active");
  currentPage = n;
  if(n === 2) loadQuestion();
  if(n === 4) initHunt();
}

/* LOCK */
const PASSWORD = "rajkumari";
let wrong = 0;
const taunts = [
  "Arre Ghelsodi 😝",
  "Dhapudiii 😜",
  "Bhilan ❌",
  "Wagri 🤯",
  "Gaanduu Insaan 🤦‍♂️"
];

function unlock(){
  const val = password.value.trim().toLowerCase();
  if(val === PASSWORD){
    confetti({ particleCount: 220, spread: 140 });
    music.currentTime = 62;
    music.play();
    go(2);
  }else{
    lockMsg.innerText = taunts[wrong] || "";
    if(++wrong === 5){
      lockMsg.innerText += "\nHint: Agar Yuvraj Rajkumar hai… to tum uski kya ho? ❤️";
    }
    password.classList.add("shake");
    setTimeout(()=>password.classList.remove("shake"),300);
    navigator.vibrate?.(150);
  }
}

/* QUIZ DATA */
const quiz = [
 {q:"01. Who is the lucky one?", o:["Me","You","Both","Us","Always You"], a:2},
 {q:"02. What do you want from me?", o:["Expensive Gift","One Night Stand","Whole Day Together","Stay Together For Life","Party"], a:3},
 {q:"03. After 3 years, what matters most?", o:["Looks","Money","Trust","Fame","Status"], a:2},
 {q:"04. Who do you trust the most?", o:["Friends","Family","Yuvraj","Everyone","Fate"], a:2},
 {q:"05. Will you be mine forever?", o:["Yes","Beyond","Belong","Breath","All Above"], a:4},
 {q:"06. Choose me again?", o:["Yes","Always","Lifetime","Already","All Above"], a:4},
 {q:"07. Love means?", o:["Timepass","Habit","Mood","Trust","Drama"], a:3},
 {q:"08. Final answer?", o:["No","Maybe","Yes","Silence","Smile"], a:2}
];

let qi = 0;

/* LOAD QUESTION */
function loadQuestion(){
  qNo.innerText = quiz[qi].q;
  question.innerText = "";
  options.innerHTML = "";

  quiz[qi].o.forEach((text, i)=>{
    const btn = document.createElement("div");
    btn.className = "quiz-option";
    btn.innerText = text;

    btn.onclick = ()=>{
      if(i === quiz[qi].a){
        // ✅ RIGHT ANSWER
        btn.classList.add("correct");

        confetti({
          particleCount: 120,
          spread: 100,
          origin: { y: 0.6 }
        });

        navigator.vibrate?.([100,50,100]);

        setTimeout(()=>{
          qi++;
          if(qi < quiz.length){
            loadQuestion();
          }else{
            confetti({ particleCount: 260, spread: 160 });
            go(3);
          }
        }, 700);

      }else{
        // ❌ WRONG ANSWER
        btn.classList.add("wrong","shake");
        navigator.vibrate?.(200);
      }
    };

    options.appendChild(btn);
  });
}

/* PAGE 3 NO BUTTON */
noBtn.onmouseover = ()=>{
  noBtn.style.position = "absolute";
  noBtn.style.left = Math.random()*80 + "%";
  noBtn.style.top  = Math.random()*80 + "%";
};

/* PAGE 4 — PROPOSAL HUNT */
let found = 0;
function initHunt(){
  found = 0;
  ringCount.innerText = 0;
  huntGrid.innerHTML = "";

  let items = ["💍","💍","💍","🍃","🍃","🍃","🍃","🍃","🍃"]
    .sort(()=>Math.random()-0.5);

  items.forEach(it=>{
    const c = document.createElement("div");
    c.className = "card";
    c.innerText = "🍃";

    c.onclick = ()=>{
      c.innerText = it === "💍" ? "💍" : "💩";
      c.onclick = null;

      if(it === "💍"){
        found++;
        ringCount.innerText = found;
        confetti({ particleCount: 80, spread: 80 });
        if(found === 3){
          setTimeout(()=>go(5),700);
        }
      }
    };

    huntGrid.appendChild(c);
  });
}

/* PAGE 5 — CATCH MY LOVE */
let caught = 0, intv;
function startGame(){
  caught = 0;
  bar.style.width = "0%";
  gameBox.innerHTML = "";
  clearInterval(intv);

  intv = setInterval(()=>{
    if(currentPage !== 5) return;

    const h = document.createElement("div");
    h.className = "fall-heart";
    h.innerText = "❤️";
    h.style.left = Math.random()*90 + "%";

    h.onclick = ()=>{
      caught++;
      bar.style.width = (caught/12*100) + "%";
      h.remove();
      if(caught >= 12){
        clearInterval(intv);
        confetti({ particleCount: 200, spread: 140 });
        go(6);
      }
    };

    gameBox.appendChild(h);
    setTimeout(()=>h.remove(),3000);
  },600);
}

/* PAGE 6 */
function openLetter(){
  document.getElementById("letter").style.display = "block";
}

/* PAGE 7 */
function openPhoto(s){
  modalImg.src = s;
  photoModal.style.display = "flex";
}
function closePhoto(){
  photoModal.style.display = "none";
}

/* PAGE 8 */
let ys = 1;
function noClick(){
  ys += 0.3;
  yesBtn.style.transform = `scale(${ys})`;
  if(ys > 2.5) noBtn8.style.display = "none";
}
function finalYes(){
  confetti({ particleCount: 320, spread: 180 });
  go(9);
}

/* PAGE 9 */
function replay(){
  location.reload();
   }
