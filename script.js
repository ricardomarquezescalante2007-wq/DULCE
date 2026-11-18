const book = document.getElementById("book");
const pageFaces = Array.from(book.querySelectorAll(".page-face"));
const sheets = pageFaces.map((face, index) => {
  const sheet = document.createElement("div");
  sheet.className = "sheet";
  sheet.dataset.sheet = String(index);
  sheet.style.zIndex = String(pageFaces.length - index);
  sheet.appendChild(face);
  book.appendChild(sheet);
  return sheet;
});

const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const pageStatus = document.getElementById("page-status");
let currentPage = 0;
let touchStartX = null;
let suppressClickUntil = 0;

function playPageVideos() {
  sheets.forEach((sheet, index) => {
    sheet.querySelectorAll("video").forEach((video) => {
      if (index === currentPage) {
        video.play().catch((error) => {
          if (error.name === "NotAllowedError") video.controls = true;
          else console.error("No se pudo reproducir este recuerdo en video.", error);
        });
      } else {
        video.pause();
      }
    });
  });
}

function updateBook() {
  sheets.forEach((sheet, index) => {
    const isCurrent = index === currentPage;
    sheet.classList.toggle("is-flipped", index < currentPage);
    sheet.style.zIndex = String(index < currentPage ? index + 1 : sheets.length - index);
    sheet.setAttribute("aria-hidden", String(!isCurrent));
  });
  prevButton.disabled = currentPage === 0;
  nextButton.disabled = currentPage === sheets.length - 1;
  pageStatus.textContent = currentPage === 0
    ? `Portada · 1 / ${sheets.length}`
    : `Recuerdo ${currentPage + 1} · ${currentPage + 1} / ${sheets.length}`;
  playPageVideos();
}

function nextPage() {
  if (currentPage < sheets.length - 1) {
    currentPage += 1;
    updateBook();
  }
}

function previousPage() {
  if (currentPage > 0) {
    currentPage -= 1;
    updateBook();
  }
}

prevButton.addEventListener("click", previousPage);
nextButton.addEventListener("click", nextPage);
book.addEventListener("click", (event) => {
  if (Date.now() < suppressClickUntil || event.target.closest("a, button, video")) return;
  const bounds = book.getBoundingClientRect();
  if (event.clientX - bounds.left < bounds.width * .35) previousPage();
  else nextPage();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") nextPage();
  if (event.key === "ArrowLeft") previousPage();
  if (event.key === "Escape") closeMusicPanel();
});
book.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].clientX;
}, { passive: true });
book.addEventListener("touchend", (event) => {
  if (touchStartX === null) return;
  const distance = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(distance) > 45) {
    suppressClickUntil = Date.now() + 500;
    distance < 0 ? nextPage() : previousPage();
  }
  touchStartX = null;
}, { passive: true });

document.querySelectorAll(".photo-window img, .cover-photo img").forEach((image) => {
  const markLoaded = () => image.parentElement.classList.add("has-photo");
  const removeBrokenImage = () => image.remove();
  image.addEventListener("load", markLoaded);
  image.addEventListener("error", removeBrokenImage);
  if (image.complete) {
    if (image.naturalWidth > 0) markLoaded();
    else removeBrokenImage();
  }
});

document.querySelectorAll(".video-grid").forEach((grid) => {
  if (grid.querySelectorAll("video").length === 3) grid.classList.add("has-three");
});
document.querySelectorAll(".video-frame video").forEach((video) => {
  const markLoaded = () => video.parentElement.classList.add("has-video");
  const removeBrokenVideo = () => video.remove();
  video.addEventListener("loadeddata", markLoaded);
  video.addEventListener("error", removeBrokenVideo);
  if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) markLoaded();
  else if (video.error) removeBrokenVideo();
});

const musicToggle = document.getElementById("music-toggle");
const musicPanel = document.getElementById("music-panel");

function closeMusicPanel() {
  musicPanel.classList.remove("is-open");
  musicToggle.setAttribute("aria-expanded", "false");
}

musicToggle.addEventListener("click", () => {
  const isOpen = musicPanel.classList.toggle("is-open");
  musicToggle.setAttribute("aria-expanded", String(isOpen));
});
document.addEventListener("click", (event) => {
  if (!musicPanel.contains(event.target) && !musicToggle.contains(event.target)) closeMusicPanel();
});

const sky = document.getElementById("sky");
for (let index = 0; index < 95; index += 1) {
  const star = document.createElement("span");
  star.className = "star";
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.setProperty("--size", `${1 + Math.random() * 2.2}px`);
  star.style.setProperty("--duration", `${1.5 + Math.random() * 3}s`);
  star.style.setProperty("--delay", `${Math.random() * 4}s`);
  sky.appendChild(star);
}

const candyCloud = document.getElementById("candy-cloud");
const treats = ["🍬", "🍭", "🍫", "🧁", "🍬", "🍡", "❤️", "💕", "🌟", "✨", "⭐", "💫"];
for (let index = 0; index < 13; index += 1) {
  const candy = document.createElement("span");
  candy.className = "candy";
  candy.textContent = treats[index % treats.length];
  candy.style.setProperty("--left", `${Math.random() * 100}%`);
  candy.style.setProperty("--size", `${18 + Math.random() * 17}px`);
  candy.style.setProperty("--duration", `${17 + Math.random() * 16}s`);
  candy.style.setProperty("--delay", `${-Math.random() * 28}s`);
  candy.style.setProperty("--drift", `${-55 + Math.random() * 110}px`);
  candyCloud.appendChild(candy);
}

updateBook();
