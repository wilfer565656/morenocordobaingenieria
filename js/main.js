// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile navbar if open
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        }
    });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };
        
        // Here you would normally send the data to a server
        // For this example, we'll just show an alert
        alert('¡Gracias por su solicitud! Nos pondremos en contacto con usted pronto.');
        
        // Reset form
        contactForm.reset();
    });
}

// Animate elements on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements to animate
document.querySelectorAll('.service-card, .benefit-card, .process-step, .contact-form').forEach(el => {
    observer.observe(el);
});

// Add current year to footer if needed
const currentYear = new Date().getFullYear();
const yearElements = document.querySelectorAll('.current-year');
yearElements.forEach(el => {
    el.textContent = currentYear;
});

// ... Código anterior ...

// Image lazy loading
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Image gallery modal
function initGalleryModal() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <img src="" alt="" class="modal-image">
            <div class="modal-caption"></div>
        </div>
    `;
    document.body.appendChild(modal);
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const caption = this.querySelector('.gallery-overlay h5').textContent;
            
            modal.querySelector('.modal-image').src = imgSrc;
            modal.querySelector('.modal-caption').textContent = caption;
            modal.classList.add('active');
        });
    });
    
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    modal.querySelector('.modal-overlay').addEventListener('click', () => {
        modal.classList.remove('active');
    });
}

// Testimonials slider
function initTestimonialsSlider() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.opacity = i === index ? '1' : '0.5';
            testimonial.style.transform = i === index ? 'scale(1.05)' : 'scale(1)';
        });
    }
    
    // Auto rotate testimonials
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }, 5000);
    
    // Initial display
    showTestimonial(currentIndex);
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Existing functions
    initNavbarScroll();
    initSmoothScroll();
    initActiveNav();
    initContactForm();
    initAnimationObserver();
    
    // New functions
    initLazyLoading();
    initGalleryModal();
    initTestimonialsSlider();
});

// Add CSS for modal
const modalStyles = `
.image-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    display: none;
    align-items: center;
    justify-content: center;
}

.image-modal.active {
    display: flex;
}

.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
}

.modal-content {
    position: relative;
    z-index: 2;
    max-width: 90%;
    max-height: 90%;
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
}

.modal-close {
    position: absolute;
    top: 10px;
    right: 10px;
    background: var(--primary-color);
    color: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    z-index: 3;
}

.modal-image {
    max-width: 100%;
    max-height: 70vh;
    display: block;
}

.modal-caption {
    padding: 20px;
    text-align: center;
    color: var(--accent-color);
    font-weight: 600;
}
`;

// Add modal styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);