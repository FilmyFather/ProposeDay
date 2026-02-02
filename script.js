let current=1;
let wrong=0;
let music=document.getElementById("bgMusic");

const taunts=[
"Arre Ghelsodi 😝 itna bhi yaad nahi?",
"Dhapudiii 😜 thoda dimag laga!",
"Bhilan ❌ ye bhi galat!",
"Wagri 🤯 itna bhi tough nahi hai!",
"Gaanduu Insaan 🤦‍♂️ last chance!"
];

function go(n){
document.querySelector(".page.active").classList.remove("active");
document.getElementById("p"+n).classList.add("active");
current=n;
}

function unlock(){
let val=document.getElementById("password").value.trim().toLowerCase();
if(val==="rajkumari"){
music.play();
go(2);
loadQuiz();
}else{
document.getElementById("wrongText").innerText=taunts[wrong%5];
wrong++;
if(wrong===5){
document.getElementById("wrongText").innerText=
"Hint: Agar Yuvraj Rajkumar hai… to tum uski kya ho? 😉";
}
}
}

function toggleMusic(){
music.paused?music.play():music.pause();
}

/* QUIZ */
const quiz=[
{q:"Who is the lucky one in this relationship?",o:["Me","You","Both","Destiny","God"],a:2},
{q:"What is the perfect Propose Day gift?",o:["Expensive Gift","One Night Stand","Whole Day Spend Together","Stay Together For Life","Party In Out Of State"],a:3},
{q:"Will you stay with me forever?",o:["No","Maybe","Not sure","Always","Depends"],a:3},
{q:"Who do you love the most?",o:["Family","Friends","Everyone","Yuvraj","Myself"],a:3},
{q:"After 3 beautiful years together, will you be mine forever? 💍",o:[
"Yes, today and always ❤️",
"Forever and beyond ♾️",
"I already belong to you 😘",
"Till my last breath 💕",
"All of the above 💍❤️"
],a:4},
{q:"Will you choose me again every single day? 💍",o:[
"Yes, without thinking",
"Always and forever",
"In every lifetime",
"Already chosen ❤️",
"All of the above 💕"
],a:4},
{q:"What matters the most in our relationship?",o:["Love","Care","Understanding","Loyalty","Trust"],a:4},
{q:"Final answer… will you be mine forever?",o:["No","Maybe","I’ll think","Not sure","Yes"],a:4}
];

let qi=0;

function loadQuiz(){
let q=quiz[qi];
document.getElementById("qText").innerText=(qi+1)+". "+q.q;
let box=document.getElementById("options");
box.innerHTML="";
q.o.forEach((t,i)=>{
let b=document.createElement("button");
b.innerText=t;
b.onclick=()=>check(i,b);
box.appendChild(b);
});
}

function check(i,b){
if(i===quiz[qi].a){
b.style.background="green";
setTimeout(()=>{
qi++;
qi<quiz.length?loadQuiz():go(3);
},600);
}else{
b.style.background="red";
b.style.animation="shake .3s";
navigator.vibrate?.(200);
}
}

/* PAGE 3 NO BTN */
const noBtn=document.getElementById("noBtn");
noBtn.onmouseover=()=>{
noBtn.style.position="absolute";
noBtn.style.left=Math.random()*80+"%";
noBtn.style.top=Math.random()*80+"%";
};

/* HUNT */
let found=0;
const grid=document.getElementById("huntGrid");
[1,0,0,0,1,0,0,0,1].sort(()=>0.5-Math.random()).forEach(v=>{
let d=document.createElement("div");
d.innerText=v?"💍":"💩";
d.onclick=()=>{
if(v){
found++;document.getElementById("ringCount").innerText=found;
if(found===3)go(5);
}
};
grid.appendChild(d);
});

/* GAME */
let caught=0;
function startGame(){
caught=0;
document.querySelector("#progress div").style.width="0%";
let box=document.getElementById("gameBox");
let interval=setInterval(()=>{
if(current!==5){clearInterval(interval);return;}
let h=document.createElement("span");
h.className="heart";
h.innerText="❤️";
h.style.left=Math.random()*90+"%";
h.style.top="-10px";
h.onclick=()=>{
caught++;
document.querySelector("#progress div").style.width=(caught/12*100)+"%";
h.remove();
if(caught>=12){clearInterval(interval);go(6);}
};
box.appendChild(h);
setTimeout(()=>h.remove(),3000);
},600);
}

function openLetter(){
document.getElementById("letter").classList.remove("hidden");
}

function growYes(){
let y=document.getElementById("yesBtn");
y.style.transform="scale(1.3)";
}
