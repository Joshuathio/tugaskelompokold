// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const signupButton = document.getElementById('signup-btn');
    const loginButton = document.querySelector('.login-btn');
    const socialButtons = document.querySelectorAll('.social-btn');
    
    // Form validation
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    function validateName(name) {
        return name.trim().length >= 2;
    }
    
    function validatePassword(password) {
        return password.trim().length >= 6;
    }
    
    function showError(input, message) {
        // Remove any previous error
        clearError(input);
        
        // Add error class to input
        input.classList.add('error');
        
        // Create error message element
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        // Insert error message after input's parent element (form-group)
        input.parentElement.insertAdjacentElement('afterend', errorElement);
    }
    
    function clearError(input) {
        // Remove error class from input
        input.classList.remove('error');
        
        // Remove any existing error message
        const existingError = input.parentElement.nextElementSibling;
        if (existingError && existingError.classList.contains('error-message')) {
            existingError.remove();
        }
    }
    
    function validateForm() {
        let isValid = true;
        
        // Validate name
        if (!validateName(nameInput.value)) {
            showError(nameInput, 'Name must be at least 2 characters');
            isValid = false;
        } else {
            clearError(nameInput);
        }
        
        // Validate email
        if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        } else {
            clearError(emailInput);
        }
        
        // Validate password
        if (!validatePassword(passwordInput.value)) {
            showError(passwordInput, 'Password must be at least 6 characters');
            isValid = false;
        } else {
            clearError(passwordInput);
        }
        
        return isValid;
    }
    
    // Input event listeners for real-time validation
    nameInput.addEventListener('input', function() {
        if (validateName(nameInput.value)) {
            clearError(nameInput);
        }
    });
    
    emailInput.addEventListener('input', function() {
        if (validateEmail(emailInput.value)) {
            clearError(emailInput);
        }
    });
    
    passwordInput.addEventListener('input', function() {
        if (validatePassword(passwordInput.value)) {
            clearError(passwordInput);
        }
    });
    
    // Handle signup button click
    signupButton.addEventListener('click', function() {
        if (validateForm()) {
            // Collect form data
            const formData = {
                name: nameInput.value,
                email: emailInput.value,
                password: passwordInput.value
            };
            
            // In a real application, you would send this data to your server
            console.log('Sign up form submitted:', formData);
            
            // Show success message
            alert('Sign up successful! Redirecting to home page...');
            
            // Save user data to local storage (optional, for demo purposes)
            localStorage.setItem('user', JSON.stringify(formData));
            
            // Redirect to home page after a short delay
            setTimeout(function() {
                // Change 'index.html' to your actual home page URL
                window.location.href = 'index.html';
            }, 1000); // 1 second delay for user to see the alert
        }
    });
    

    loginButton.addEventListener('click', function() {
        alert('Switching to login page... (This is a demo)');
    });
    
    // Handle social media buttons
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const socialNetwork = this.getAttribute('data-social');
            alert(`Signing up with ${socialNetwork}... (This is a demo)`);
        });
    });
    
    // Add subtle animation effects
    const inputs = document.querySelectorAll('.form-control');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-3px)';
            this.parentElement.style.transition = 'transform 0.3s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
});