// ===== MODE TERANG DAN GELAP =====
const themeToggle = document.getElementById("themeToggle");

function applyTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");

  if (themeToggle) {
    themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
    themeToggle.title = theme === "dark"
      ? "Ganti ke mode terang"
      : "Ganti ke mode gelap";
    themeToggle.setAttribute(
      "aria-label",
      theme === "dark" ? "Ganti ke mode terang" : "Ganti ke mode gelap"
    );
  }
}

let savedTheme = "light";

try {
  savedTheme = localStorage.getItem("portfolio-theme") || "light";
} catch (error) {
  savedTheme = "light";
}

applyTheme(savedTheme);

themeToggle?.addEventListener("click", () => {
  const nextTheme = document.body.classList.contains("dark")
    ? "light"
    : "dark";

  applyTheme(nextTheme);

  try {
    localStorage.setItem("portfolio-theme", nextTheme);
  } catch (error) {
    // Tema tetap berubah meskipun penyimpanan tidak tersedia.
  }
});


// ===== MENU NAVIGASI HP =====
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

function closeMenu() {
  navLinks?.classList.remove("open");

  if (menuToggle) {
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka menu");
  }
}

menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks?.classList.toggle("open") ?? false;

  menuToggle.textContent = isOpen ? "✕" : "☰";
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");
});

navLinks?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("click", event => {
  if (
    navLinks?.classList.contains("open") &&
    !navLinks.contains(event.target) &&
    !menuToggle?.contains(event.target)
  ) {
    closeMenu();
  }
});


// ===== ANIMASI SAAT SCROLL =====
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach(element => {
    element.classList.add("show");
  });
}


// ===== NAVIGASI AKTIF SESUAI SECTION =====
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(link => {
          const isActive =
            link.getAttribute("href") === `#${entry.target.id}`;

          link.classList.toggle("active", isActive);
        });
      }
    });
  }, {
    rootMargin: "-30% 0px -55% 0px"
  });

  sections.forEach(section => sectionObserver.observe(section));
}


// ===== TAHUN OTOMATIS =====
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// ===== SALIN EMAIL =====
const myEmail = "azrilrplkanesa@gmail.com";
const copyEmailButton = document.getElementById("copyEmail");
const copyMessage = document.getElementById("copyMessage");

copyEmailButton?.addEventListener("click", async () => {
  copyEmailButton.disabled = true;

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(myEmail);
    } else {
      const temporaryInput = document.createElement("textarea");

      temporaryInput.value = myEmail;
      temporaryInput.setAttribute("readonly", "");
      temporaryInput.style.position = "fixed";
      temporaryInput.style.opacity = "0";

      document.body.appendChild(temporaryInput);
      temporaryInput.select();

      const success = document.execCommand("copy");
      temporaryInput.remove();

      if (!success) {
        throw new Error("Salin email gagal");
      }
    }

    if (copyMessage) {
      copyMessage.textContent = "Email berhasil disalin! ✓";
    }
  } catch (error) {
    if (copyMessage) {
      copyMessage.textContent = "Silakan salin email ini: " + myEmail;
    }
  } finally {
    copyEmailButton.disabled = false;
  }
});