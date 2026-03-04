/* ============================
   NAVIGATION BAR FUNCTION
============================ */
function myMenuFunction() {
  let menuBtn = document.getElementById("myNavMenu");
  if (menuBtn.className === "nav-menu") {
    menuBtn.className += " responsive";
  } else {
    menuBtn.className = "nav-menu";
  }
}

// Hook menu toggle button if exists
const menuToggle = document.getElementById("menu-toggle");
if (menuToggle) menuToggle.onclick = myMenuFunction;

/* ============================
   ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING
============================ */
window.onscroll = function () { headerShadow(); };

function headerShadow() {
  const navHeader = document.getElementById("header");
  if (!navHeader) return; // safe check

  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
    navHeader.style.height = "70px";
    navHeader.style.lineHeight = "70px";
  } else {
    navHeader.style.boxShadow = "none";
    navHeader.style.height = "90px";
    navHeader.style.lineHeight = "90px";
  }
}

/* ============================
   TYPING EFFECT
============================ */
let typingEffect = new Typed(".typedText", {
  strings: ["Digital Specialist"],
  loop: true,
  typeSpeed: 100,
  backSpeed: 80,
  backDelay: 2000
});

/* ============================
   SCROLL REVEAL ANIMATIONS
============================ */
const sr = ScrollReveal({ origin: 'top', distance: '80px', duration: 2000, reset: true });
sr.reveal('.featured-text-card', {});
sr.reveal('.featured-name', { delay: 100 });
sr.reveal('.featured-text-info', { delay: 200 });
sr.reveal('.featured-text-btn', { delay: 200 });
sr.reveal('.social_icons', { delay: 200 });
sr.reveal('.featured-image', { delay: 300 });
sr.reveal('.project-box', { interval: 200 });
sr.reveal('.top-header', {});

const srLeft = ScrollReveal({ origin: 'left', distance: '80px', duration: 2000, reset: true });
srLeft.reveal('.about-info', { delay: 100 });
srLeft.reveal('.contact-info', { delay: 100 });

const srRight = ScrollReveal({ origin: 'right', distance: '80px', duration: 2000, reset: true });
srRight.reveal('.skills-box', { delay: 100 });
srRight.reveal('.form-control', { delay: 100 });

/* ============================
   CHANGE ACTIVE LINK ON SCROLL
============================ */
const sections = document.querySelectorAll('section[id]');
function scrollActive() {
  const scrollY = window.scrollY;
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute('id');

    const link = document.querySelector('.nav-menu a[href*=' + sectionId + ']');
    if (!link) return; // safe check

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      link.classList.add('active-link');
    } else {
      link.classList.remove('active-link');
    }
  });
}
window.addEventListener('scroll', scrollActive);

/* ============================
   DARK MODE
============================ */
let darkModeIcon = document.querySelector('#darkMode-icon');
if (darkModeIcon) {
  darkModeIcon.onclick = () => {
    darkModeIcon.classList.toggle('bx-sun');
    document.body.classList.toggle('dark-mode');
  };
}

/* ============================
   FIREWORKS
============================ */
const triggerImage = document.getElementById("triggerImage");
if (triggerImage) {
  triggerImage.addEventListener("click", () => {
    launchFireworksShow();
  });
}

// Limit fireworks so it won’t overload
let fireworksCooldown = false;
function launchFireworksShow() {
  if (fireworksCooldown) return;
  fireworksCooldown = true;
  setTimeout(() => fireworksCooldown = false, 3000); // 3s cooldown

  const targetY = window.innerHeight / 2; // explode in the middle

  for (let i = 0; i < 20; i++) { // was 10, now 20 rockets
    const startX = Math.random() * window.innerWidth;
    launchRocket(startX, targetY, i);
  }
}

function launchRocket(startX, targetY, delayIndex) {
  const rocket = document.createElement("div");
  rocket.classList.add("rocket");

  const colors = ["#ff0040", "#ff8000", "#ffff00", "#00ff00", "#00ffff", "#0040ff", "#ff00ff"];
  rocket.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

  rocket.style.left = `${startX}px`;
  rocket.style.top = `${window.innerHeight}px`;
  rocket.style.width = "4px";
  rocket.style.height = "15px";
  rocket.style.position = "fixed";
  rocket.style.zIndex = "9999";

  document.body.appendChild(rocket);

  rocket.animate(
    [
      { transform: "translateY(0)", opacity: 1 },
      { transform: `translateY(-${window.innerHeight - targetY}px)`, opacity: 1 }
    ],
    { duration: 1000, easing: "ease-out", delay: delayIndex * 80 }
  ).onfinish = () => {
    rocket.remove();
    setTimeout(() => explodeFirework(startX, targetY), 500);
  };
}

function explodeFirework(x, y) {
  const particles = 60; // was 40, now 60 particles
  const colors = ["#ff0040", "#ff8000", "#ffff00", "#00ff00", "#00ffff", "#0040ff", "#ff00ff"];

  for (let i = 0; i < particles; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const particle = document.createElement("div");
    particle.classList.add("firework");
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.backgroundColor = color;

    const size = Math.random() * 8 + 4;
    particle.style.width = `${size}px`;
    particle.style.height = `${size * 0.5}px`;
    particle.style.position = "fixed";
    particle.style.transform = `rotate(${Math.random() * 360}deg)`;
    particle.style.pointerEvents = "none";
    particle.style.boxShadow = `0 0 6px ${color}, 0 0 12px ${color}`;

    const angle = Math.random() * 2 * Math.PI;
    const distance = 80 + Math.random() * 120;
    const targetX = Math.cos(angle) * distance;
    const targetY = Math.sin(angle) * distance + (Math.random() * 50);

    particle.animate(
      [
        { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
        { transform: `translate(${targetX}px, ${targetY}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
      ],
      { duration: 2000 + Math.random() * 1000, easing: "ease-out" }
    ).onfinish = () => particle.remove();

    document.body.appendChild(particle);
  }
}

/* ============================
   MODAL (Project Info)
============================ */
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const modalImage = document.getElementById('modal-image');
  const closeBtn = document.querySelector('.close');
  const projectBoxes = document.querySelectorAll('.project-container .project-box');

  projectBoxes.forEach((box) => {
    box.addEventListener('click', () => {
      const title = box.dataset.title || box.querySelector("h3")?.innerText || "Project";
      const description = box.dataset.description || "No description available.";
      const image = box.dataset.image || "";

      modalTitle.textContent = title;
      modalDescription.textContent = description;

      if (image) {
        modalImage.src = image;
        modalImage.style.display = 'block';
      } else {
        modalImage.style.display = 'none';
      }

      modal.style.display = 'block';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.style.display = 'none');
  }

  window.addEventListener('click', (event) => {
    if (event.target === modal) modal.style.display = 'none';
  });
});

/* ============================
   HIRE BUTTON CONFETTI
============================ */
const hireButton = document.getElementById("hireButton");
if (hireButton) {
  let confettiCooldown = false;

  hireButton.addEventListener("click", function () {
    if (confettiCooldown) return;
    confettiCooldown = true;
    setTimeout(() => confettiCooldown = false, 2000); // 2s cooldown

    for (let i = 0; i < 50; i++) { // reduced from 80
      let confetti = document.createElement("div");
      confetti.classList.add("confetti");

      let size = Math.floor(Math.random() * 8) + 4;
      confetti.style.width = `${size}px`;
      confetti.style.height = `${size * 0.4}px`;

      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.top = "0";
      confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

      document.body.appendChild(confetti);

      let fallDuration = Math.random() * 3 + 2;
      confetti.style.animation = `fall ${fallDuration}s linear forwards`;

      setTimeout(() => confetti.remove(), fallDuration * 1000);
    }
  });
}

// Fireworks function (already in your code)
function fireworks() {
  for (let i = 0; i < 10; i++) {
    const rocket = document.createElement("div");
    rocket.className = "rocket";
    document.body.appendChild(rocket);

    rocket.style.left = Math.random() * window.innerWidth + "px";
    rocket.style.bottom = "0px";

    setTimeout(() => {
      const rect = rocket.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top;

      rocket.remove();

      for (let j = 0; j < 40; j++) {
        const particle = document.createElement("div");
        particle.className = "firework";
        document.body.appendChild(particle);

        particle.style.left = x + "px";
        particle.style.top = y + "px";

        const angle = Math.random() * 2 * Math.PI;
        const radius = Math.random() * 80;
        const dx = Math.cos(angle) * radius;
        const dy = Math.sin(angle) * radius;

        particle.style.transform = `translate(${dx}px, ${dy}px)`;

        setTimeout(() => particle.remove(), 1000);
      }
    }, 1000);
  }
}

function confetti() {
  for (let i = 0; i < 60; i++) {
    const particle = document.createElement("div");
    particle.className = "confetti";
    document.body.appendChild(particle);

    particle.style.left = Math.random() * window.innerWidth + "px";
    particle.style.top = "-10px";
    particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    particle.style.width = Math.random() * 8 + 2 + "px";
    particle.style.height = Math.random() * 8 + 2 + "px";
    particle.style.position = "fixed";

    const duration = Math.random() * 3 + 2;

    particle.animate(
      [
        { transform: "translateY(0)" },
        { transform: `translateY(${window.innerHeight + 20}px)` }
      ],
      {
        duration: duration * 1000,
        easing: "linear",
      }
    );

    setTimeout(() => particle.remove(), duration * 1000);
  }
}

// 🎉 Trigger confetti ONLY when "Hire Me" button is clicked
document.getElementById("hireButton").addEventListener("click", confetti);
