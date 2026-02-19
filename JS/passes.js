document.querySelectorAll('.buy-now-trigger').forEach(button => {
    button.addEventListener('click', (e) => {
        // Find the title within the same card
        const passName = button.closest('.pass-card').querySelector('.pass-title').innerText;
        alert(`Redirecting to payment for ${passName}...`);
    });
});
// --- MOBILE NAV TOGGLE ---
function toggleMenu() {
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) {
        mobileNav.classList.toggle('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       2. BUTTON CLICK ANIMATION
       ========================================= */
    const buttons = document.querySelectorAll('.buy-now-trigger');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const originalText = btn.innerText;
            btn.innerText = "Processing...";
            btn.style.backgroundColor = "#fff";
            btn.style.color = "#000";

            setTimeout(() => {
                btn.innerText = "Redirecting...";
                // window.location.href = "register.html"; 
            }, 1000);

            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.backgroundColor = "";
                btn.style.color = "";
            }, 3000);
        });
    });

    /* =========================================
       3. HAMBURGER MENU
       ========================================= */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('mobile-active');
        });

        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('mobile-active');
            }
        });
    }
});
// --- END MOBILE NAV TOGGLE ---