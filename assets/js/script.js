// Accessibility: set current year, manage theme, and nav toggle
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Persisted theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
    const toggleBtn = document.getElementById("themeToggle");
    if (toggleBtn) toggleBtn.setAttribute("aria-pressed", savedTheme === "light");
  }

  const themeToggle = document.getElementById("themeToggle");
  themeToggle?.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "light" ? "" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    themeToggle.setAttribute("aria-pressed", next === "light");
  });

  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  navToggle?.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Simple form validation (no backend)
  const form = document.querySelector(".contact-form");
  const statusEl = document.getElementById("formStatus");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    const errorName = document.getElementById("error-name");
    const errorEmail = document.getElementById("error-email");
    const errorMessage = document.getElementById("error-message");

    let valid = true;

    // Name validation
    if (!name.value.trim()) {
      errorName.textContent = "Please enter your name.";
      name.setAttribute("aria-invalid", "true");
      valid = false;
    } else {
      errorName.textContent = "";
      name.removeAttribute("aria-invalid");
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      errorEmail.textContent = "Please enter a valid email address.";
      email.setAttribute("aria-invalid", "true");
      valid = false;
    } else {
      errorEmail.textContent = "";
      email.removeAttribute("aria-invalid");
    }

    // Message validation
    if (message.value.trim().length < 10) {
      errorMessage.textContent = "Message should be at least 10 characters.";
      message.setAttribute("aria-invalid", "true");
      valid = false;
    } else {
      errorMessage.textContent = "";
      message.removeAttribute("aria-invalid");
    }

    if (!valid) {
      statusEl.textContent = "Please fix the errors above.";
      statusEl.style.color = "var(--danger)";
      return;
    }

    // Simulate success
    statusEl.textContent = "Thanks! Your message has been recorded.";
    statusEl.style.color = "var(--accent)";
    form.reset();
  });
});
