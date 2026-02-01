/* PAGE NAVIGATION */
function go(n){
  document.querySelectorAll('.page')
    .forEach(p=>p.classList.remove('active'));
  document.getElementById('p'+n).classList.add('active');
}

/* MUSIC + LOCK */
let wrong = 0;
let musicStarted = false;
const bg = document.getElementById("bgMusic");

function unlock(){
  const v = document.getElementById("pass")
            .value.toLowerCase().trim();

  if(v === "rajkumari"){
    if(!musicStarted){
      bg.currentTime = 62;
      bg.volume = 0.8;
      bg.play();
      musicStarted = true;
    }
    go(2);
  }else{
    wrong++;
    const words = [
      "Ghelsodi 😝",
      "Dhapudiii 😂",
      "Bhilan 😆",
      "Wagri 😜",
      "Gaanduu Insaan 🤣"
    ];
    const msg = document.getElementById("lockMsg");
    msg.innerText = words[wrong % words.length];

    if(wrong >= 5){
      msg.innerText =
        "Hint: If Yuvraj is Rajkumar… then who are you? 👑";
    }
  }
}

/* QUIZ */
const quiz = [
 ["01. Who is the lucky one?","You","Me","Both of us","Destiny","Secret",2],
 ["02. Perfect propose gift?","Gifts","Ring","Your hand","Chocolate","Food",2],
 ["03. Stay forever?","Maybe","No","Yes, always","Later","Ask later",2],
 ["04. Who understands you?","Friends","Family","Yuvraj","Time","No one",2],
 ["05. Who gets angry first?","You","Me","Both","No one","Depends",4],
 ["06. Who says sorry first?","You","Me","Both","No one","Mood pe",4],
 ["07. What matters most?","Looks","Money","Trust","Luck","Drama",2],
 ["08. Are we meant to be?","No","Maybe","Yes","Time","Secret",2]
];

let qi = 0;
const qb = document.getElementById("quizBox");
const qr = document.getElementById("quizReact");

function showQ(){
  qb.innerHTML = `<p>${quiz[qi][0]}</p>`;
  qr.innerText = "";

  for(let i=1;i<=5;i++){
    const d = document.createElement("div");
    d.className = "option";
    d.innerText = quiz[qi][i];

    d.onclick = () => {
      if(i-1 === quiz[qi][6]){
        d.classList.add("correct");
        setTimeout(()=>{
          qi++;
          qi < quiz.length ? showQ() : go(3);
        },500);
      }else{
        d.classList.add("wrong");
        qr.innerText = "Galat 😝 phir socho!";
      }
    };
    qb.appendChild(d);
  }
}
showQ();

/* PROPOSAL HUNT */
let r = 0;
function hunt(){
  r++;
  document.getElementById("rings").innerText = r;
  if(r >= 3) go(5);
}

/* FLOATING HEARTS */
setInterval(()=>{
  const h = document.createElement("div");
  h.className = "heart";
  h.innerText = "❤️";
  h.style.left = Math.random()*100 + "vw";
  h.style.animationDuration =
    2 + Math.random()*3 + "s";
  document.body.appendChild(h);
  setTimeout(()=>h.remove(),5000);
},300);
