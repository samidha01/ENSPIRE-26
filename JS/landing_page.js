document.addEventListener('DOMContentLoaded', () => {
    const introOverlay = document.getElementById('intro-overlay');
    const introVideo = document.getElementById('intro-video');
    const mainContent = document.getElementById('main-content');
    const body = document.body;
    const particleContainer = document.getElementById('dust-particles');

    // --- 1. INTRO VIDEO LOGIC ---
    if (introVideo && introOverlay) {
        // Lock scrolling during intro
        body.classList.add('intro-active');

        // Attempt to play
        introVideo.play().catch(() => {
            introVideo.muted = true;
            introVideo.play();
        });

        // The master function to run when the video ends
        const startGalaxyTransition = () => {
            introVideo.classList.add('dust-effect');

            // --- FALLING INTO GALAXY EFFECT ---
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

                    const speed = 2 + Math.random() * 2;
                    star.style.animationDuration = speed + 's';
                    star.style.animationDelay = (Math.random() * 1) + 's';

                    particleContainer.appendChild(star);
                }
            }

            // Trigger website reveal
            setTimeout(() => {
                introOverlay.classList.add('galaxy-arrival');

                setTimeout(() => {
                    introOverlay.style.opacity = '0';
                    mainContent.classList.add('main-content-visible');
                    mainContent.style.opacity = '1';
                    mainContent.style.pointerEvents = 'all';
                    
                    // CRITICAL FIX: Unlock the scrolling!
                    body.classList.remove('intro-active');
                    body.style.overflow = 'auto'; // Failsafe

                    setTimeout(() => {
                        introOverlay.style.display = 'none';
                        if (particleContainer) particleContainer.innerHTML = '';
                    }, 1500);
                }, 300);
            }, 2200); 
        };

        // Trigger transition when video naturally ends
        introVideo.onended = startGalaxyTransition;

        // Safety timeout (in case the video gets stuck or blocked by browser policies)
        setTimeout(() => {
            if (body.classList.contains('intro-active')) {
                startGalaxyTransition();
            }
        }, 8000); // Wait max 8 seconds

    } else {
        // Fallback if elements are missing: unlock immediately
        body.classList.remove('intro-active');
        body.style.overflow = 'auto';
        if (mainContent) {
            mainContent.style.opacity = '1';
            mainContent.style.pointerEvents = 'all';
        }
    }

    // --- 2. MOBILE NAV TOGGLE ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // --- 3. SPONSOR CARDS HOVER EFFECT ---
    document.querySelectorAll('.sponsor-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 0 20px rgba(255,255,255,0.2)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = 'none';
        });
    });

    // --- 4. 3D CAROUSEL LOGIC ---
    const carouselContainer = document.querySelector('.carousel-container');

    if (carouselContainer) {
        const cards = Array.from(carouselContainer.querySelectorAll('.speaker-card'));
        const totalCards = cards.length;

        if (totalCards >= 3) {
            let currentIndex = 1;

            function updateCarousel() {
                cards.forEach(card => {
                    card.classList.remove('c-active', 'c-prev', 'c-next');
                });

                const prevIndex = (currentIndex - 1 + totalCards) % totalCards;
                const nextIndex = (currentIndex + 1) % totalCards;

                cards[currentIndex].classList.add('c-active');
                cards[prevIndex].classList.add('c-prev');
                cards[nextIndex].classList.add('c-next');

                currentIndex = (currentIndex + 1) % totalCards;
            }

            updateCarousel();
            setInterval(updateCarousel, 3000);
        }
    }
});