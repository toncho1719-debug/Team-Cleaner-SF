// Init EmailJS
(function () {
  emailjs.init("DC2LTEnTIrMIaAHAz");
})();

const form = document.getElementById("booking-form");
const status = document.querySelector(".form-status");

const spinner = document.createElement("div");
spinner.className = "spinner";

form.addEventListener("submit", function (event) {
  event.preventDefault();
  status.innerHTML = "";
  status.appendChild(spinner);

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    service: document.getElementById("service").value,
    message: document.getElementById("message").value,
  };

  emailjs
    .send("service_np4kbm4", "template_spt5igj", formData)
    .then(() => {
      spinner.remove();
      status.textContent = "✅ Request sent successfully!";
      status.style.color = "green";
      form.reset();
      triggerConfetti();
    })
    .catch((err) => {
      spinner.remove();
      console.error("EmailJS error:", err);
      status.textContent = "❌ Something went wrong. Try again.";
      status.style.color = "red";
      form.classList.add("shake");
      setTimeout(() => form.classList.remove("shake"), 500);
    });
});

// Confetti 🎉
function triggerConfetti() {
  const confettiCount = 120;
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetti.style.animationDuration = Math.random() * 3 + 2 + "s";
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 5000);
  }
}

// Scroll progress bar
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  document.getElementById("progress-bar").style.width = progress + "%";
});

// Floating CTA scroll behavior
const floatingCta = document.getElementById("floating-cta");
floatingCta.addEventListener("click", () => {
  document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
});
window.addEventListener("scroll", () => {
  const bookingSection = document.getElementById("booking");
  const rect = bookingSection.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom >= 0) {
    floatingCta.classList.add("hidden");
  } else {
    floatingCta.classList.remove("hidden");
  }
});

// Scroll reveal
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.15 });
reveals.forEach(reveal => observer.observe(reveal));
// Parallax effect for hero
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero.parallax");
  let scrollPosition = window.pageYOffset;
  if (hero) {
    hero.style.backgroundPositionY = scrollPosition * 0.4 + "px";
  }
});

// Parallax tilt effect for service images
document.querySelectorAll(".service-card.parallax-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * 15; 
    const rotateY = ((x / rect.width) - 0.5) * -15;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });
});


// Ripple effect for buttons
document.querySelectorAll(".ripple").forEach(btn => {
  btn.addEventListener("click", function (e) {
    let ripple = this.querySelector("::after");
    this.style.setProperty("--ripple-x", e.offsetX + "px");
    this.style.setProperty("--ripple-y", e.offsetY + "px");
  });
});

// Footer year auto-update
document.getElementById("year").textContent = new Date().getFullYear();
