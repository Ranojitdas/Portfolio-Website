document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger-menu');
    const navContainer = document.querySelector('.nav-container');
    const overlay = document.querySelector('.nav-overlay');

    if (!hamburger || !navContainer || !overlay) return; // Ensure elements exist

    // Toggle menu
    const toggleMenu = () => {
        const isActive = navContainer.classList.toggle('active');
        hamburger.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('menu-active', isActive); // Prevent scrolling
    };

    hamburger.addEventListener('click', toggleMenu);

    // Close menu when clicking overlay
    overlay.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navContainer.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Close menu on window resize if open
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && navContainer.classList.contains('active')) {
            navContainer.classList.remove('active');
            hamburger.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('menu-active'); // Reset overflow
        }
    });
});

// Add scroll-based animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .skill-card, .achievement-card, .project-item');
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight * 0.8 && position.bottom >= 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize elements with opacity 0
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.project-card, .skill-card, .achievement-card, .project-item');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    // Initial check for elements in view
    animateOnScroll();
});

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add typing animation to hero text
const typeWriter = (text, element, speed = 100) => {
    let i = 0;
    element.innerHTML = '';
    const timer = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
};

// Initialize typing animation
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-text h1');
    const heroTagline = document.querySelector('.hero-text .tagline');
    
    if (heroTitle && heroTagline) {
        typeWriter('Ranojit Das', heroTitle, 150);
        setTimeout(() => {
            typeWriter('Innovating through Code | Crafting Digital Experiences', heroTagline, 100);
        }, 1500);
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const hero = document.querySelector('#hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// Add active class to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        // Add floating labels
        const formGroups = contactForm.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            const label = group.querySelector('label');
            
            if (input && label) {
                // Add placeholder for floating label effect
                input.setAttribute('placeholder', ' ');
                
                // Add error message element
                const errorMessage = document.createElement('span');
                errorMessage.className = 'error-message';
                errorMessage.textContent = input.validationMessage;
                group.appendChild(errorMessage);
                
                // Update error message on input
                input.addEventListener('input', function() {
                    errorMessage.textContent = this.validationMessage;
                });
            }
        });

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const submitButton = this.querySelector('.submit-button');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for your message! I will get back to you soon.';
                this.appendChild(successMessage);
                
                // Reset form
                this.reset();
                
                // Reset button state
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    successMessage.style.transform = 'translateY(-20px)';
                    setTimeout(() => {
                        successMessage.remove();
                    }, 300);
                }, 5000);
            }, 1500);
        });
    }
});

// Form Input Animation
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});