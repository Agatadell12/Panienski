const pages = document.querySelectorAll(".page");
const startBtn = document.getElementById("startBtn");
const answers = document.querySelectorAll(".answer");
const bgMusic = document.getElementById("bgMusic");
const summaryText = document.getElementById("summaryText");

let currentPage = 0;
let userAnswers = [];
let emailSent = false;

function showPage(index) {
  pages.forEach((page) => page.classList.remove("active"));
  pages[index].classList.add("active");
  currentPage = index;
}

startBtn.addEventListener("click", () => {
  bgMusic.play();
  showPage(1);
});

/* ---------- ZWYKŁE PRZYCISKI ---------- */

answers.forEach((button) => {
  button.addEventListener("click", (e) => {
    userAnswers.push(e.target.innerText);

    if (currentPage < pages.length - 2) {
      showPage(currentPage + 1);
    } else {
      finishQuiz();
    }
  });
});

/* ---------- FUNKCJA KOŃCZĄCA ---------- */

function finishQuiz() {
  showPage(pages.length - 1);

  const finalMessage = "Twoje wybory: " + userAnswers.join(" | ");
  summaryText.innerText = finalMessage;

  if (!emailSent) {
    sendEmail(finalMessage);
    downloadFile(finalMessage);
    emailSent = true;
  }
}

/* ---------- EMAIL ---------- */

function sendEmail(message) {
  emailjs
    .send("service_fwr2ws5", "template_pnpi1dj", {
      message: message,
    })
    .then(
      function (response) {
        console.log("MAIL WYSŁANY!", response.status, response.text);
      },
      function (error) {
        console.log("BŁĄD WYSYŁKI...", error);
      },
    );
}

/* ---------- ZAPIS DO PLIKU ---------- */

function downloadFile(content) {
  const element = document.createElement("a");
  const file = new Blob([content], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = "odpowiedzi_panienski.txt";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

/* ---------- MUZYKA ---------- */

const musicBtn = document.getElementById("musicBtn");
musicBtn.addEventListener("click", () => {
  bgMusic.play();
  musicBtn.innerText = "✨ Gra";
});

/* ---------- WŁASNE ODPOWIEDZI ---------- */

const customButtons = document.querySelectorAll(".customSubmit");

customButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const inputId = button.getAttribute("data-input");
    const input = document.getElementById(inputId);

    const value = input.value.trim();
    if (value === "") return;

    userAnswers.push(value);
    input.value = "";

    if (currentPage < pages.length - 2) {
      showPage(currentPage + 1);
    } else {
      finishQuiz();
    }
  });
});

/* ---------- BROKAT ---------- */

function createGlitter() {
  const glitter = document.createElement("div");

  glitter.style.position = "fixed";
  glitter.style.left = Math.random() * window.innerWidth + "px";
  glitter.style.top = "-10px";
  glitter.style.width = "5px";
  glitter.style.height = "5px";
  glitter.style.borderRadius = "50%";
  glitter.style.pointerEvents = "none";
  glitter.style.zIndex = "0";

  const colors = [
    "radial-gradient(circle, #fff8dc, #d4af37)",
    "radial-gradient(circle, #ffffff, #f0e6d2)",
    "radial-gradient(circle, #f7e7ce, #e6c87c)",
  ];

  glitter.style.background = colors[Math.floor(Math.random() * colors.length)];

  document.body.appendChild(glitter);

  let pos = -10;
  const speed = Math.random() * 3 + 2;

  const fall = setInterval(() => {
    pos += speed;
    glitter.style.top = pos + "px";

    if (pos > window.innerHeight) {
      clearInterval(fall);
      glitter.remove();
    }
  }, 16);
}

setInterval(createGlitter, 200);
