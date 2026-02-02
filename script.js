document.addEventListener("DOMContentLoaded", () => {

  const gameBox = document.getElementById("gameBox");
  const bar = document.getElementById("bar");
  const startBtn = document.getElementById("startBtn");

  let caught = 0;
  let gameRunning = false;
  let dropInterval;

  startBtn.addEventListener("click", () => {
    if (gameRunning) return;

    gameRunning = true;
    caught = 0;
    bar.style.width = "0%";
    gameBox.innerHTML = "";

    dropInterval = setInterval(dropHeart, 600);
  });

  function dropHeart() {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.innerText = "❤️";

    const left = Math.random() * 85;
    heart.style.left = left + "%";
    heart.style.top = "-30px";

    gameBox.appendChild(heart);

    let top = -30;
    const fall = setInterval(() => {
      top += 4;
      heart.style.top = top + "px";

      if (top > gameBox.clientHeight) {
        clearInterval(fall);
        heart.remove();
      }
    }, 30);

    heart.onclick = () => {
      clearInterval(fall);
      heart.remove();
      caught++;
      bar.style.width = (caught / 12) * 100 + "%";

      if (caught >= 12) {
        endGame();
      }
    };
  }

  function endGame() {
    clearInterval(dropInterval);
    gameRunning = false;

    setTimeout(() => {
      alert("❤️ Level Complete!");
      // yaha go(6) ya next page call karega
    }, 200);
  }

});
