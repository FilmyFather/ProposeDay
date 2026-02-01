const music = document.getElementById("bgMusic");
const playBtn = document.getElementById("playBtn");
const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");

function unlock() {
  const input = document.getElementById("passwordInput")
                .value.trim().toLowerCase();

  if (input === "rajkumari") {
    document.getElementById("lockScreen").style.display = "none";
    document.getElementById("mainContent").classList.remove("hidden");

    music.currentTime = 62; // 01:02
    music.volume = 0.7;
    music.play();
    playBtn.innerText = "⏸️";
  } else {
    document.getElementById("errorMsg").innerText =
      "❌ Galat password! Rajkumari fir se try karo 😄";
  }
}

function toggleMusic() {
  if (music.paused) {
    music.play();
    playBtn.innerText = "⏸️";
  } else {
    music.pause();
    playBtn.innerText = "▶️";
  }
}

function setVolume(val) {
  music.volume = val;
}

function openImg(el) {
  modalImg.src = el.src;
  modal.classList.add("show");
}

function closeImg() {
  modal.classList.remove("show");
}
