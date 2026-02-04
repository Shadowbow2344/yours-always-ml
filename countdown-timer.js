class CountdownTimer extends HTMLElement {
    constructor() {
        super();
        this.targetDate = new Date(this.getAttribute('target-date') || '2024-02-14');
    }
    
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.render();
        this.startTimer();
    }
    
    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                
                .countdown-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 1rem;
                    max-width: 600px;
                    margin: 0 auto;
                }
                
                @media (max-width: 640px) {
                    .countdown-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
                
                .time-box {
                    background: linear-gradient(135deg, rgba(244,63,94,0.2), rgba(139,92,246,0.2));
                    border: 1px solid rgba(244,63,94,0.3);
                    border-radius: 1rem;
                    padding: 1.5rem 1rem;
                    text-align: center;
                    backdrop-filter: blur(10px);
                    transition: transform 0.3s ease;
                }
                
                .time-box:hover {
                    transform: translateY(-5px);
                    border-color: rgba(244,63,94,0.6);
                }
                
                .number {
                    font-size: 2.5rem;
                    font-weight: bold;
                    background: linear-gradient(to right, #f43f5e, #8b5cf6);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    line-height: 1;
                    margin-bottom: 0.5rem;
                }
                
                .label {
                    font-size: 0.875rem;
                    color: #94a3b8;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                }
                
                .separator {
                    display: none;
                }
            </style>
            <div class="countdown-grid">
                <div class="time-box">
                    <div class="number" id="days">00</div>
                    <div class="label">Days</div>
                </div>
                <div class="time-box">
                    <div class="number" id="hours">00</div>
                    <div class="label">Hours</div>
                </div>
                <div class="time-box">
                    <div class="number" id="minutes">00</div>
                    <div class="label">Minutes</div>
                </div>
                <div class="time-box">
                    <div class="number" id="seconds">00</div>
                    <div class="label">Seconds</div>
                </div>
            </div>
        `;
    }
    
    startTimer() {
        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = this.targetDate - now;
            
            if (distance < 0) {
                this.shadowRoot.getElementById('days').textContent = '00';
                this.shadowRoot.getElementById('hours').textContent = '00';
                this.shadowRoot.getElementById('minutes').textContent = '00';
                this.shadowRoot.getElementById('seconds').textContent = '00';
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            this.shadowRoot.getElementById('days').textContent = String(days).padStart(2, '0');
            this.shadowRoot.getElementById('hours').textContent = String(hours).padStart(2, '0');
            this.shadowRoot.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            this.shadowRoot.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        };
        
        updateTimer();
        setInterval(updateTimer, 1000);
    }
}

customElements.define('countdown-timer', CountdownTimer);