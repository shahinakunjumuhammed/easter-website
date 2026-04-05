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

// ======== Easter Egg Clicker Game ========
const btnStartClick = document.getElementById('startClickGame');
const clickTimerDisplay = document.getElementById('clickTimer');
const clickScoreDisplay = document.getElementById('clickScore');
const bigEgg = document.getElementById('bigEgg');
const clickGameResult = document.getElementById('clickGameResult');

let clickScore = 0;
let clickTimeLeft = 10;
let clickTimerInterval;
let isClickGameActive = false;

if (btnStartClick) {
    btnStartClick.addEventListener('click', () => {
        // Reset
        clickScore = 0;
        clickTimeLeft = 10;
        isClickGameActive = true;
        clickScoreDisplay.textContent = clickScore;
        clickTimerDisplay.textContent = clickTimeLeft;
        clickGameResult.textContent = '';
        
        bigEgg.classList.add('active');
        btnStartClick.disabled = true;

        clearInterval(clickTimerInterval);
        clickTimerInterval = setInterval(() => {
            clickTimeLeft--;
            clickTimerDisplay.textContent = clickTimeLeft;

            if (clickTimeLeft <= 0) {
                clearInterval(clickTimerInterval);
                isClickGameActive = false;
                bigEgg.classList.remove('active');
                btnStartClick.disabled = false;
                btnStartClick.textContent = 'Restart Game';
                clickGameResult.textContent = `Time's up! You clicked the egg ${clickScore} times!`;
            }
        }, 1000);
    });
}

if (bigEgg) {
    bigEgg.addEventListener('click', () => {
        if (isClickGameActive) {
            clickScore++;
            clickScoreDisplay.textContent = clickScore;
            // visual pop
            bigEgg.style.transform = 'scale(1.2)';
            setTimeout(() => bigEgg.style.transform = 'scale(1)', 50);
        }
    });
}


// ======== Easter Egg Hunt Game ========
const huntArea = document.getElementById('huntArea');
const huntScoreDisplay = document.getElementById('huntScore');
const btnResetHunt = document.getElementById('resetHuntGame');
const huntGameResult = document.getElementById('huntGameResult');

const totalHuntEggs = 5;
let huntScore = 0;
const eggEmojis = ['🪺', '🥚', '🎨', '🐣', '🌸'];

function initHuntGame() {
    huntScore = 0;
    huntScoreDisplay.textContent = huntScore;
    huntGameResult.textContent = '';
    huntArea.innerHTML = '';
    
    for (let i = 0; i < totalHuntEggs; i++) {
        const egg = document.createElement('div');
        egg.classList.add('hunt-egg');
        egg.textContent = eggEmojis[i % eggEmojis.length];
        
        // Random position
        const x = Math.random() * 85 + 5; // 5% to 90%
        const y = Math.random() * 80 + 10; // 10% to 90%
        
        egg.style.left = `${x}%`;
        egg.style.top = `${y}%`;

        egg.addEventListener('click', function() {
            if (!this.classList.contains('found')) {
                this.classList.add('found');
                huntScore++;
                huntScoreDisplay.textContent = huntScore;
                
                if (huntScore === totalHuntEggs) {
                    huntGameResult.textContent = "You found all the Easter eggs! Happy Easter!";
                }
            }
        });
        
        huntArea.appendChild(egg);
    }
}

if (btnResetHunt) {
    btnResetHunt.addEventListener('click', initHuntGame);
    // initialize the hunt game on load
    initHuntGame();
}
