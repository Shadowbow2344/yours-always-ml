// Main JavaScript for Valentine Website

document.addEventListener('DOMContentLoaded', () => {
    initializeScrollReveal();
    initialize ValentineButtons();
    initializeParallax();
});

// Scroll Reveal Animation
function initializeScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;
        
        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on load
}

// Valentine Button Interactions
function initializeValentineButtons() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const successMessage = document.getElementById('successMessage');
    
    if (yesBtn) {
        yesBtn.addEventListener('click', () => {
            // Hide buttons
            yesBtn.style.display = 'none';
            noBtn.style.display = 'none';
            
            // Show success message
            successMessage.classList.remove('hidden');
            
            // Create celebration hearts
            createCelebrationHearts();
            
            // Play confetti effect (visual only)
            fireConfetti();
        });
    }
    
    // Make the "No" button run away when hovered (desktop) or touched (mobile)
    if (noBtn) {
        noBtn.addEventListener('mouseenter', moveNoButton);
        noBtn.addEventListener('touchstart', moveNoButton);
    }
}

function moveNoButton(e) {
    const noBtn = document.getElementById('noBtn');
    const container = noBtn.parentElement;
    const containerRect = container.getBoundingClientRect();
    
    // Calculate random position within container bounds
    const maxX = containerRect.width - noBtn.offsetWidth;
    const maxY = containerRect.height - noBtn.offsetHeight;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
    noBtn.style.transform = 'none';
}

// Create floating hearts celebration
function createCelebrationHearts() {
    const colors = ['#f43f5e', '#ec4899', '#8b5cf6', '#fb7185'];
    const emojis = ['💕', '💖', '💗', '💓', '💝', '🌹'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = '100vh';
            heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            heart.style.animation = `float-up ${Math.random() * 3 + 2}s ease-out forwards`;
            
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 5000);
        }, i * 100);
    }
}

// Simple confetti effect using CSS particles
function fireConfetti() {
    const colors = ['#f43f5e', '#8b5cf6', '#fbbf24', '#34d399'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = '50%';
        confetti.style.top = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9998';
        
        const angle = (Math.PI * 2 * i) / 100;
        const velocity = 15 + Math.random() * 15;
        const tx = Math.cos(angle) * velocity * 20;
        const ty = Math.sin(angle) * velocity * 20;
        
        confetti.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.style.transform = `translate(${tx}px, ${ty}px) rotate(${Math.random() * 360}deg)`;
            confetti.style.opacity = '0';
        }, 10);
        
        setTimeout(() => confetti.remove(), 1000);
    }
}

// Parallax effect for hero section
function initializeParallax() {
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const hearts = document.querySelectorAll('.parallax-heart');
        hearts.forEach((heart, index) => {
            const speed = (index + 1) * 20;
            const x = (window.innerWidth / 2 - e.clientX) / speed;
            const y = (window.innerHeight / 2 - e.clientY) / speed;
            heart.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Typewriter effect for love letter
function typewriterEffect(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Export for use in components
window.createCelebrationHearts = createCelebrationHearts;
window.typewriterEffect = typewriterEffect;