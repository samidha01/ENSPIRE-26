console.log("Contact page loaded");

// --- MOBILE NAV TOGGLE ---
function toggleMenu() {
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) {
        mobileNav.classList.toggle('active');
    }
}
// --- END MOBILE NAV TOGGLE ---
document.addEventListener('DOMContentLoaded', () => {
    /* --- Hamburger Mobile Menu Logic --- */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        // Toggle menu when clicking hamburger
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('mobile-active');
        });

        // Close menu if clicking outside of it
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('mobile-active');
            }
        });
    }
});