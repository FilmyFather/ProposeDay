let tries=0;
let caught=0;
let gameInt;

function go(n){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById("p"+n).classList.add("active");
}

function unlock(){
  let pass=document.getElementById("pass");
  let msg=document.getElementById("msg");
  let music=document.getElementById("music");

  if(pass.value==="love"){
    music.play();
    go(2);
  }else{
    tries++;
    msg.innerText="Wrong password ❤️";
    pass.classList.add("wrongShake");
    navigator.vibrate(200);
    setTimeout(()=>pass.classList.remove("wrongShake"),300);
    if(tries>=5){
      msg.innerText="Hint: You already know it 😉";
    }
  }
}

function wrong(btn){
  btn.classList.add("wrongShake");
  navigator.vibrate(150);
}

function right(btn){
  btn.classList.add("rightGreen");
  confetti();
}

function nope(){
  alert("Hehe 😜 option hi nahi hai");
}

function startGame(){
  caught=0;
  document.getElementById("bar").style.width="0%";
  let box=document.getElementById("gameBox");

  gameInt=setInterval(()=>{
    let h=document.createElement("span");
    h.innerText="❤️";
    h.style.left=Math.random()*90+"%";
    h.style.top="-20px";
    h.onclick=()=>{
      caught++;
      document.getElementById("bar").style.width=(caught/10*100)+"%";
      h.remove();
      if(caught>=10){
        clearInterval(gameInt);
        go(5);
      }
    };
    box.appendChild(h);
    setTimeout(()=>h.remove(),3000);
  },600);
}

/* HEART BACKGROUND */
for(let i=0;i<25;i++){
  let h=document.createElement("span");
  h.innerText="❤️";
  h.style.left=Math.random()*100+"vw";
  h.style.top=Math.random()*100+"vh";
  h.style.animationDuration=4+Math.random()*4+"s";
  document.getElementById("hearts").appendChild(h);
}
