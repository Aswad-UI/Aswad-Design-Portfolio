/* ============================================================
   ASWAD PORTFOLIO — script.js
   GSAP | Scroll Reveal | Navbar | Cursor | Counter | Slider

   ── HOW TO ENABLE CONTACT FORM EMAILS ──────────────────────
   1. Go to https://web3forms.com
   2. Enter your email: aswad.uiux@gmail.com
   3. Click "Get Access Key" — you'll get a FREE key by email
   4. Replace "YOUR_WEB3FORMS_ACCESS_KEY_HERE" below with it
   5. That's it! Every form submission will email you.
   ──────────────────────────────────────────────────────────── */

(function () {
  "use strict";

  const WEB3FORMS_KEY = "a80d3a6a-d3a5-461b-8489-e762684934af";

  /* ──────────────────────────────────────────────────────────
     1. LOADER
  ────────────────────────────────────────────────────────── */
  const loader = document.getElementById("loader");
  const loaderBar = document.getElementById("loaderBar");
  const loaderPct = document.getElementById("loaderPct");

  let progress = 0;
  const loaderInterval = setInterval(() => {
    progress += Math.random() * 18;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loaderInterval);
      loaderBar.style.width = "100%";
      loaderPct.textContent = "100%";
      setTimeout(() => {
        loader.classList.add("hidden-loader");
        document.body.style.overflow = "";
        initAll();
      }, 400);
    } else {
      loaderBar.style.width = progress + "%";
      loaderPct.textContent = Math.floor(progress) + "%";
    }
  }, 60);

  document.body.style.overflow = "hidden";

  /* ──────────────────────────────────────────────────────────
     2. CUSTOM CURSOR
  ────────────────────────────────────────────────────────── */
  function initCursor() {
    const glow = document.getElementById("cursorGlow");
    const dot = document.getElementById("cursorDot");

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";
    });

    function animateGlow() {
      glowX += (mouseX - glowX) * 0.06;
      glowY += (mouseY - glowY) * 0.06;
      glow.style.left = glowX + "px";
      glow.style.top = glowY + "px";
      requestAnimationFrame(animateGlow);
    }
    animateGlow();

    // Grow dot on hover
    document.querySelectorAll("a, button, .project-card, .stat-card, .filter-btn").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        dot.style.width = "22px";
        dot.style.height = "22px";
        dot.style.opacity = "0.7";
      });
      el.addEventListener("mouseleave", () => {
        dot.style.width = "8px";
        dot.style.height = "8px";
        dot.style.opacity = "1";
      });
    });
  }

  /* ──────────────────────────────────────────────────────────
     3. STICKY NAVBAR
  ────────────────────────────────────────────────────────── */
  function initNavbar() {
    const navbar = document.getElementById("navbar");
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
      if (window.scrollY > 60) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }

      // Active link highlight
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute("id");
        }
      });
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
          link.classList.add("active");
        }
      });
    });
  }

  /* ──────────────────────────────────────────────────────────
     4. MOBILE MENU
  ────────────────────────────────────────────────────────── */
  function initMobileMenu() {
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const menuIcon = document.getElementById("menuIcon");
    const mobileLinks = document.querySelectorAll(".mobile-nav-link, #mobileMenu .btn-primary");

    menuBtn.addEventListener("click", () => {
      const isOpen = !mobileMenu.classList.contains("hidden");
      mobileMenu.classList.toggle("hidden");
      menuIcon.className = isOpen ? "ri-menu-3-line" : "ri-close-line";
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        menuIcon.className = "ri-menu-3-line";
      });
    });
  }

  /* ──────────────────────────────────────────────────────────
     5. SMOOTH SCROLL
  ────────────────────────────────────────────────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      });
    });
  }

  /* ──────────────────────────────────────────────────────────
     6. GSAP HERO ANIMATION
  ────────────────────────────────────────────────────────── */
  function initHeroAnimation() {
    if (typeof gsap === "undefined") return;
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    gsap.fromTo(
      ".hero-line",
      { y: "110%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 1.1,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.2,
      }
    );

    gsap.fromTo(".hero-badge", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.1 });
    gsap.fromTo(".hero-sub", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.7 });
    gsap.fromTo("#home .flex.flex-col", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.9 });
    gsap.fromTo(".scroll-indicator", { opacity: 0 }, { opacity: 1, duration: 1, delay: 1.5 });
  }

  /* ──────────────────────────────────────────────────────────
     7. SCROLL REVEAL
  ────────────────────────────────────────────────────────── */
  function initScrollReveal() {
    const revealEls = document.querySelectorAll(".reveal-up");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  /* ──────────────────────────────────────────────────────────
     8. COUNTER ANIMATION
  ────────────────────────────────────────────────────────── */
  function initCounters() {
    const counters = document.querySelectorAll(".stat-num[data-count]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.count);
            let start = 0;
            const duration = 1800;
            const startTime = performance.now();

            function update(now) {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              const value = Math.round(eased * target);
              el.textContent = value;
              if (progress < 1) requestAnimationFrame(update);
            }
            requestAnimationFrame(update);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((c) => observer.observe(c));
  }

  /* ──────────────────────────────────────────────────────────
     9. PROJECT FILTER
  ────────────────────────────────────────────────────────── */
  function initProjectFilter() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;

        projectCards.forEach((card, i) => {
          const category = card.dataset.category;
          const show = filter === "all" || category === filter;

          if (show) {
            card.classList.remove("hidden");
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, i * 60);
          } else {
            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";
            setTimeout(() => card.classList.add("hidden"), 350);
          }
        });
      });
    });
  }

  /* ──────────────────────────────────────────────────────────
     10. PROJECT MODAL
  ────────────────────────────────────────────────────────── */
  /* ============================================================
   ASWAD PORTFOLIO — UPDATED PROJECT MODAL JS
   Real Image Preview + Full Image Popup
============================================================ */

/* ──────────────────────────────────────────────────────────
   10. PROJECT MODAL
────────────────────────────────────────────────────────── */
function initModal() {

  const modal = document.getElementById("projectModal");
  const modalClose = document.getElementById("modalClose");

  const modalImgWrap = document.getElementById("modalImgWrap");
  const modalTag = document.getElementById("modalTag");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");

  if (!modal) return;

  /* ─── OPEN MODAL ───────────────────────────────────── */

  document.querySelectorAll(".project-open-btn").forEach((btn) => {

    btn.addEventListener("click", (e) => {

      e.stopPropagation();

      const card = btn.closest(".project-card");

      const title = card.dataset.title;
      const desc = card.dataset.desc;
      const tag = card.dataset.tag;
      const image = card.dataset.image;

      /* ─── SET CONTENT ─────────────────────────────── */

      modalTag.textContent = tag;
      modalTitle.textContent = title;
      modalDesc.textContent = desc;

      /* ─── FULL IMAGE PREVIEW ─────────────────────── */

      modalImgWrap.innerHTML = `
        <img src="${image}" alt="${title}">
      `;

      /* ─── OPEN ───────────────────────────────────── */

      modal.classList.remove("hidden");
      document.body.style.overflow = "hidden";

    });

  });

  /* ──────────────────────────────────────────────────
     CLOSE MODAL
  ────────────────────────────────────────────────── */

  function closeModal() {

    modal.classList.add("hidden");

    document.body.style.overflow = "";

  }

  /* ─── CLOSE BUTTON ─────────────────────────────── */

  modalClose.addEventListener("click", closeModal);

  /* ─── CLICK OUTSIDE ────────────────────────────── */

  modal.addEventListener("click", (e) => {

    if (e.target === modal) {

      closeModal();

    }

  });

  /* ─── ESC KEY ──────────────────────────────────── */

  document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

      closeModal();

    }

  });

}

  /* ──────────────────────────────────────────────────────────
     11. TESTIMONIALS SLIDER
  ────────────────────────────────────────────────────────── */
  function initTestimonials() {
    const track = document.getElementById("testimonialsTrack");
    const prevBtn = document.getElementById("testPrev");
    const nextBtn = document.getElementById("testNext");
    const dotsContainer = document.getElementById("testiDots");

    if (!track) return;

    const cards = track.querySelectorAll(".testi-card");
    const total = cards.length;
    const visibleCount = window.innerWidth >= 768 ? 2 : 1;
    const maxIndex = total - visibleCount;
    let currentIndex = 0;
    let autoplayTimer;

    const numDots = maxIndex + 1;
    for (let i = 0; i < numDots; i++) {
      const dot = document.createElement("div");
      dot.className = "testi-dot" + (i === 0 ? " active" : "");
      dot.addEventListener("click", () => goTo(i));
      dotsContainer.appendChild(dot);
    }

    function goTo(index) {
      currentIndex = Math.max(0, Math.min(index, maxIndex));
      const cardWidth = cards[0].offsetWidth + 24;
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      dotsContainer.querySelectorAll(".testi-dot").forEach((d, i) => {
        d.classList.toggle("active", i === currentIndex);
      });
    }

    function next() { goTo(currentIndex >= maxIndex ? 0 : currentIndex + 1); }
    function prev() { goTo(currentIndex <= 0 ? maxIndex : currentIndex - 1); }

    nextBtn.addEventListener("click", next);
    prevBtn.addEventListener("click", prev);

    function startAutoplay() { autoplayTimer = setInterval(next, 4500); }
    function stopAutoplay() { clearInterval(autoplayTimer); }

    track.addEventListener("mouseenter", stopAutoplay);
    track.addEventListener("mouseleave", startAutoplay);
    startAutoplay();

    let touchStartX = 0;
    track.addEventListener("touchstart", (e) => { touchStartX = e.touches[0].clientX; });
    track.addEventListener("touchend", (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    });
  }

  /* ──────────────────────────────────────────────────────────
     12. CONTACT FORM — sends email to aswad.uiux@gmail.com
         via Web3Forms (web3forms.com — free)
  ────────────────────────────────────────────────────────── */
  function initContactForm() {
    const form = document.getElementById("contactForm");
    const successEl = document.getElementById("formSuccess");
    const errorEl = document.getElementById("formError");

    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      const project = form.project ? form.project.value : "";
      const budget = form.budget ? form.budget.value : "";

      // Validate required fields
      if (!name || !email || !message) {
        shakeForm(form);
        return;
      }

      // Show sending state
      submitBtn.innerHTML = '<i class="ri-loader-4-line mr-2" style="animation:spin 1s linear infinite"></i> Sending...';
      submitBtn.disabled = true;
      successEl.classList.add("hidden");
      errorEl.classList.add("hidden");

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject: `New Project Inquiry from ${name} — Aswad Designs`,
            from_name: name,
            reply_to: email,
            name: name,
            email: email,
            project_type: project || "Not specified",
            budget: budget || "Not specified",
            message: message,
          }),
        });

        const data = await response.json();

        submitBtn.innerHTML = '<i class="ri-send-plane-fill mr-2"></i> Send Message';
        submitBtn.disabled = false;

        if (data.success) {
          form.reset();
          successEl.classList.remove("hidden");
          setTimeout(() => successEl.classList.add("hidden"), 6000);
        } else {
          errorEl.classList.remove("hidden");
          setTimeout(() => errorEl.classList.add("hidden"), 6000);
        }
      } catch (err) {
        submitBtn.innerHTML = '<i class="ri-send-plane-fill mr-2"></i> Send Message';
        submitBtn.disabled = false;
        errorEl.classList.remove("hidden");
        setTimeout(() => errorEl.classList.add("hidden"), 6000);
      }
    });
  }

  function shakeForm(form) {
    form.style.animation = "shake 0.4s ease";
    setTimeout(() => (form.style.animation = ""), 400);
  }

  /* ──────────────────────────────────────────────────────────
     13. PARALLAX ON HERO GLOWS
  ────────────────────────────────────────────────────────── */
  function initParallax() {
    const glow1 = document.querySelector(".hero-glow-1");
    const glow2 = document.querySelector(".hero-glow-2");

    window.addEventListener(
      "mousemove",
      throttle((e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;
        if (glow1) glow1.style.transform = `translate(${x}px, ${y}px)`;
        if (glow2) glow2.style.transform = `translate(${-x * 0.7}px, ${-y * 0.7}px)`;
      }, 16)
    );
  }

  /* ──────────────────────────────────────────────────────────
     UTILS
  ────────────────────────────────────────────────────────── */
  function throttle(fn, wait) {
    let last = 0;
    return function (...args) {
      const now = Date.now();
      if (now - last >= wait) { last = now; fn.apply(this, args); }
    };
  }

  /* ──────────────────────────────────────────────────────────
     INJECT DYNAMIC STYLES
  ────────────────────────────────────────────────────────── */
  function injectStyles() {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-8px); }
        40% { transform: translateX(8px); }
        60% { transform: translateX(-5px); }
        80% { transform: translateX(5px); }
      }
    `;
    document.head.appendChild(style);
  }

  /* ──────────────────────────────────────────────────────────
     INIT ALL — called after loader
  ────────────────────────────────────────────────────────── */
  function initAll() {
    injectStyles();
    initCursor();
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initHeroAnimation();
    initScrollReveal();
    initCounters();
    initProjectFilter();
    initModal();
    initTestimonials();
    initContactForm();
    initParallax();
  }

})();
