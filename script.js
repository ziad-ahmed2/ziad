/**
 * PORSCHE TEST DRIVE - JavaScript
 * Handles theme switching, navigation, form submission, and interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // ==========================================
    // THEME TOGGLE
    // ==========================================
    
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('porsche-theme');
    if (savedTheme) {
        body.className = savedTheme;
    }
    
    themeToggle.addEventListener('click', function() {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('porsche-theme', 'light-theme');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('porsche-theme', 'dark-theme');
        }
    });
    
    // ==========================================
    // NAVBAR SCROLL EFFECT
    // ==========================================
    
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // ==========================================
    // MOBILE MENU
    // ==========================================
    
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(function(link) {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !navLinks.contains(e.target)) {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
    
    // ==========================================
    // MODEL SELECTION
    // ==========================================
    
    const modelCards = document.querySelectorAll('.model-card');
    const modelSelect = document.getElementById('model');
    
    modelCards.forEach(function(card) {
        const selectButton = card.querySelector('.select-model');
        
        selectButton.addEventListener('click', function() {
            // Remove selected class from all cards
            modelCards.forEach(function(c) {
                c.classList.remove('selected');
            });
            
            // Add selected class to clicked card
            card.classList.add('selected');
            
            // Get model name from data attribute
            const modelName = card.getAttribute('data-model');
            
            // Update the select dropdown
            modelSelect.value = modelName;
            
            // Scroll to booking section
            const bookingSection = document.getElementById('booking');
            bookingSection.scrollIntoView({ behavior: 'smooth' });
            
            // Add visual feedback
            selectButton.textContent = 'Selected!';
            setTimeout(function() {
                selectButton.textContent = 'Select for Test Drive';
            }, 2000);
        });
    });
    
    // ==========================================
    // DATE INPUT - SET MINIMUM DATE
    // ==========================================
    
    const dateInput = document.getElementById('date');
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Format date as YYYY-MM-DD
    const formatDate = function(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return year + '-' + month + '-' + day;
    };
    
    dateInput.setAttribute('min', formatDate(tomorrow));
    
    // ==========================================
    // FORM SUBMISSION
    // ==========================================
    
    const bookingForm = document.getElementById('bookingForm');
    const successModal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');
    
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(bookingForm);
        const data = {};
        formData.forEach(function(value, key) {
            data[key] = value;
        });
        
        // Log booking data (in real app, send to server)
        console.log('Booking submitted:', data);
        
        // Show success modal
        successModal.classList.add('active');
        
        // Reset form
        bookingForm.reset();
        
        // Remove selected state from model cards
        modelCards.forEach(function(card) {
            card.classList.remove('selected');
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        successModal.classList.remove('active');
    });
    
    // Close modal on background click
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            successModal.classList.remove('active');
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && successModal.classList.contains('active')) {
            successModal.classList.remove('active');
        }
    });
    
    // ==========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================
    
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ==========================================
    // SCROLL ANIMATIONS
    // ==========================================
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.model-card, .contact-item, .feature');
    animatedElements.forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ==========================================
    // FORM VALIDATION FEEDBACK
    // ==========================================
    
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formInputs.forEach(function(input) {
        input.addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                this.style.borderColor = '#b34b03';
            } else if (this.required) {
                this.style.borderColor = '#ff4444';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = '#b34b03';
        });
    });
    
    // ==========================================
    // PHONE INPUT FORMATTING
    // ==========================================
    
    const phoneInput = document.getElementById('phone');
    
    phoneInput.addEventListener('input', function(e) {
        // Allow only numbers, spaces, dashes, and plus sign
        let value = e.target.value.replace(/[^\d\s\-+]/g, '');
        e.target.value = value;
    });
    
    // ==========================================
    // EMAIL VALIDATION
    // ==========================================
    
    const emailInput = document.getElementById('email');
    
    emailInput.addEventListener('blur', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.value && !emailRegex.test(this.value)) {
            this.style.borderColor = '#ff4444';
        }
    });
    
    // ==========================================
    // KEYBOARD NAVIGATION
    // ==========================================
    
    // Make model cards focusable and selectable via keyboard
    modelCards.forEach(function(card) {
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const selectButton = card.querySelector('.select-model');
                selectButton.click();
            }
        });
    });
});
