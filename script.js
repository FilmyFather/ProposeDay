/* NAV */
function go(n){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById("p"+n).classList.add("active");
}

/* MUSIC */
const music=document.getElementById("bgMusic");
let playing=false;
function toggleMusic(){
  if(!playing){music.play();playing=true;onOffBtn.innerText="ON";}
  else{music.pause();playing=false;onOffBtn.innerText="OFF";}
}
function setVolume(v){music.volume=v}

/* LOCK */
let wrong=0;
const taunts=[
 "Arre Pagli 😝 itna bhi nahi pata?",
 "Ghelsodi 😜 thoda socho",
 "Dhapudiii 😂 fir try karo",
 "Bhilan 😆 almost",
 "💡 Hint: Agar Yuvraj Rajkumar hai… to tum kaun ho? 👑"
];
function unlock(){
 const v=document.getElementById("password").value.toLowerCase();
 if(v==="rajkumari"){
  music.currentTime=62;
  music.play();playing=true;
  go(2);
 }else{
  document.getElementById("lockMsg").innerText=taunts[Math.min(wrong,4)];
  wrong++;
 }
}

/* QUIZ */
const quiz=[
 ["01. Who is the lucky one?",["You","Me","Both","Destiny","Secret"],2],
 ["02. Perfect propose gift?",["Chocolate","Ring","Your hand","Trip","Food"],2],
 ["03. Will you stay forever?",["No","Maybe","Always","Later","Ask"],2],
 ["04. Who understands you?",["Friends","Family","Yuvraj","Nobody","Time"],2],
 ["05. Depends on?",["Mood","Fight","Time","Food","Depends"],4],
 ["06. Sorry first?",["You","Me","Both","No one","Mood pe"],4],
 ["07. Most important?",["Looks","Money","Trust","Luck","Drama"],2],
 ["08. Are we meant to be?",["No","Maybe","Yes","Time","Secret"],2]
];
let qi=0;
function showQ(){
 qNo.innerText=quiz[qi][0];
 qText.innerText="";
 options.innerHTML="";
 quiz[qi][1].forEach((t,i)=>{
  const d=document.createElement("div");
  d.className="option";
  d.innerText=t;
  d.onclick=()=>{
   if(i===quiz[qi][2]){
    d.style.background="#1faa59";
    setTimeout(()=>{qi++;qi<quiz.length?showQ():go(3)},600);
   }else{
    d.style.background="#c0392b";
    d.classList.add("shake");
   }
  };
  options.appendChild(d);
 });
}
showQ();

/* RUN BUTTON */
runBtn.onmouseover=()=>{
 runBtn.style.position="absolute";
 runBtn.style.left=Math.random()*70+"%";
 runBtn.style.top=Math.random()*70+"%";
};

/* PROPOSAL HUNT */
let found=0;
const ringsPos=[0,2,5];
for(let i=0;i<9;i++){
 const d=document.createElement("div");
 d.innerText="🌿";
 d.onclick=()=>{
  if(ringsPos.includes(i)&&!d.done){
    d.innerText="💍";found++;d.done=true;
    ringCount.innerText=found;
    if(found===3) setTimeout(()=>go(5),600);
  }else d.innerText="💩";
 };
 huntGrid.appendChild(d);
}

/* HEART GAME */
let caught=0;
function startGame(){
 caught=0;bar.style.width="0%";
 const int=setInterval(()=>{
  if(!p5.classList.contains("active")) return;
  const h=document.createElement("span");
  h.innerText="❤️";
  h.style.position="absolute";
  h.style.left=Math.random()*85+"%";
  h.style.top="-20px";
  h.onclick=()=>{
    caught++;bar.style.width=(caught/12*100)+"%";
    h.remove();
    if(caught>=12){clearInterval(int);go(6);}
  };
  gameBox.appendChild(h);
  setTimeout(()=>h.remove(),3000);
 },600);
}

/* PHOTOS */
function openPhoto(i){
 photoModal.style.display="flex";
 modalImg.src=i.src;
}
function closePhoto(){photoModal.style.display="none";}

/* YES NO */
let scale=1;
function noClick(){
 scale+=.2;
 yesBtn.style.transform=`scale(${scale})`;
 noBtn.innerText=["Please 🥺","Are you sure?","Click YES!"][Math.min(scale-1,2)];
}
function yesClick(){go(9);}
