document.addEventListener('DOMContentLoaded', () => {
    const introOverlay = document.getElementById('intro-overlay');
    const introVideo = document.getElementById('intro-video');
    const mainContent = document.getElementById('main-content');
    const body = document.body;
    const particleContainer = document.getElementById('dust-particles');

    // --- 1. INTRO VIDEO LOGIC ---
    const hasPlayedIntro = sessionStorage.getItem('introPlayed');

    if (introVideo && introOverlay && !hasPlayedIntro) {
        body.classList.add('intro-active');
        introVideo.play().catch(() => {
            introVideo.muted = true;
            introVideo.play();
        });

        const startGalaxyTransition = () => {
            introVideo.classList.add('dust-effect');
            if (particleContainer) {
                const totalStars = 800;
                for (let i = 0; i < totalStars; i++) {
                    const star = document.createElement('div');
                    star.className = 'galaxy-star';
                    const angle = Math.random() * Math.PI * 2;
                    const distance = 80 + Math.random() * 60;
                    const startX = 50 + Math.cos(angle) * distance;
                    const startY = 50 + Math.sin(angle) * distance;
                    star.style.left = startX + 'vw';
                    star.style.top = startY + 'vh';
                    star.style.setProperty('--target-x', (50 - startX) + 'vw');
                    star.style.setProperty('--target-y', (50 - startY) + 'vh');
                    const size = 1 + Math.random() * 1.5;
                    star.style.width = size + 'px';
                    star.style.height = size + 'px';
                    const colors = ['#ffffff', '#f8f8ff', '#e6f2ff', '#dae8f5', '#c8d8e8'];
                    const color = colors[Math.floor(Math.random() * colors.length)];
                    star.style.background = color;
                    star.style.boxShadow = `0 0 ${size * 2}px ${color}`;
                    star.style.animationDuration = (2 + Math.random() * 2) + 's';
                    star.style.animationDelay = (Math.random() * 1) + 's';
                    particleContainer.appendChild(star);
                }
            }

            setTimeout(() => {
                introOverlay.classList.add('galaxy-arrival');
                setTimeout(() => {
                    introOverlay.style.opacity = '0';
                    mainContent.classList.add('main-content-visible');
                    mainContent.style.opacity = '1';
                    mainContent.style.pointerEvents = 'all';
                    body.classList.remove('intro-active');
                    body.style.overflow = 'auto';
                    sessionStorage.setItem('introPlayed', 'true');
                    setTimeout(() => {
                        introOverlay.style.display = 'none';
                        if (particleContainer) particleContainer.innerHTML = '';
                    }, 1500);
                }, 300);
            }, 2200);
        };

        introVideo.onended = startGalaxyTransition;
        setTimeout(() => {
            if (body.classList.contains('intro-active')) startGalaxyTransition();
        }, 8000);

    } else {
        body.classList.remove('intro-active');
        body.style.overflow = 'auto';
        if (introOverlay) introOverlay.style.display = 'none';
        if (mainContent) {
            mainContent.style.opacity = '1';
            mainContent.style.pointerEvents = 'all';
        }
    }

    // --- 2. UPDATED NAV TOGGLE LOGIC ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const menuText = document.querySelector('.menu-text');
    const menuPill = document.querySelector('.menu-pill');
    const bars = document.querySelectorAll('.bar');
    const logoImg = document.querySelector('.logo img');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Toggle header transparency class if you are using it in CSS
            const header = document.querySelector('header');
            if(header) header.classList.toggle('menu-open');

            if (isActive) {
                // Switch elements to black for the cream background
                if (logoImg) logoImg.style.filter = "brightness(0)"; 
                if (menuPill) {
                    menuPill.style.backgroundColor = "rgba(0, 0, 0, 0.05)";
                    menuPill.style.borderColor = "#000000";
                }
                if (menuText) {
                    menuText.textContent = 'Close';
                    menuText.style.color = "#000000";
                }
                bars.forEach(b => b.style.backgroundColor = "#000000");
                body.style.overflow = "hidden"; 
            } else {
                // Restore white elements for the galaxy background
                if (logoImg) logoImg.style.filter = "none";
                if (menuPill) {
                    menuPill.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                    menuPill.style.borderColor = "rgba(255, 255, 255, 0.3)";
                }
                if (menuText) {
                    menuText.textContent = 'Menu';
                    menuText.style.color = "#ffffff";
                }
                bars.forEach(b => b.style.backgroundColor = "#ffffff");
                body.style.overflow = "auto";
            }
        });
    }

    // --- 3. SPONSOR CARDS HOVER ---
    document.querySelectorAll('.sponsor-card').forEach(card => {
        card.addEventListener('mouseenter', () => card.style.boxShadow = '0 0 20px rgba(255,255,255,0.2)');
        card.addEventListener('mouseleave', () => card.style.boxShadow = 'none');
    });

    // --- 4. 3D CAROUSEL LOGIC ---
    const carouselContainer = document.getElementById('carousel-container');
    if (carouselContainer) {
        const cards = Array.from(carouselContainer.querySelectorAll('.speaker-card'));
        const totalCards = cards.length;
        if (totalCards >= 1) {
            let currentIndex = 0;
            let autoPlayTimer = null;
            const updateCarousel = () => {
                cards.forEach(c => c.classList.remove('c-active', 'c-prev', 'c-next'));
                const prevIndex = (currentIndex - 1 + totalCards) % totalCards;
                const nextIndex = (currentIndex + 1) % totalCards;
                cards[currentIndex].classList.add('c-active');
                if (totalCards > 1) cards[prevIndex].classList.add('c-prev');
                if (totalCards > 2) cards[nextIndex].classList.add('c-next');
            };
            const startAutoPlay = () => {
                if (autoPlayTimer) clearInterval(autoPlayTimer);
                autoPlayTimer = setInterval(() => {
                    currentIndex = (currentIndex + 1) % totalCards;
                    updateCarousel();
                }, 3500);
            };
            carouselContainer.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
            carouselContainer.addEventListener('mouseleave', startAutoPlay);
            updateCarousel();
            startAutoPlay();
        }
    }
});