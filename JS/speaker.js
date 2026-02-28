// Ensure the script runs after the HTML is loaded
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const menuText = document.querySelector('.menu-text');
    const bars = document.querySelectorAll('.bar');

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