class FloatingHearts extends HTMLElement {
    constructor() {
        super();
        this.hearts = [];
        this.colors = ['#f43f5e', '#ec4899', '#8b5cf6', '#fb7185', '#f472b6'];
    }
    
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.render();
        this.startAnimation();
    }
    
    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 0;
                    overflow: hidden;
                }
                
                .heart {
                    position: absolute;
                    font-size: 20px;
                    opacity: 0.6;
                    animation: float-up linear infinite;
                    filter: drop-shadow(0 0 10px rgba(244, 63, 94, 0.5));
                }
                
                @keyframes float-up {
                    0% {
                        transform: translateY(100vh) rotate(0deg) scale(0.5);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.6;
                    }
                    90% {
                        opacity: 0.6;
                    }
                    100% {
                        transform: translateY(-10vh) rotate(360deg) scale(1.2);
                        opacity: 0;
                    }
                }
                
                .glow {
                    position: absolute;
                    width: 300px;
                    height: 300px;
                    background: radial-gradient(circle, rgba(244,63,94,0.15) 0%, transparent 70%);
                    border-radius: 50%;
                    animation: pulse 4s ease-in-out infinite;
                }
                
                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 0.5; }
                    50% { transform: scale(1.2); opacity: 0.8; }
                }
            </style>
            <div id="hearts-container"></div>
            <div class="glow" style="top: 20%; left: 10%;"></div>
            <div class="glow" style="top: 60%; right: 10%; animation-delay: 2s;"></div>
        `;
    }
    
    startAnimation() {
        const container = this.shadowRoot.getElementById('hearts-container');
        const emojis = ['💕', '💖', '💗', '💓', '💝', '❤️', '🌹'];
        
        // Create initial batch
        for (let i = 0; i < 15; i++) {
            this.createHeart(container, emojis, Math.random() * 100);
        }
        
        // Continue creating hearts
        setInterval(() => {
            this.createHeart(container, emojis, 100);
        }, 2000);
    }
    
    createHeart(container, emojis, startY = 100) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = startY + 'vh';
        heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.color = this.colors[Math.floor(Math.random() * this.colors.length)];
        
        container.appendChild(heart);
        
        // Remove after animation
        setTimeout(() => {
            heart.remove();
        }, 20000);
    }
}

customElements.define('floating-hearts', FloatingHearts);