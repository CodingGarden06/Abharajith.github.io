// DOM Elements
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const videoCards = document.querySelectorAll('.video-card');
const videoModal = document.querySelector('.video-modal');
const closeModal = document.querySelector('.close-modal');
const modalVideo = document.getElementById('modal-video');

// ===== THEME TOGGLE =====
if (themeToggle && themeIcon) {
    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
    
    themeToggle.addEventListener('click', () => {
        const isLightMode = document.body.classList.contains('light-mode');
        
        if (isLightMode) {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
}

// ===== MOBILE NAVIGATION =====
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
   
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// ===== VIDEO MODAL =====
if (videoCards.length > 0 && videoModal) {
    videoCards.forEach((card, index) => {
        const playBtn = card.querySelector('.play-btn');
        
        playBtn.addEventListener('click', () => {
            // You'll need to add your actual video sources here
            const videoSources = [
                './assets/videos/coding-process-1.mp4',
                './assets/videos/coding-process-2.mp4'
            ];
            
            modalVideo.src = videoSources[index] || './assets/videos/default.mp4';
            videoModal.classList.add('active');
            modalVideo.play();
        });
    });
    
    // Close Modal
    closeModal.addEventListener('click', () => {
        videoModal.classList.remove('active');
        modalVideo.pause();
        modalVideo.currentTime = 0;
    });
    
    // Close modal on outside click
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            videoModal.classList.remove('active');
            modalVideo.pause();
            modalVideo.currentTime = 0;
        }
    });
}

// ===== SIMPLE TYPEWRITER (NO DUPLICATES) =====
document.addEventListener('DOMContentLoaded', function() {
    const typewriter = document.querySelector('.typewriter');
    
    // Only run if element exists AND hasn't been animated yet
    if (typewriter && !sessionStorage.getItem('typewriterDone')) {
        sessionStorage.setItem('typewriterDone', 'true');
        
        const text = "Welcome to Abharajith's Coding Garden";
        const highlightWord = "Coding Garden";
        let i = 0;
        
        function type() {
            if (i < text.length) {
                // Build text with highlight
                let html = text.substring(0, i + 1);
                
                // Add highlight to the target words
                if (i >= text.indexOf(highlightWord)) {
                    const highlightStart = text.indexOf(highlightWord);
                    html = 
                        text.substring(0, highlightStart) +
                        '<span class="highlight">' +
                        text.substring(highlightStart, i + 1) +
                        '</span>';
                }
                
                typewriter.innerHTML = html + '<span class="cursor">|</span>';
                i++;
                setTimeout(type, 100);
            } else {
                // Final state with blinking cursor
                typewriter.innerHTML = 
                    text.substring(0, text.indexOf(highlightWord)) +
                    '<span class="highlight">' + highlightWord + '</span>' +
                    '<span class="cursor" style="animation: blink 1s infinite">|</span>';
            }
        }
        
        // Start after delay
        setTimeout(type, 1000);
    }
});

// ===== WAVE CANVAS =====
const waveCanvas = document.getElementById('wave-canvas');
if (waveCanvas) {
    const waveCtx = waveCanvas.getContext('2d');
    let waves = [];
    const waveColors = ['#FF6B8B', '#4ECDC4', '#FFD166', '#06D6A0', '#9D4EDD'];
    
    function resizeWaveCanvas() {
        waveCanvas.width = window.innerWidth;
        waveCanvas.height = window.innerHeight;
    }
    
    class Wave {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.radius = 0;
            this.maxRadius = 300;
            this.color = color;
            this.opacity = 0.5;
            this.speed = 3;
        }
        
        update() {
            this.radius += this.speed;
            this.opacity -= 0.01;
            return this.opacity > 0 && this.radius < this.maxRadius;
        }
        
        draw() {
            waveCtx.beginPath();
            waveCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            waveCtx.strokeStyle = this.color;
            waveCtx.globalAlpha = this.opacity;
            waveCtx.lineWidth = 2;
            waveCtx.stroke();
            waveCtx.globalAlpha = 1;
        }
    }
    
    // Create waves on click
    document.addEventListener('click', (e) => {
        const color = waveColors[Math.floor(Math.random() * waveColors.length)];
        waves.push(new Wave(e.clientX, e.clientY, color));
    });
    
    function animateWaves() {
        waveCtx.clearRect(0, 0, waveCanvas.width, waveCanvas.height);
        
        waves = waves.filter(wave => {
            wave.update();
            wave.draw();
            return wave.opacity > 0;
        });
        
        requestAnimationFrame(animateWaves);
    }
    
    // Initialize
    resizeWaveCanvas();
    animateWaves();
    window.addEventListener('resize', resizeWaveCanvas);
}

// ===== SHAPE CANVAS =====
const shapeCanvas = document.getElementById('shape-canvas');
if (shapeCanvas) {
    const shapeCtx = shapeCanvas.getContext('2d');
    let shapes = [];
    const shapeColors = ['#FF6B8B', '#4ECDC4', '#FFD166', '#06D6A0', '#9D4EDD'];
    
    function resizeShapeCanvas() {
        shapeCanvas.width = window.innerWidth;
        shapeCanvas.height = window.innerHeight;
    }
    
    class FloatingShape {
        constructor() {
            this.type = Math.floor(Math.random() * 3);
            this.x = Math.random() * shapeCanvas.width;
            this.y = Math.random() * shapeCanvas.height;
            this.size = Math.random() * 40 + 10;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.color = shapeColors[Math.floor(Math.random() * shapeColors.length)];
            this.opacity = Math.random() * 0.3 + 0.1;
            this.rotation = 0;
            this.rotationSpeed = Math.random() * 0.02 - 0.01;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.rotation += this.rotationSpeed;
            
            if (this.x < 0 || this.x > shapeCanvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > shapeCanvas.height) this.speedY *= -1;
        }
        
        draw() {
            shapeCtx.save();
            shapeCtx.translate(this.x, this.y);
            shapeCtx.rotate(this.rotation);
            shapeCtx.globalAlpha = this.opacity;
            shapeCtx.fillStyle = this.color;
            
            switch(this.type) {
                case 0: // Circle
                    shapeCtx.beginPath();
                    shapeCtx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
                    shapeCtx.fill();
                    break;
                case 1: // Triangle
                    shapeCtx.beginPath();
                    shapeCtx.moveTo(0, -this.size / 2);
                    shapeCtx.lineTo(this.size / 2, this.size / 2);
                    shapeCtx.lineTo(-this.size / 2, this.size / 2);
                    shapeCtx.closePath();
                    shapeCtx.fill();
                    break;
                case 2: // Square
                    shapeCtx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
                    break;
            }
            
            shapeCtx.restore();
        }
    }
    
    // Initialize shapes
    for (let i = 0; i < 15; i++) {
        shapes.push(new FloatingShape());
    }
    
    function animateShapes() {
        shapeCtx.clearRect(0, 0, shapeCanvas.width, shapeCanvas.height);
        
        shapes.forEach(shape => {
            shape.update();
            shape.draw();
        });
        
        requestAnimationFrame(animateShapes);
    }
    
    // Initialize
    resizeShapeCanvas();
    animateShapes();
    window.addEventListener('resize', resizeShapeCanvas);
}

// ===== DYNAMIC LIGHTING =====
const lightSpots = document.querySelectorAll('.light-spotlight');
if (lightSpots.length > 0) {
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        lightSpots.forEach((spot, index) => {
            setTimeout(() => {
                spot.style.left = `${mouseX - 150}px`;
                spot.style.top = `${mouseY - 150}px`;
                spot.style.opacity = '0.5';
                
                setTimeout(() => {
                    spot.style.opacity = '0';
                }, 100);
            }, index * 50);
        });
    });
}

// ===== COLOR CYCLING =====
const colorElements = document.querySelectorAll('.color-cycle');
if (colorElements.length > 0) {
    const colors = ['#FF6B8B', '#4ECDC4', '#FFD166', '#06D6A0', '#118AB2', '#9D4EDD'];
    
    setInterval(() => {
        colorElements.forEach(el => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            el.style.color = randomColor;
        });
    }, 2000);
}

// ===== CARD HOVER EFFECTS =====
const interactiveCards = document.querySelectorAll('.project-card, .video-card');
if (interactiveCards.length > 0) {
    const colors = ['#FF6B8B', '#4ECDC4', '#FFD166', '#06D6A0', '#118AB2', '#9D4EDD'];
    
    interactiveCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            card.style.borderColor = randomColor;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.borderColor = '';
        });
    });
}

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks) navLinks.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        }
    });
});

// ===== HIGHLIGHT.JS =====
if (typeof hljs !== 'undefined') {
    hljs.highlightAll();
}

// ===== INITIALIZE ON LOAD =====
window.addEventListener('load', () => {
    console.log('🌈 Neural Garden Portfolio Loaded!');
    
    // Create initial waves
    if (waveCanvas) {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                if (window.waves) {
                    const colors = ['#FF6B8B', '#4ECDC4', '#FFD166', '#06D6A0', '#9D4EDD'];
                    window.waves.push(new (class {
                        constructor() {
                            this.x = Math.random() * window.innerWidth;
                            this.y = Math.random() * window.innerHeight;
                            this.radius = 0;
                            this.maxRadius = 300;
                            this.color = colors[Math.floor(Math.random() * colors.length)];
                            this.opacity = 0.5;
                            this.speed = 3;
                        }
                        update() {
                            this.radius += this.speed;
                            this.opacity -= 0.01;
                            return this.opacity > 0 && this.radius < this.maxRadius;
                        }
                        draw(ctx) {
                            ctx.beginPath();
                            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                            ctx.strokeStyle = this.color;
                            ctx.globalAlpha = this.opacity;
                            ctx.lineWidth = 2;
                            ctx.stroke();
                            ctx.globalAlpha = 1;
                        }
                    })());
                }
            }, i * 500);
        }
    }
});

// Fullscreen Rickroll Video
document.addEventListener('DOMContentLoaded', function() {
    const rickrollBtn = document.getElementById('rickroll-btn');
    const rickrollModal = document.getElementById('rickrollModal');
    const rickrollVideo = document.getElementById('rickrollVideo');
    
    if (rickrollBtn) {
        rickrollBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
           
            const streamableUrl = "https://streamable.com/e/lf027o?autoplay=1&muted=0&controls=0";
            
          
            rickrollVideo.src = streamableUrl;
            
          
            rickrollModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; 
            
           
            if (rickrollVideo.requestFullscreen) {
                rickrollVideo.requestFullscreen();
            } else if (rickrollVideo.webkitRequestFullscreen) {
                rickrollVideo.webkitRequestFullscreen();
            } else if (rickrollVideo.msRequestFullscreen) {
                rickrollVideo.msRequestFullscreen();
            }
        });
    }
    
    
    rickrollModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeRickroll();
        }
    });
});

// Close rickroll function
function closeRickroll() {
    const modal = document.getElementById('rickrollModal');
    const video = document.getElementById('rickrollVideo');
    
    // Exit fullscreen if active
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
    
    // Stop video and hide modal
    video.src = "";
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// Close with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeRickroll();
    }
});