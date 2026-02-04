class LoveCard extends HTMLElement {
    constructor() {
        super();
        this.isOpen = false;
    }
    
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.render();
        this.attachEvents();
    }
    
    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                
                .envelope {
                    background: linear-gradient(135deg, #1e293b, #0f172a);
                    border: 2px solid rgba(244, 63, 94, 0.3);
                    border-radius: 1.5rem;
                    padding: 3rem;
                    position: relative;
                    overflow: hidden;
                    cursor: pointer;
                    transition: all 0.4s ease;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                }
                
                .envelope:hover {
                    border-color: rgba(244, 63, 94, 0.6);
                    transform: translateY(-2px);
                    box-shadow: 0 25px 50px rgba(244, 63, 94, 0.2);
                }
                
                .envelope.open {
                    background: linear-gradient(135deg, rgba(30,41,59,0.95), rgba(15,23,42,0.95));
                }
                
                .seal {
                    position: absolute;
                    top: -30px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(135deg, #f43f5e, #8b5cf6);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 15px rgba(244, 63, 94, 0.4);
                    transition: all 0.3s ease;
                    z-index: 10;
                }
                
                .envelope.open .seal {
                    top: 20px;
                    transform: translateX(-50%) scale(0.8);
                }
                
                .seal-icon {
                    color: white;
                    font-size: 24px;
                }
                
                .hint {
                    text-align: center;
                    color: #94a3b8;
                    font-size: 0.9rem;
                    margin-bottom: 1rem;
                    transition: opacity 0.3s;
                }
                
                .envelope.open .hint {
                    opacity: 0;
                }
                
                .letter-content {
                    opacity: 0;
                    max-height: 0;
                    overflow: hidden;
                    transition: all 0.6s ease;
                    color: #e2e8f0;
                    line-height: 1.8;
                    font-size: 1.1rem;
                }
                
                .envelope.open .letter-content {
                    opacity: 1;
                    max-height: 1000px;
                    margin-top: 2rem;
                }
                
                .letter-content p {
                    margin-bottom: 1.5rem;
                    text-align: center;
                }
                
                .signature {
                    text-align: right;
                    color: #f43f5e;
                    font-style: italic;
                    margin-top: 2rem;
                    font-size: 1.2rem;
                }
                
                .wax-drop {
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    background: #f43f5e;
                    border-radius: 50%;
                    opacity: 0.3;
                }
                
                .highlight {
                    color: #f43f5e;
                    font-weight: 600;
                }
                
                @media (max-width: 640px) {
                    .envelope {
                        padding: 2rem 1.5rem;
                    }
                    .letter-content {
                        font-size: 1rem;
                    }
                }
            </style>
            
            <div class="envelope" id="envelope">
                <div class="seal">
                    <span class="seal-icon">💌</span>
                </div>
                <div class="hint">Click to open my letter</div>
                <div class="letter-content" id="content">
                    <p>My Dearest Love,</p>
                    <p>
                        As I write this, I'm thinking of you thousands of miles away, yet somehow you feel 
                        closer than ever. Every day we spend apart is one day closer to when I'll get to 
                        hold you again.
                    </p>
                    <p>
                        Distance has this cruel way of testing us, but it's also shown me just how real 
                        this is. The late-night calls, the good morning texts that make my day, the way 
                        you still make me laugh through a screen—it's all worth it because it's <span class="highlight">you</span>.
                    </p>
                    <p>
                        You're my first thought in the morning and my last prayer at night. You're the 
                        reason I believe that love doesn't know borders, time zones, or maps. It just knows 
                        two hearts that beat for each other.
                    </p>
                    <p>
                        So this Valentine's Day, I don't just want to send you chocolates or flowers. 
                        I want to send you every piece of my heart. I want to promise you that no matter 
                        how many miles stretch between us, I'm always yours. Completely. Forever.
                    </p>
                    <div class="signature">
                        Forever Yours,<br>
                        Your Loving Boy always and forever 💕
                    </div>
                </div>
            </div>
        `;
    }
    
    attachEvents() {
        const envelope = this.shadowRoot.getElementById('envelope');
        envelope.addEventListener('click', () => {
            this.isOpen = !this.isOpen;
            envelope.classList.toggle('open', this.isOpen);
            
            if (this.isOpen) {
                // Trigger confetti from parent
                if (window.createCelebrationHearts) {
                    setTimeout(() => window.createCelebrationHearts(), 300);
                }
            }
        });
    }
}

customElements.define('love-card', LoveCard);