document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuButton = document.getElementById('menu-button');
    const primaryNav = document.getElementById('primary-nav');
    
    if (menuButton && primaryNav) {
        menuButton.addEventListener('click', function() {
            primaryNav.classList.toggle('show');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (primaryNav && primaryNav.classList.contains('show') && 
            !event.target.closest('nav') && 
            event.target !== menuButton) {
            primaryNav.classList.remove('show');
        }
    });

    // FAQ accordion functionality (if on contact page)
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                // Toggle active class on the question
                this.classList.toggle('active');
                
                // Toggle active class on the answer
                const answer = this.nextElementSibling;
                answer.classList.toggle('active');
                
                // Update toggle icon
                const icon = this.querySelector('.toggle-icon');
                icon.textContent = answer.classList.contains('active') ? '−' : '+';
            });
        });
    }

    // Handle newsletter subscription form (if on home page)
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Simple validation
            const email = document.getElementById('email');
            const name = document.getElementById('name');
            
            if (!email.value || !name.value) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Form submission would normally go to a server
            // For demo purposes, just show a success message
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        });
    }

    // Handle links that need to prevent default behavior
    const preventDefaultLinks = document.querySelectorAll('a[href="#"]');
    preventDefaultLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
        });
    });

    // Scroll to top button (create and add to DOM)
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: var(--primary-color);
        color: white;
        border: none;
        display: none;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 20px;
        z-index: 99;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    `;
    document.body.appendChild(scrollToTopBtn);

    // Show/hide scroll to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'flex';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});