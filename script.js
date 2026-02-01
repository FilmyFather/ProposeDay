const correctPass = "rajkumari";
let wrongCount = 0;

const msgs = [
  "Arre Ghelsodi 😝 itna bhi yaad nahi? Dhapudiii kahin ki…",
  "Oye Bhilan 😆 Wagri mode ON ho gaya kya?",
  "Gaanduu Insaan 😜 par cute wali, phir try kar",
  "Dhapudiii 😂 dil se soch, dimaag nahi",
  "Ghelsodi + Wagri full combo lag raha hai 😝",
  "Arre Bhilan 😅 Yuvraj bhi has raha hoga",
  "Gaanduu Insaan 😂 hint saamne hai phir bhi miss?",
  "Dhapudiii nahi re… pyaar se type kar 💖"
];

function checkPass() {
  const input = document.getElementById("passInput").value.trim().toLowerCase();
  const msgBox = document.getElementById("msg");
  const hintBox = document.getElementById("hintText");

  if (!input) return;

  if (input === correctPass) {
    const music = document.getElementById("bgMusic");
    music.currentTime = 62;
    music.play();

    document.querySelector(".music-bar input").disabled = false;

    msgBox.innerText = "Unlock ho gaya 💖";
    setTimeout(() => {
      alert("NEXT PAGE AAYEGA (Quiz) — next step me");
    }, 500);
  } else {
    wrongCount++;
    msgBox.innerText = msgs[Math.floor(Math.random() * msgs.length)];

    if (wrongCount >= 5) {
      hintBox.innerText =
        "Hint – Yuvraj agar Rajkumar hoga,\n" +
        "to tum uski kya hogi…??? 💖";
    }
  }
}
