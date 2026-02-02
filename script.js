let current=1;
const music=document.getElementById("music");

function go(n){
  document.getElementById("p"+current).classList.remove("active");
  current=n;
  document.getElementById("p"+current).classList.add("active");
}

/* LOCK */
let wrong=0;
function unlock(){
  const val=document.getElementById("password").value.toLowerCase();
  if(val==="rajkumari"){
    music.currentTime=62;
    music.play();
    go(2);
    loadQuiz();
  }else{
    wrong++;
    document.getElementById("lockMsg").innerText=
      wrong>=5?"Hint: Agar Yuvraj Rajkumar hai to tum kya ho?":"Wrong password";
  }
}

/* QUIZ */
const quiz=[
  {q:"Who is the lucky one?",o:["Me","You","Both"],c:1},
  {q:"Perfect gift?",o:["Ring","Chocolate","Heart"],c:0},
  {q:"Stay forever?",o:["Yes","No"],c:0}
];
let qi=0;
function loadQuiz(){
  const q=quiz[qi];
  document.getElementById("qTitle").innerText=q.q;
  const box=document.getElementById("options");
  box.innerHTML="";
  q.o.forEach((t,i)=>{
    const b=document.createElement("button");
    b.innerText=t;
    b.onclick=()=>{
      if(i===q.c){
        qi++;
        qi<quiz.length?loadQuiz():go(3);
      }
    };
    box.appendChild(b);
  });
}

/* PROPOSAL HUNT */
const hunt=document.getElementById("huntGrid");
let found=0;
["💍","💩","💍","💩","💍","💩"].forEach(x=>{
  const s=document.createElement("span");
  s.innerText=x;
  s.onclick=()=>{
    if(x==="💍"){found++;s.remove();}
    if(found===3)go(5);
  };
  hunt.appendChild(s);
});

/* CATCH MY LOVE */
let caught=0,interval;
document.getElementById("startGame").onclick=()=>{
  const box=document.getElementById("gameBox");
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
    box.appendChild(h);
    setTimeout(()=>h.remove(),3000);
  },600);
};

/* YES / NO */
function yes(){go(9);}
function no(){
  const b=document.getElementById("noBtn");
  b.style.position="absolute";
  b.style.left=Math.random()*70+"%";
  b.style.top=Math.random()*70+"%";
}
