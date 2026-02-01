const pages=document.querySelectorAll(".page");
let p=0;
const music=document.getElementById("bgMusic");
let musicUnlocked=false;

function nextPage(){
  pages[p].classList.remove("active");
  p++;
  pages[p].classList.add("active");
}

function startJourney(){
  unlockMusic();
  nextPage();
}

function unlockMusic(){
  if(musicUnlocked) return;
  music.currentTime=62;
  music.volume=0.7;
  music.play();
  musicUnlocked=true;
}

/* MUSIC VOLUME */
document.querySelectorAll(".music-pill span").forEach(b=>{
  b.onclick=()=>music.volume=b.dataset.vol;
});

/* QUIZ */
const quiz=[
 {q:"Who is the lucky one?",a:"Both of us! 🥰"},
 {q:"Perfect Propose gift?",a:"My heart ❤️"},
 {q:"Stay forever?",a:"Yes, always ❤️"}
];
let qi=0;
const qb=document.getElementById("quizBox");
function renderQuiz(){
  qb.innerHTML=`<p>${quiz[qi].q}</p>
  <button onclick="correct()"> ${quiz[qi].a} </button>`;
}
function correct(){
  qi++;
  qi<quiz.length?renderQuiz():nextPage();
}
renderQuiz();

/* RUN BUTTON */
const run=document.getElementById("runBtn");
run.onmouseover=()=>run.style.transform=`translate(${Math.random()*120}px,${Math.random()*60}px)`;

/* PROPOSAL HUNT */
let rings=0;
const grid=document.getElementById("huntGrid");
for(let i=0;i<9;i++){
  const d=document.createElement("div");
  d.innerText="🌿";
  d.onclick=()=>{
    if(Math.random()<0.33 && rings<3){
      rings++;d.innerText="💍";
      document.getElementById("ringCount").innerText=`Rings: ${rings}/3`;
      if(rings===3) setTimeout(nextPage,600);
    }else d.innerText="💩";
  };
  grid.appendChild(d);
}

/* CATCH LOVE */
const bar=document.getElementById("bar");
let caught=0;
document.getElementById("startGame").onclick=()=>{
  const area=document.getElementById("gameArea");
  area.innerHTML="";
  let i=setInterval(()=>{
    const h=document.createElement("span");
    h.innerText="❤️";
    h.style.position="absolute";
    h.style.left=Math.random()*80+"%";
    h.onclick=()=>{
      caught++;bar.style.width=(caught/12*100)+"%";
      h.remove();
      if(caught>=12){clearInterval(i);nextPage();}
    };
    area.appendChild(h);
  },700);
};

/* YES GROW */
const yes=document.getElementById("yesBtn");
const alt=document.getElementById("altBtn");
let scale=1;
alt.onclick=()=>{
  scale+=0.2;
  yes.style.transform=`scale(${scale})`;
  alt.innerText=["No","Please","Are you sure?","Click YES!"][Math.floor(scale*2)%4];
  if(scale>2){alt.style.display="none";}
};
yes.onclick=()=>nextPage();
