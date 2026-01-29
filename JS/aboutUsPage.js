/**
 * EcoMart Contact Form Validation
 * Simple validation using alerts
 */

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".contact-form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get input values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const message = document.getElementById("message").value.trim();

        // Email pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Phone pattern
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

        // Validate phone (optional - only check if filled)
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

        // All valid - show success
        alert("Message sent successfully!");
        form.reset();
    });
});