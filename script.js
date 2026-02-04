let currentPage=1;
const pages=document.querySelectorAll(".page");
const music=document.getElementById("music");

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
let volState=0;
function toggleOptions(){document.getElementById("options").classList.toggle("show")}
function setVolume(v){
 if(v===0){music.pause()}
 else{music.volume=v;if(music.paused)music.play()}
 document.getElementById("options").classList.remove("show")
}

/* PAGE SWITCH */
function go(n){
 pages.forEach(p=>p.classList.remove("active"));
 document.getElementById("p"+n).classList.add("active");
 currentPage=n;
 if(n===2)loadQuestion();
 if(n===4)initHunt();
}

/* LOCK */
let wrong=0;
const taunts=[
 "Arre Ghelsodi 😝 Itna Bhi Mushkil Nahi Hai Loduuu...!",
 "Dhapudiii 😜 Dil Se Try Karoo Dil Aur Ye Website Dono La Lock Khul Jayegaa..!",
 "Bhilan Fir Galat ❌ 3 Saal Ka Pyar Hai Apana Uska To Khyaal Rakho...!",
 "Wagri 🤯 Fir Galat Yeh Bhi Tumko Mujhse Pyaar Hi Nahi Hai....!",
 "Gaanduu Insaan 🤦‍♂️ Last Chance !"
];
function unlock(){
 let v=password.value.toLowerCase().trim();
 if(v==="rajkumari"){
  confetti({particleCount:200,spread:120});
  music.play();
  go(2);
 }else{
  lockMsg.innerText+=taunts[wrong]+"\n";
  wrong++;
  if(wrong===5)lockMsg.innerText+="\nHint: Agar Yuvraj Rajkumar hai… to tum uski kya ho? ❤️";
 }
}

/* QUIZ */
const quiz=[
 {q:"01. Who is the lucky one?",o:["Me","You","Both","Us","Always You"],a:2},
 {q:"02. What do you want from me?",o:["Gift","One Night Stand","Time","Stay Forever","Party"],a:3},
 {q:"03. Our first meet?",o:["Chat","Call","School","Instagram","Unknown"],a:1},
 {q:"04. Who says sorry first?",o:["You","Me","Both","Nobody","Depends"],a:2},
 {q:"05. Who loves more?",o:["Me","You","Both","Equal","Infinity"],a:4},
 {q:"06. Favourite moment?",o:["Fight","Date","Late chat","Trip","All"],a:4},
 {q:"07. Future plan?",o:["Travel","Marriage","Kids","Business","All"],a:4},
 {q:"08. Final choice?",o:["No","Maybe","Yes","Always Yes","Only You"],a:3}
];
let qi=0;
function loadQuestion(){
 qNo.innerText=quiz[qi].q;
 question.innerText="";
 optionsBox.innerHTML="";
 quiz[qi].o.forEach((t,i)=>{
  let d=document.createElement("div");
  d.className="quiz-option";d.innerText=t;
  d.onclick=()=>{
   if(i===quiz[qi].a){
    d.classList.add("correct");
    confetti({particleCount:80,spread:80});
    setTimeout(()=>{qi++;qi<quiz.length?loadQuestion():go(3)},700);
   }else{
    d.classList.add("wrong","shake");
    navigator.vibrate?.(200);
   }
  };
  optionsBox.appendChild(d);
 });
}

/* PAGE 3 NO */
noBtn.onmouseover=()=>{noBtn.style.left=Math.random()*80+"%";noBtn.style.top=Math.random()*80+"%"}

/* HUNT */
let found=0;
function initHunt(){
 found=0;ringCount.innerText=0;huntGrid.innerHTML="";
 const items=["💩","💩","💍","💩","💍","💩","💩","💩","💍"];
 items.forEach(it=>{
  let c=document.createElement("div");
  c.className="card";c.innerText="🍃";
  c.onclick=()=>{
   c.innerText=it;
   if(it==="💍"){found++;ringCount.innerText=found;if(found===3)setTimeout(()=>go(5),1000)}
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
  h.className="fall-heart";h.innerText="𓆩❤︎𓆪";
  h.style.left=Math.random()*90+"%";
  h.onclick=()=>{
   caught++;bar.style.width=(caught/12*100)+"%";h.remove();
   if(caught>=12){clearInterval(intv);go(6)}
  };
  gameBox.appendChild(h);
  setTimeout(()=>h.remove(),3000);
 },600);
}

/* LETTER */
function openLetter(){document.getElementById("letter").classList.add("show")}

/* PHOTOS */
function openPhoto(s){modalImg.src=s;photoModal.style.display="flex"}
function closePhoto(){photoModal.style.display="none"}

/* YES NO */
let ys=1;
function noClick(){ys+=.3;yesBtn.style.transform=`scale(${ys})`;if(ys>2.5)noBtn8.style.display="none"}
function finalYes(){confetti({particleCount:300,spread:160});go(9)}
