class BotSystem {
    constructor() {
        this.startTime = Date.now();
        this.init();
    }

    init() {
        this.setupTypingEffect();
        this.setupUptime();
        this.setupStats();
        this.setupParticles();
        this.setupTerminalCommands();
        this.setupStatusIndicator();
        this.setupKeyboardEffects();
        this.setupMouseTracking();
    }

    setupTypingEffect() {
        const textbox = document.getElementById('textbox');
        const lines = [
            { text: '$ Initializing PYTH bots system...', delay: 0 },
            { text: '$ Core modules loaded successfully.', delay: 1500 },
            { text: '$ Ready for command execution.', delay: 3000 }
        ];

        textbox.innerHTML = '';

        lines.forEach((line, index) => {
            setTimeout(() => {
                const p = document.createElement('p');
                p.className = 'terminal-line';
                p.innerHTML = `<span class="prompt">$</span> <span class="line-text"></span>`;
                textbox.appendChild(p);
                
                const lineText = p.querySelector('.line-text');
                this.typeWriter(lineText, line.text.replace('$ ', ''), 30);
            }, line.delay);
        });
    }

    typeWriter(element, text, speed) {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }

    setupUptime() {
        const uptimeElement = document.getElementById('uptime');
        
        setInterval(() => {
            const elapsed = Date.now() - this.startTime;
            const hours = Math.floor(elapsed / 3600000);
            const minutes = Math.floor((elapsed % 3600000) / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            
            uptimeElement.textContent = 
                `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }, 1000);
    }

    setupStats() {
        const stats = {
            usersOnline: { element: document.getElementById('usersOnline'), target: 1247, duration: 3000 },
            botsActive: { element: document.getElementById('botsActive'), target: 42, duration: 2500 },
            commandsExec: { element: document.getElementById('commandsExec'), target: 1842, duration: 4000 }
        };

        Object.keys(stats).forEach(key => {
            const stat = stats[key];
            this.animateNumber(stat.element, 0, stat.target, stat.duration);
        });
    }

    animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        const range = end - start;

        const updateNumber = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + range * easeOutQuart);
            
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                // Add random fluctuation
                setInterval(() => {
                    const fluctuation = Math.floor(Math.random() * 10) - 5;
                    const newValue = Math.max(0, end + fluctuation);
                    element.textContent = newValue.toLocaleString();
                }, 5000);
            }
        };

        requestAnimationFrame(updateNumber);
    }

    setupParticles() {
        const container = document.getElementById('particles');
        const particleCount = 30;

        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                this.createParticle(container);
            }, i * 200);
        }

        setInterval(() => {
            this.createParticle(container);
        }, 2000);
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const startX = Math.random() * window.innerWidth;
        const delay = Math.random() * 5;
        const duration = 8 + Math.random() * 4;
        
        particle.style.left = startX + 'px';
        particle.style.animationDelay = delay + 's';
        particle.style.animationDuration = duration + 's';
        
        container.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, (duration + delay) * 1000);
    }

    setupTerminalCommands() {
        const textbox = document.getElementById('textbox');
        let commandIndex = 0;
        
        const commands = [
            '$ Scanning for active connections...',
            '$ Database connection: ESTABLISHED',
            '$ WebSocket status: CONNECTED',
            '$ Command handler: READY',
            '$ All systems operational'
        ];

        setInterval(() => {
            if (commandIndex < commands.length) {
                const p = document.createElement('p');
                p.className = 'terminal-line';
                p.innerHTML = `<span class="prompt">$</span> <span class="line-text"></span>`;
                textbox.appendChild(p);
                
                const lineText = p.querySelector('.line-text');
                this.typeWriter(lineText, commands[commandIndex].replace('$ ', ''), 40);
                
                const lines = textbox.querySelectorAll('.terminal-line');
                if (lines.length > 5) {
                    lines[0].remove();
                }
                
                commandIndex++;
                if (commandIndex >= commands.length) {
                    commandIndex = 0;
                }
            }
        }, 8000);
    }

    setupStatusIndicator() {
        const statusText = document.getElementById('statusText');
        const statusValue = document.getElementById('statusValue');
        
        const statuses = [
            { text: 'SYSTEM ONLINE', value: 'OPERATIONAL', color: '#00ff88' },
            { text: 'PROCESSING', value: 'ACTIVE', color: '#00d9ff' },
            { text: 'SYSTEM ONLINE', value: 'OPERATIONAL', color: '#00ff88' }
        ];
        
        let currentStatus = 0;
        
        setInterval(() => {
            const status = statuses[currentStatus];
            statusText.textContent = status.text;
            statusText.style.color = status.color;
            statusText.style.textShadow = `0 0 10px ${status.color}`;
            
            const valueSpan = statusValue.querySelector('span:not(.pulse-dot)') || statusValue;
            if (valueSpan.textContent) {
                valueSpan.textContent = status.value;
            }
            
            currentStatus = (currentStatus + 1) % statuses.length;
        }, 3000);
    }

    setupKeyboardEffects() {
        const nameMain = document.getElementById('nameMain');
        let glowIntensity = 1;
        
        document.addEventListener('keydown', (e) => {
            if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Enter') {
                glowIntensity = 1.5;
                nameMain.style.textShadow = `0 0 ${20 * glowIntensity}px var(--glow-color), 0 0 ${40 * glowIntensity}px var(--glow-color)`;
                
                setTimeout(() => {
                    glowIntensity = 1;
                    nameMain.style.textShadow = '0 0 20px var(--glow-color)';
                }, 200);
            }
        });
    }

    setupMouseTracking() {
        const card = document.querySelector('.profile-card');
        const avatar = document.querySelector('.avatar');
        
        document.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / centerX * 10;
            const moveY = (y - centerY) / centerY * 10;
            
            avatar.style.transform = `translate(${moveX}px, ${moveY}px) rotate(360deg)`;
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new BotSystem();
    
    const buttons = document.querySelectorAll('.link-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                border-radius: 50%;
                background: rgba(0, 217, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

console.log('%cPythbots ©2026', 'color: #00d9ff; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #00d9ff;');
console.log('%cGet actually advanced bots today!', 'color: #00ff88; font-size: 12px;');
console.log('%cVisit xat.com/Pythbots for more info.', 'color: #66e0ff; font-size: 11px;');
