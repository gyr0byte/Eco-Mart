/**
 * LOGIN PAGE FORM VALIDATION
 * EcoMart - Sustainable Shopping Platform
 * 
 * Handles validation for both Sign In and Sign Up forms
 */

document.addEventListener("DOMContentLoaded", function () {
  // ============================================
  // ELEMENT REFERENCES
  // ============================================
  const loginContainer = document.getElementById("loginContainer");
  const toSignupBtn = document.getElementById("toSignupBtn");
  const toSigninBtn = document.getElementById("toSigninBtn");

  const signinForm = document.getElementById("signinForm");
  const signupForm = document.getElementById("signupForm");
  const heyThere = document.getElementById("heyThere");
  const welcomeBack = document.getElementById("welcomeBack");

  // Form elements
  const loginFormElement = document.querySelector(".login-form");
  const signupFormElement = document.querySelector(".signup-form");

  // ============================================
  // VALIDATION HELPER FUNCTIONS
  // ============================================

  /**
   * Display error message for a form field
   */
  function showError(input, message) {
    const formGroup = input.closest(".form-group");
    
    // Remove any existing error
    removeError(input);
    
    // Add error class to input
    input.classList.add("input-error");
    
    // Create and add error message
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = message;
    formGroup.appendChild(errorDiv);
  }

  /**
   * Remove error message from a form field
   */
  function removeError(input) {
    const formGroup = input.closest(".form-group");
    const errorMessage = formGroup.querySelector(".error-message");
    
    input.classList.remove("input-error");
    
    if (errorMessage) {
      errorMessage.remove();
    }
  }

  /**
   * Show success message
   */
  function showSuccess(input) {
    input.classList.remove("input-error");
    input.classList.add("input-success");
  }

  /**
   * Validate email format
   */
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate password strength
   * At least 8 characters, 1 uppercase, 1 lowercase, 1 number
   */
  function isValidPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  }

  /**
   * Validate full name (at least 2 words)
   */
  function isValidFullName(name) {
    const trimmedName = name.trim();
    const words = trimmedName.split(/\s+/);
    return words.length >= 2 && trimmedName.length >= 3;
  }

  // ============================================
  // SIGN IN FORM VALIDATION
  // ============================================
  if (loginFormElement) {
    loginFormElement.addEventListener("submit", function (e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('input[type="email"]');
      const passwordInput = this.querySelector('input[type="password"]');
      const rememberCheckbox = document.getElementById("remember");
      
      let isValid = true;

      // Validate Email
      if (!emailInput.value.trim()) {
        showError(emailInput, "Email address is required");
        isValid = false;
      } else if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, "Please enter a valid email address");
        isValid = false;
      } else {
        removeError(emailInput);
        showSuccess(emailInput);
      }

      // Validate Password
      if (!passwordInput.value) {
        showError(passwordInput, "Password is required");
        isValid = false;
      } else if (passwordInput.value.length < 6) {
        showError(passwordInput, "Password must be at least 6 characters");
        isValid = false;
      } else {
        removeError(passwordInput);
        showSuccess(passwordInput);
      }

      // Validate Checkbox (optional - based on your requirements)
      if (!rememberCheckbox.checked) {
        const checkboxGroup = rememberCheckbox.closest(".checkbox-group");
        if (!checkboxGroup.querySelector(".error-message")) {
          const errorDiv = document.createElement("div");
          errorDiv.className = "error-message";
          errorDiv.textContent = "Please acknowledge the form";
          checkboxGroup.appendChild(errorDiv);
          isValid = false;
        }
      } else {
        const checkboxGroup = rememberCheckbox.closest(".checkbox-group");
        const errorMessage = checkboxGroup.querySelector(".error-message");
        if (errorMessage) {
          errorMessage.remove();
        }
      }

      // If form is valid, submit
      if (isValid) {
        // Show success message
        alert("Sign in successful! Welcome back to EcoMart.");
        
        // Here you would normally submit to server
        // this.submit();
        
        // For demo, reset form
        this.reset();
        document.querySelectorAll(".input-success").forEach(input => {
          input.classList.remove("input-success");
        });
      }
    });

    // Real-time validation on input
    const loginEmailInput = loginFormElement.querySelector('input[type="email"]');
    const loginPasswordInput = loginFormElement.querySelector('input[type="password"]');

    loginEmailInput.addEventListener("blur", function () {
      if (this.value.trim() && !isValidEmail(this.value.trim())) {
        showError(this, "Please enter a valid email address");
      } else if (this.value.trim()) {
        removeError(this);
      }
    });

    loginPasswordInput.addEventListener("input", function () {
      if (this.value) {
        removeError(this);
      }
    });
  }

  // ============================================
  // SIGN UP FORM VALIDATION
  // ============================================
  if (signupFormElement) {
    signupFormElement.addEventListener("submit", function (e) {
      e.preventDefault();
      
      const inputs = this.querySelectorAll("input");
      const nameInput = inputs[0];
      const emailInput = inputs[1];
      const passwordInput = inputs[2];
      const confirmPasswordInput = inputs[3];
      
      let isValid = true;

      // Validate Full Name
      if (!nameInput.value.trim()) {
        showError(nameInput, "Full name is required");
        isValid = false;
      } else if (!isValidFullName(nameInput.value)) {
        showError(nameInput, "Please enter your full name (first and last name)");
        isValid = false;
      } else {
        removeError(nameInput);
        showSuccess(nameInput);
      }

      // Validate Email
      if (!emailInput.value.trim()) {
        showError(emailInput, "Email address is required");
        isValid = false;
      } else if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, "Please enter a valid email address");
        isValid = false;
      } else {
        removeError(emailInput);
        showSuccess(emailInput);
      }

      // Validate Password
      if (!passwordInput.value) {
        showError(passwordInput, "Password is required");
        isValid = false;
      } else if (!isValidPassword(passwordInput.value)) {
        showError(
          passwordInput,
          "Password must be at least 8 characters with uppercase, lowercase, and number"
        );
        isValid = false;
      } else {
        removeError(passwordInput);
        showSuccess(passwordInput);
      }

      // Validate Confirm Password
      if (!confirmPasswordInput.value) {
        showError(confirmPasswordInput, "Please confirm your password");
        isValid = false;
      } else if (confirmPasswordInput.value !== passwordInput.value) {
        showError(confirmPasswordInput, "Passwords do not match");
        isValid = false;
      } else {
        removeError(confirmPasswordInput);
        showSuccess(confirmPasswordInput);
      }

      // If form is valid, submit
      if (isValid) {
        // Show success message
        alert("Account created successfully! Welcome to EcoMart.");
        
        // Here you would normally submit to server
        // this.submit();
        
        // For demo, reset form and switch to sign in
        this.reset();
        document.querySelectorAll(".input-success").forEach(input => {
          input.classList.remove("input-success");
        });
        
        // Switch back to sign in view
        setTimeout(() => {
          toSigninBtn.click();
        }, 1500);
      }
    });

    // Real-time validation on input
    const signupInputs = signupFormElement.querySelectorAll("input");
    const signupNameInput = signupInputs[0];
    const signupEmailInput = signupInputs[1];
    const signupPasswordInput = signupInputs[2];
    const signupConfirmPasswordInput = signupInputs[3];

    signupNameInput.addEventListener("blur", function () {
      if (this.value.trim() && !isValidFullName(this.value)) {
        showError(this, "Please enter your full name (first and last name)");
      } else if (this.value.trim()) {
        removeError(this);
      }
    });

    signupEmailInput.addEventListener("blur", function () {
      if (this.value.trim() && !isValidEmail(this.value.trim())) {
        showError(this, "Please enter a valid email address");
      } else if (this.value.trim()) {
        removeError(this);
      }
    });

    signupPasswordInput.addEventListener("blur", function () {
      if (this.value && !isValidPassword(this.value)) {
        showError(
          this,
          "Password must be at least 8 characters with uppercase, lowercase, and number"
        );
      }
    });

    signupConfirmPasswordInput.addEventListener("blur", function () {
      if (this.value && this.value !== signupPasswordInput.value) {
        showError(this, "Passwords do not match");
      } else if (this.value) {
        removeError(this);
      }
    });
  }

  // ============================================
  // TOGGLE BETWEEN SIGN IN AND SIGN UP
  // ============================================
  
  // Switch to Sign Up
  toSignupBtn.addEventListener("click", function (e) {
    e.preventDefault();
    loginContainer.classList.add("signup-mode");

    // Fade out current content
    signinForm.classList.add("hidden");
    heyThere.classList.add("hidden");

    // Fade in new content after color transition starts
    setTimeout(() => {
      signupForm.classList.remove("hidden");
      welcomeBack.classList.remove("hidden");
    }, 150);
  });

  // Switch to Sign In
  toSigninBtn.addEventListener("click", function (e) {
    e.preventDefault();
    loginContainer.classList.remove("signup-mode");

    // Fade out current content
    signupForm.classList.add("hidden");
    welcomeBack.classList.add("hidden");

    // Fade in new content after color transition starts
    setTimeout(() => {
      signinForm.classList.remove("hidden");
      heyThere.classList.remove("hidden");
    }, 150);
  });

  // ============================================
  // PASSWORD TOGGLE FUNCTIONALITY
  // ============================================
  const passwordToggles = document.querySelectorAll(".password-toggle");
  passwordToggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const input = this.parentElement.querySelector("input");
      const icon = this.querySelector("i");

      if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
      } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
      }
    });
  });
});