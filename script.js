let current=1;
const music=document.getElementById("bgMusic");

/* NAV */
function go(n){
  document.getElementById("p"+current).classList.remove("active");
  current=n;
  document.getElementById("p"+current).classList.add("active");
}

/* BACKGROUND HEARTS */
for(let i=0;i<20;i++){
  const h=document.createElement("span");
  h.innerText="❤️";
  h.style.left=Math.random()*100+"%";
  h.style.top=Math.random()*100+"%";
  document.getElementById("bgHearts").appendChild(h);
}

/* LOCK */
let wrong=0;
const taunts=[
 "Arre Ghelsodi 😝",
 "Dhapudiii soch 😜",
 "Bhilan galat ❌",
 "Wagri dimag laga 🤯",
 "Gaanduu Insaan 🤦‍♂️"
];
function unlock(){
  const v=document.getElementById("password").value.toLowerCase();
  if(v==="rajkumari"){
    music.currentTime=62;
    music.play();
    loadQuiz();
    go(2);
  }else{
    document.getElementById("lockMsg").innerText=
      wrong>=4
      ?"Hint: Agar Yuvraj Rajkumar hai… to tum kya ho?"
      :taunts[wrong++];
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
let qi=0;
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
        qi++;
        qi<quiz.length?loadQuiz():go(3);
      }else{
        b.style.background="red";
        b.classList.add("shake");
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

/* HUNT */
let found=0;
["💍","💩","💍","💩","💍","💩"].forEach(x=>{
  const s=document.createElement("span");
  s.innerText=x;
  s.onclick=()=>{
    if(x==="💍"){found++;s.remove();}
    if(found===3)go(5);
  };
  document.getElementById("hunt").appendChild(s);
});

/* GAME */
let caught=0,interval;
function startGame(){
  caught=0;
  document.getElementById("bar").style.width="0%";
  clearInterval(interval);
  interval=setInterval(()=>{
    const h=document.createElement("div");
    h.className="heart";
    h.innerText="❤️";
    h.style.left=Math.random()*90+"%";
    h.onclick=()=>{
      caught++;
      document.getElementById("bar").style.width=(caught/12*100)+"%";
      h.remove();
      if(caught>=12){clearInterval(interval);go(6);}
    };
    document.getElementById("gameBox").appendChild(h);
    setTimeout(()=>h.remove(),3000);
  },600);
}

/* YES NO */
function yes(){go(9);}
function no(){
  const b=document.getElementById("noBtn");
  b.style.left=Math.random()*70+"%";
  b.style.top=Math.random()*70+"%";
  b.style.position="absolute";
}
