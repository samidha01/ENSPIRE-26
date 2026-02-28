document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const menuText = document.querySelector('.menu-text');
    const bars = document.querySelectorAll('.bar');

    // --- 1. SPONSOR CARDS HOVER EFFECT ---
    document.querySelectorAll('.sponsor-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 0 20px rgba(255,255,255,0.2)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = 'none';
        });
    });

    // --- 2. Nav Toggle Logic ---
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');

            if (menuText) {
                if (isActive) {
                    menuText.textContent = 'Close';
                    menuText.style.color = "#ffffff";
                    menuText.style.opacity = "1";
                    document.body.style.overflow = "hidden";
                } else {
                    menuText.textContent = 'Menu';
                    menuText.style.color = "#ffffff";
                    menuText.style.opacity = "1";
                    document.body.style.overflow = "auto";
                }
            }

            // Ensure the hamburger bars also stay white
            bars.forEach(b => b.style.backgroundColor = "#ffffff");
        });

        // Close menu when a link is clicked
        const navLinks = document.querySelectorAll('#nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                if (menuText) menuText.textContent = 'Menu';
                document.body.style.overflow = "auto";
            });
        });
    }
});