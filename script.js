let current=1;
let wrong=0;
let qi=0;
let found=0;

const music=document.getElementById("bgMusic");

/* NAV */
function go(n){
  document.getElementById("p"+current).classList.remove("active");
  current=n;
  document.getElementById("p"+current).classList.add("active");
}

/* LOCK — FINAL TAUNTS (AS YOU SAID) */
const taunts = [
  "Arre Pagli 😝 itna bhi nahi pata?",
  "Hint dimaag me tha, par use nahi kiya 😜",
  "Galat hai madam ji 🎬 thoda socho",
  "Yuvraj bhi shock me hai 🤯",
  "Nope ❌ ye bhi nahi"
];

function unlock(){
  const input=document.getElementById("password");
  const msg=document.getElementById("lockMsg");
  const v=input.value.trim().toLowerCase();

  if(v==="rajkumari"){
    msg.innerText="Unlocked 💖";
    msg.style.color="lightgreen";
    music.currentTime=62;
    music.play();
    loadQuiz();
    setTimeout(()=>go(2),400);
  }else{
    input.classList.add("shake");
    setTimeout(()=>input.classList.remove("shake"),300);
    msg.style.color="#ffb3b3";
    msg.innerText = wrong>=5
      ? "Hint ❤️: Agar Yuvraj Rajkumar hoga to tum uski kya hogi…? 😉"
      : taunts[wrong];
    wrong++;
  }
}

/* QUIZ */
const quiz=[
 {q:"Who is the lucky one?",o:["Me","You","Both"],c:1},
 {q:"Perfect propose gift?",o:["Ring","Chocolate","Heart"],c:0},
 {q:"Stay forever?",o:["Yes","No"],c:0},
 {q:"Who loves more?",o:["You","Yuvraj"],c:1},
 {q:"Relationship depends on?",o:["Mood","Trust"],c:1},
 {q:"Fight ke baad?",o:["Ignore","Talk"],c:1},
 {q:"Forever means?",o:["Time","Always"],c:1},
 {q:"Final answer?",o:["Yes","No"],c:0}
];

function loadQuiz(){
  const q=quiz[qi];
  document.getElementById("quizQ").innerText=`0${qi+1}. ${q.q}`;
  const box=document.getElementById("quizOpt");
  box.innerHTML="";
  q.o.forEach((t,i)=>{
    const b=document.createElement("button");
    b.innerText=t;
    b.onclick=()=>{
      if(i===q.c){
        b.style.background="green";
        qi++;
        setTimeout(()=>qi<quiz.length?loadQuiz():go(3),400);
      }else{
        b.style.background="red";
        b.classList.add("shake");
        setTimeout(()=>b.classList.remove("shake"),300);
      }
    };
    box.appendChild(b);
  });
}

/* NO RUN */
const noRun=document.getElementById("noRun");
noRun.onmouseover=()=>{
  noRun.style.position="absolute";
  noRun.style.left=Math.random()*70+"%";
  noRun.style.top=Math.random()*70+"%";
};

/* PROPOSAL HUNT — 3x3, each row 1 ring */
const huntGrid=document.getElementById("huntGrid");
const rows=[
 ["💍","💩","💩"],
 ["💩","💍","💩"],
 ["💩","💩","💍"]
];
rows.forEach(r=>{
  r.sort(()=>Math.random()-0.5);
  r.forEach(x=>{
    const c=document.createElement("div");
    c.className="huntCard";
    c.innerText="❓";
    c.onclick=()=>{
      if(c.clicked) return;
      c.clicked=true;
      c.innerText=x;
      if(x==="💍"){
        found++;
        document.getElementById("huntCount").innerText=`Rings Found: ${found} / 3`;
        if(found===3) setTimeout(()=>go(5),600);
      }
    };
    huntGrid.appendChild(c);
  });
});

/* GAME */
let caught=0,interval;
function startGame(){
  caught=0;
  bar.style.width="0%";
  clearInterval(interval);
  interval=setInterval(()=>{
    const h=document.createElement("div");
    h.className="heart";
    h.innerText="❤️";
    h.style.left=Math.random()*90+"%";
    h.onclick=()=>{
      caught++;
      bar.style.width=(caught/12*100)+"%";
      h.remove();
      if(caught>=12){clearInterval(interval);go(6)}
    };
    gameBox.appendChild(h);
    setTimeout(()=>h.remove(),3000);
  },600);
}

/* YES / NO */
function yes(){go(9)}
function no(){
  noBtn.style.position="absolute";
  noBtn.style.left=Math.random()*70+"%";
  noBtn.style.top=Math.random()*70+"%";
                   }
