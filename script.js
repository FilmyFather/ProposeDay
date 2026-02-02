const pages=[...document.querySelectorAll(".page")];
function go(n){pages.forEach(p=>p.classList.add("hidden-page"));pages[n-1].classList.remove("hidden-page");}

const music=new Audio("http://ddl.safone.vip/4422238/Finding_Her_x_Dooron_Dooron_Mashup_Full_Version_Kushagra_Paresh.mp3");

let wrong=0;
const taunts=[
 "Arre Pagli 😝 itna bhi nahi pata?",
 "Ghelsodi 😜 thoda socho",
 "Dhapudiii 😂 almost",
 "Bhilan 😆 ek baar aur",
 "💡 Hint: Agar Yuvraj Rajkumar hai… to tum kaun ho? 👑"
];

function unlock(){
 const v=document.getElementById("password").value.trim().toLowerCase();
 const msg=document.getElementById("lockMsg");
 if(v==="rajkumari"){
   music.currentTime=62;music.play();
   go(2);
 }else{
   msg.innerText=taunts[Math.min(wrong,4)];
   if(navigator.vibrate)navigator.vibrate([80,40,80]);
   wrong++;
 }
}

/* QUIZ */
const quiz=[
 ["01. Lucky one?",["You","Me","Both","Destiny","Secret"],2],
 ["02. Perfect gift?",["Chocolate","Ring","Your hand","Trip","Food"],2],
 ["03. Forever?",["No","Maybe","Always","Later","Ask"],2],
 ["04. Understands you?",["Friends","Family","Yuvraj","Nobody","Time"],2],
 ["05. Depends on?",["Mood","Fight","Time","Food","Depends"],4],
 ["06. Sorry first?",["You","Me","Both","No one","Mood pe"],4],
 ["07. Most important?",["Looks","Money","Trust","Luck","Drama"],2],
 ["08. Meant to be?",["No","Maybe","Yes","Time","Secret"],2]
];
let qi=0;
function showQ(){
 document.getElementById("qNo").innerText=quiz[qi][0];
 const opt=document.getElementById("options");opt.innerHTML="";
 quiz[qi][1].forEach((t,i)=>{
  const b=document.createElement("button");
  b.className="btn-primary";
  b.innerText=t;
  b.onclick=()=>{
   if(i===quiz[qi][2]){
    qi++;qi<quiz.length?showQ():go(3);
   }else if(navigator.vibrate)navigator.vibrate([80,40,80]);
  };
  opt.appendChild(b);
 });
}
showQ();

/* RUN */
runBtn.onmouseover=()=>{runBtn.style.position="absolute";runBtn.style.left=Math.random()*70+"%";runBtn.style.top=Math.random()*70+"%";}

/* RING */
let found=0;
[...Array(9)].forEach((_,i)=>{
 const d=document.createElement("div");d.innerText="🌿";
 d.onclick=()=>{
  if([0,2,5].includes(i)&&!d.done){
   d.innerText="💍";d.done=true;found++;
   ringCount.innerText=found;
   if(found===3)go(5);
  }else d.innerText="💩";
 };
 huntGrid.appendChild(d);
});

/* HEART GAME */
let caught=0,interval;
startGameBtn.onclick=()=>{
 caught=0;bar.style.width="0%";
 interval=setInterval(()=>{
  const h=document.createElement("span");
  h.innerText="❤️";h.style.position="absolute";
  h.style.left=Math.random()*85+"%";h.style.top="-20px";
  gameBox.appendChild(h);
  requestAnimationFrame(()=>h.style.top="110%");
  h.onclick=()=>{
   caught++;bar.style.width=(caught/12*100)+"%";h.remove();
   if(caught>=12){clearInterval(interval);go(6);}
  };
  setTimeout(()=>h.remove(),3000);
 },700);
};

/* PHOTOS */
function openPhoto(i){photoModal.style.display="flex";modalImg.src=i.src;}
function closePhoto(){photoModal.style.display="none";}

/* YES NO */
let scale=1;
function noClick(){scale+=.2;yesBtn.style.transform=`scale(${scale})`;}
function yesClick(){confetti();go(9);}
