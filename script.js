const pages=document.querySelectorAll(".page");
const music=document.getElementById("music");
let currentPage=1;

/* PAGE SWITCH */
function go(n){
 pages.forEach(p=>p.classList.remove("active"));
 document.getElementById("p"+n).classList.add("active");
 currentPage=n;
 if(n===2)loadQuestion();
 if(n===4)initHunt();
}

/* HEARTS */
const hb=document.getElementById("hearts");
for(let i=0;i<30;i++){
 let h=document.createElement("div");
 h.className="heart";h.innerText="❤️";
 h.style.left=Math.random()*100+"%";
 h.style.top=Math.random()*100+"%";
 h.style.fontSize=12+Math.random()*18+"px";
 hb.appendChild(h);
}

/* MUSIC */
music.addEventListener("loadedmetadata",()=>{music.currentTime=62});
function toggleOptions(){options.classList.toggle("show")}
function setVolume(v){
 if(v===0){music.pause()}
 else{music.volume=v;music.play().catch(()=>{})}
}

/* LOCK */
const PASSWORD="rajkumari";
let wrong=0;
const taunts=[
 "Arre Ghelsodi 😝",
 "Dhapudiii 😜",
 "Bhilan ❌",
 "Wagri 🤯",
 "Gaanduu Insaan 🤦‍♂️"
];
function unlock(){
 if(password.value.toLowerCase().trim()===PASSWORD){
  confetti({particleCount:200,spread:120});
  music.play();
  go(2);
 }else{
  lockMsg.innerText=taunts[wrong]||lockMsg.innerText;
  if(++wrong===5){
   lockMsg.innerText+="\nHint: Agar Yuvraj Rajkumar hai… to tum uski kya ho?";
  }
  password.classList.add("shake");
  setTimeout(()=>password.classList.remove("shake"),300);
 }
}

/* QUIZ */
const quiz=[
 {q:"Who is the lucky one?",o:["Me","You","Both","Us","Always You"],a:2},
 {q:"What do you want from me?",o:["Gift","ONS","Day Together","Life Together","Party"],a:3}
];
let qi=0;
function loadQuestion(){
 qNo.innerText=(qi+1)+".";
 question.innerText=quiz[qi].q;
 optionsBox.innerHTML="";
 quiz[qi].o.forEach((t,i)=>{
  let b=document.createElement("div");
  b.className="quiz-option";b.innerText=t;
  b.onclick=()=>{
   if(i===quiz[qi].a){
    b.classList.add("correct");
    confetti({particleCount:80,spread:60});
    setTimeout(()=>{qi++;qi<quiz.length?loadQuestion():go(3)},600);
   }else{
    b.classList.add("wrong","shake");
    navigator.vibrate?.(200);
   }
  };
  optionsBox.appendChild(b);
 });
}

/* PAGE 3 NO */
noBtn.onmouseover=()=>{noBtn.style.left=Math.random()*80+"%";noBtn.style.top=Math.random()*80+"%"}

/* HUNT */
let found=0;
function initHunt(){
 found=0;ringCount.innerText=0;huntGrid.innerHTML="";
 const items=[
  "💩","💩","💍",
  "💩","💍","💩",
  "💩","💩","💍"
 ];
 items.forEach(it=>{
  let c=document.createElement("div");
  c.className="card";c.innerText="🍃";
  c.onclick=()=>{
   c.innerText=it;
   if(it==="💍"&&++found===3)setTimeout(()=>go(5),1000);
   ringCount.innerText=found;
   c.onclick=null;
  };
  huntGrid.appendChild(c);
 });
}

/* GAME */
let caught=0,intv;
function startGame(){
 caught=0;bar.style.width="0%";gameBox.innerHTML="";
 clearInterval(intv);
 intv=setInterval(()=>{
  if(currentPage!==5)return;
  let h=document.createElement("div");
  h.className="fall-heart";h.innerText="❤️";
  h.style.left=Math.random()*90+"%";
  h.onclick=()=>{
   caught++;bar.style.width=(caught/12*100)+"%";
   h.remove();
   if(caught>=12){clearInterval(intv);go(6)}
  };
  gameBox.appendChild(h);
  setTimeout(()=>h.remove(),3000);
 },600);
}

/* LETTER */
function openLetter(){letter.classList.add("show")}

/* PHOTOS */
function openPhoto(s){modalImg.src=s;photoModal.style.display="flex"}
function closePhoto(){photoModal.style.display="none"}

/* YES NO */
let ys=1;
function noClick(){ys+=.3;yesBtn.style.transform=`scale(${ys})`;if(ys>2.5)noBtn8.style.display="none"}
function finalYes(){confetti({particleCount:300,spread:160});go(9)}
function replay(){location.reload()}
