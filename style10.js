/* ==============================
   PHAM DINH KHUONG - PORTFOLIO
   Menu, dark mode and scroll reveal
   ============================== */

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = themeToggle?.querySelector(".theme-icon");
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const navItems = document.querySelectorAll(".nav-link");
  const yearElement = document.getElementById("current-year");

  // Current year in footer
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Restore saved theme preference
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
  }
  updateThemeButton();

  function updateThemeButton() {
    if (!themeIcon || !themeToggle) return;
    const isDark = body.classList.contains("dark-mode");
    themeIcon.textContent = isDark ? "☀" : "☾";
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"
    );
    themeToggle.setAttribute(
      "title",
      isDark ? "Chế độ sáng" : "Chế độ tối"
    );
  }

  // Dark mode toggle
  themeToggle?.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const theme = body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("portfolio-theme", theme);
    updateThemeButton();
  });

  // Mobile navigation
  menuToggle?.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Đóng menu" : "Mở menu");
  });

  // Close mobile menu after selecting a section
  navItems.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks?.classList.remove("is-open");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });

  // Highlight the navigation item for the visible section
  const sections = document.querySelectorAll("main section[id]");
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navItems.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`
            );
          });
        }
      });
    }, { rootMargin: "-35% 0px -55% 0px" });

    sections.forEach((section) => sectionObserver.observe(section));
  }

  // Scroll reveal animation with Intersection Observer
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    });

    revealElements.forEach((element) => revealObserver.observe(element));
    // Enable the hidden/reveal state only after the observer is ready.
    // If this script fails to load, the CSS keeps all content visible.
    body.classList.add("reveal-enabled");
  } else {
    // Fallback for older browsers
    revealElements.forEach((element) => element.classList.add("is-visible"));
  }
});
