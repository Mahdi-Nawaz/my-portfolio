// ==========================================================================
// MAHDI NAWAZ — INTERACTIVE PORTFOLIO SCRIPT
// Features: Theme Switcher, Mobile Nav, Project Filtering, Lightbox, Copy Email
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {

  // 1. MOBILE NAVIGATION MENU
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 2. THEME SWITCHER (Dark & Light Mode with Icon + Persistence)
  const root = document.documentElement;
  const themeBtn = document.getElementById("themeBtn");
  const themeIcon = document.getElementById("themeIcon");
  const themeText = document.getElementById("themeText");

  function updateThemeUI(theme) {
    root.setAttribute("data-theme", theme);
    if (theme === "light") {
      if (themeIcon) themeIcon.textContent = "☀️";
      if (themeText) themeText.textContent = "Light";
    } else {
      if (themeIcon) themeIcon.textContent = "🌙";
      if (themeText) themeText.textContent = "Dark";
    }
  }

  // Check saved preference or default to dark
  try {
    const savedTheme = localStorage.getItem("portfolio_theme");
    if (savedTheme) {
      updateThemeUI(savedTheme);
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
      // If user system explicitly prefers light, use light
      updateThemeUI("light");
    } else {
      updateThemeUI("dark");
    }
  } catch (e) {
    updateThemeUI("dark");
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
      const next = current === "light" ? "dark" : "light";
      updateThemeUI(next);
      try {
        localStorage.setItem("portfolio_theme", next);
      } catch (e) {
        /* storage restricted */
      }
    });
  }

  // 3. PROJECT FILTERING (All, AI/ML, Data Analytics)
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const categories = card.getAttribute("data-category") || "";
        if (filterValue === "all" || categories.includes(filterValue)) {
          card.style.display = "block";
          setTimeout(() => {
            card.classList.add("in");
          }, 50);
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // 4. INTERSECTION OBSERVER SCROLL REVEAL
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    });

    reveals.forEach((el) => revealObserver.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  // 5. ACTIVE NAV HIGHLIGHTING (Scrollspy)
  const sections = document.querySelectorAll("section[id]");
  const navAnchorLinks = document.querySelectorAll(".links a[href^='#']");

  window.addEventListener("scroll", () => {
    let currentSectionId = "";
    const scrollPos = window.scrollY + 120;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = sec.getAttribute("id");
      }
    });

    navAnchorLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  }, { passive: true });

  // 6. COPY EMAIL WITH TOAST NOTIFICATION
  const btnCopyEmail = document.getElementById("btnCopyEmail");
  const toast = document.getElementById("toastNotification");
  const toastText = document.getElementById("toastText");
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    if (toastText) toastText.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2800);
  }

  if (btnCopyEmail) {
    btnCopyEmail.addEventListener("click", () => {
      const email = "mahdienawaz@gmail.com";
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email)
          .then(() => showToast("Email copied to clipboard!"))
          .catch(() => fallbackCopy(email));
      } else {
        fallbackCopy(email);
      }
    });
  }

  function fallbackCopy(text) {
    const tempInput = document.createElement("input");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand("copy");
      showToast("Email copied to clipboard!");
    } catch (err) {
      showToast("mahdienawaz@gmail.com");
    }
    document.body.removeChild(tempInput);
  }

  // 7. LIGHTBOX MODAL FOR CHARTS
  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxBackdrop = document.getElementById("lightboxBackdrop");

  window.openLightbox = function(src, caption) {
    if (!lightboxModal || !lightboxImg) return;
    lightboxImg.src = src;
    if (lightboxCaption) lightboxCaption.textContent = caption || "";
    lightboxModal.classList.add("active");
    lightboxModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove("active");
    lightboxModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lightboxImg) lightboxImg.src = "";
  }

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightboxModal && lightboxModal.classList.contains("active")) {
      closeLightbox();
    }
  });

  // 8. DYNAMIC COPYRIGHT YEAR
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
