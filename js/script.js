document.addEventListener("DOMContentLoaded", () => {
  /* ==================================
       THEME TOGGLE
       ================================== */
  const themeToggleBtn = document.getElementById("theme-toggle");
  const htmlElement = document.documentElement;
  const themeIcon = themeToggleBtn.querySelector("i");

  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "light" || (!savedTheme && !prefersDark)) {
    htmlElement.setAttribute("data-theme", "light");
    themeIcon.className = "fa-solid fa-moon";
  } else {
    htmlElement.setAttribute("data-theme", "dark");
    themeIcon.className = "fa-solid fa-sun";
  }

  // Toggle theme on click
  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = htmlElement.getAttribute("data-theme");
    if (currentTheme === "dark") {
      htmlElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
      themeIcon.className = "fa-solid fa-moon";
    } else {
      htmlElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      themeIcon.className = "fa-solid fa-sun";
    }
  });

  /* ==================================
       MOBILE NAVIGATION
       ================================== */
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-link");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Close mobile menu on link click
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  /* ==================================
       SCROLL EFFECTS AND ACTIVE LINKS
       ================================== */
  const navbar = document.querySelector(".navbar");
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", () => {
    // Navbar shadow on scroll
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Active link switching
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((li) => {
      li.classList.remove("active");
      if (li.getAttribute("href").includes(current)) {
        li.classList.add("active");
      }
    });
  });

  /* ==================================
       INTERSECTION OBSERVER FOR ANIMATIONS
       ================================== */
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add appear class to trigger animation
        entry.target.classList.add("appear");

        // If it's a progress bar, trigger the width animation
        const progressBars = entry.target.querySelectorAll(".progress");
        if (progressBars.length > 0) {
          entry.target.classList.add("appear"); // Just in case, the CSS handles `.appear .progress`
        }

        entry.target.classList.remove("fade-in-up");

        // Unobserve after animating
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animatable elements
  const elementsToAnimate = document.querySelectorAll(
    ".fade-in, .fade-in-up, .fade-in-right, .fade-in-left, .languages-box",
  );
  elementsToAnimate.forEach((el) => {
    observer.observe(el);
  });

  /* ==================================
       TYPING EFFECT
       ================================== */
  const greetingEl = document.querySelector(".greeting");
  const titleEl = document.querySelector(".hero-title");
  const roleEl = document.querySelector(".hero-role");

  if (greetingEl && titleEl && roleEl) {
    const greetingText = greetingEl.textContent.trim();
    const titleText = titleEl.textContent.trim();
    const roleText = roleEl.textContent.trim();

    // Use zero-width space to maintain container height before typing
    greetingEl.textContent = "\u200B";
    titleEl.textContent = "\u200B";
    roleEl.textContent = "\u200B";

    const typeWriter = (text, element, speed = 50, isDeleting = false) => {
      return new Promise((resolve) => {
        let i = isDeleting ? text.length : 0;

        const type = () => {
          if (!isDeleting && i === 0) element.textContent = "";

          if (!isDeleting && i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
          } else if (isDeleting && i > 0) {
            element.textContent = text.substring(0, i - 1) || "\u200B";
            i--;
            setTimeout(type, speed / 2); // Deleting is twice as fast
          } else {
            resolve();
          }
        };
        type();
      });
    };

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    const startTypingLoop = async () => {
      while (true) {
        // Type greeting
        greetingEl.classList.add("typing-cursor");
        await typeWriter(greetingText, greetingEl, 70);
        greetingEl.classList.remove("typing-cursor");

        // Type title
        titleEl.classList.add("typing-cursor");
        await typeWriter(titleText, titleEl, 100);
        titleEl.classList.remove("typing-cursor");

        // Type role
        roleEl.classList.add("typing-cursor");
        await typeWriter(roleText, roleEl, 70);

        // Wait before erasing
        await sleep(3000);

        // Erase role
        await typeWriter(roleText, roleEl, 70, true);
        roleEl.classList.remove("typing-cursor");

        // Erase title
        titleEl.classList.add("typing-cursor");
        await typeWriter(titleText, titleEl, 100, true);
        titleEl.classList.remove("typing-cursor");

        // Erase greeting
        greetingEl.classList.add("typing-cursor");
        await typeWriter(greetingText, greetingEl, 70, true);
        greetingEl.classList.remove("typing-cursor");

        // Wait before re-typing
        await sleep(1000);
      }
    };

    // Start typing after fade-in animation starts
    setTimeout(() => {
      startTypingLoop();
    }, 600);
  }

  /* ==================================
       CURRENT YEAR IN FOOTER
       ================================== */
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

const allTags = document.querySelectorAll(".tag i");

allTags.forEach((tag) => {
  console.log("CALLED");
  tag.classList.add("fa-beat");
  tag.classList.add("fa-2xl");
});

/* ==================================
   PROJECT MODAL
   ================================== */
const modal = document.getElementById("project-modal");
const modalSlider = document.getElementById("modal-slider");
const modalPlaceholder = document.getElementById("modal-placeholder");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalTech = document.getElementById("modal-tech");
const modalLinks = document.getElementById("modal-links");
const modalPrev = document.getElementById("modal-prev");
const modalNext = document.getElementById("modal-next");
const modalDots = document.getElementById("modal-dots");
const closeModalBtn = document.querySelector(".close-modal");
const projectCards = document.querySelectorAll(".project-card");

let currentSlide = 0;
let totalSlides = 0;

if (modal && projectCards.length > 0) {
  const updateSlider = () => {
    if (totalSlides === 0) return;
    modalSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
    // Update dots
    const dots = modalDots.querySelectorAll(".slider-dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  };

  modalPrev.addEventListener("click", () => {
    if (totalSlides > 1) {
      currentSlide = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
      updateSlider();
    }
  });

  modalNext.addEventListener("click", () => {
    if (totalSlides > 1) {
      currentSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
      updateSlider();
    }
  });

  // Swipe logic
  let touchStartX = 0;
  let touchEndX = 0;

  modalSlider.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  modalSlider.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  const handleSwipe = () => {
    if (totalSlides <= 1) return;
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swiped left, next image
      currentSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
      updateSlider();
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      // Swiped right, prev image
      currentSlide = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
      updateSlider();
    }
  };

  // Open modal when clicking on a project card
  projectCards.forEach((card) => {
    // Make cards feel clickable
    card.style.cursor = "pointer";

    card.addEventListener("click", (e) => {
      // Don't open modal if they clicked a specific link directly (like github)
      if (e.target.closest("a")) {
        return;
      }

      // Get data from the card
      const title = card.querySelector(".project-info h3").textContent;
      const desc = card.querySelector(".project-info p").innerHTML;
      modalTitle.textContent = title;
      modalDesc.innerHTML = desc;

      const imgElements = card.querySelectorAll(".project-img img");
      modalSlider.innerHTML = "";
      modalDots.innerHTML = "";
      currentSlide = 0;
      totalSlides = imgElements.length;

      if (totalSlides > 0) {
        modalPlaceholder.style.display = "none";
        modalSlider.style.display = "flex";

        imgElements.forEach((img, index) => {
          const slideImg = document.createElement("img");
          slideImg.src = img.src;
          modalSlider.appendChild(slideImg);

          if (totalSlides > 1) {
            const dot = document.createElement("div");
            dot.className = "slider-dot" + (index === 0 ? " active" : "");
            dot.addEventListener("click", () => {
              currentSlide = index;
              updateSlider();
            });
            modalDots.appendChild(dot);
          }
        });

        if (totalSlides > 1) {
          modalPrev.classList.remove("hidden");
          modalNext.classList.remove("hidden");
          modalDots.classList.remove("hidden");
        } else {
          modalPrev.classList.add("hidden");
          modalNext.classList.add("hidden");
          modalDots.classList.add("hidden");
        }
        updateSlider();
      } else {
        modalSlider.style.display = "none";
        modalPlaceholder.style.display = "flex";
        modalPrev.classList.add("hidden");
        modalNext.classList.add("hidden");
        modalDots.classList.add("hidden");
      }

      // Get tech stack
      const techSpans = card.querySelectorAll(".project-tech span");
      modalTech.innerHTML = "";
      techSpans.forEach((span) => {
        const newSpan = document.createElement("span");
        newSpan.textContent = span.textContent;
        modalTech.appendChild(newSpan);
      });

      // Get links
      const links = card.querySelectorAll(".project-links a");
      modalLinks.innerHTML = "";
      links.forEach((link) => {
        const newLink = link.cloneNode(true);
        // Style them like buttons inside the modal
        newLink.className = "btn btn-primary";
        newLink.style.display = "inline-flex";
        newLink.style.gap = "8px";

        // Add text based on icon
        if (newLink.querySelector(".fa-github")) {
          newLink.innerHTML += " Source Code";
          newLink.classList.remove("btn-primary");
          newLink.classList.add("btn-secondary");
        } else if (newLink.querySelector(".fa-external-link-alt")) {
          newLink.innerHTML += " Live Preview";
        }

        modalLinks.appendChild(newLink);
      });

      // Show modal
      modal.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent scrolling
    });
  });

  // Close modal functions
  const closeModal = () => {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  };

  closeModalBtn.addEventListener("click", closeModal);

  // Close on outside click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const heroImageWrapper = document.querySelector(".hero-image-wrapper");
  if (heroImageWrapper) {
    heroImageWrapper.classList.add("appear");
  }
});
