/**
 * EcoMart Contact Form Validation
 * Simple validation using alerts
 */

// Wait for DOM so the form exists before wiring handlers.
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".contact-form");

  form.addEventListener("submit", function (e) {
    // Keep the page from reloading so we can validate first.
    e.preventDefault();

    // Get input values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    // Email pattern: basic user@domain.tld check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Phone pattern: allows optional country code and separators
    const phonePattern =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

    // Validate name
    if (name === "") {
      alert("Please enter your name.");
      return;
    }

    if (name.length < 2) {
      alert("Name must be at least 2 characters.");
      return;
    }

    // Validate email
    if (email === "") {
      alert("Please enter your email.");
      return;
    }

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Validate phone only when the field is filled
    if (phone !== "" && !phonePattern.test(phone)) {
      alert("Please enter a valid phone number.");
      return;
    }

    // Validate message
    if (message === "") {
      alert("Please enter your message.");
      return;
    }

    if (message.length < 10) {
      alert("Message must be at least 10 characters.");
      return;
    }

    // All valid - show success and clear the form
    alert("Message sent successfully!");
    form.reset();
  });
});
