document.addEventListener('DOMContentLoaded', () => {

    /* --- Hamburger --- */
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

    /* --- FAQ Toggle --- */
    const questions = document.querySelectorAll('.faq-question');

    questions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;

            // Optional: Close others (Accordion effect)
            // document.querySelectorAll('.faq-item').forEach(item => {
            //     if(item !== faqItem) item.classList.remove('active');
            // });

            faqItem.classList.toggle('active');
        });
    });

    /* --- Category Filter --- */
    const filterButtons = document.querySelectorAll('.cat-btn');
    const faqItems = document.querySelectorAll('.faq-item');

    function showItems(category) {
        faqItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            if (category === 'all' || itemCategory === category) {
                item.style.display = 'block';
                // Reset animation
                item.style.animation = 'none';
                item.offsetHeight; /* trigger reflow */
                item.style.animation = 'slideDown 0.5s ease forwards';
            } else {
                item.style.display = 'none';
            }
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');

            if (button.classList.contains('active-btn')) {
                button.classList.remove('active-btn');
                showItems('all');
            } else {
                filterButtons.forEach(btn => btn.classList.remove('active-btn'));
                button.classList.add('active-btn');
                showItems(category);
            }
        });
    });
});