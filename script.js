// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close mobile nav when clicking a link
document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
            navbar.style.background = 'rgba(255, 255, 255, 0.85)';
        }
    });
}

// Carousel for Wishes
const wishes = document.querySelectorAll('.wish-card');
const dots = document.querySelectorAll('.dot');
let currentWish = 0;

function showWish(index) {
    if (wishes.length === 0) return;
    wishes.forEach(wish => wish.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    wishes[index].classList.add('active');
    dots[index].classList.add('active');
}

if (dots.length > 0) {
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentWish = parseInt(dot.getAttribute('data-index'));
            showWish(currentWish);
        });
    });

    // Auto rotate wishes
    setInterval(() => {
        currentWish = (currentWish + 1) % wishes.length;
        showWish(currentWish);
    }, 5000);
}

// Reveal elements on scroll
const revealElements = document.querySelectorAll('.card, .gallery-item, .about-text');

function checkReveal() {
    const triggerBottom = window.innerHeight * 0.85;
    
    revealElements.forEach(el => {
        const elTop = el.getBoundingClientRect().top;
        if (elTop < triggerBottom) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
}

if (revealElements.length > 0) {
    // Initial setup for reveal
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
    });

    window.addEventListener('scroll', checkReveal);
    // Trigger once on load
    checkReveal();
}
