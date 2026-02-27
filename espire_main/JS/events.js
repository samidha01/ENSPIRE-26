let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function changeSlide(n) {
    showSlides(slideIndex += n);
}

// Main logic to show the correct image
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("carousel-slide");

    // If we go past the last slide, go back to the first
    if (n > slides.length) { slideIndex = 1 }

    // If we go before the first slide, go to the last
    if (n < 1) { slideIndex = slides.length }

    // Hide all slides first
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Show the current slide
    slides[slideIndex - 1].style.display = "block";
}
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const menuText = document.querySelector('.menu-text');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            // Match the CSS .active class
            const isActive = navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            if (isActive) {
                if (menuText) {
                    menuText.textContent = 'Close';
                    menuText.style.color = "#ffffff"; 
                }
                document.body.style.overflow = 'hidden'; 
            } else {
                if (menuText) {
                    menuText.textContent = 'Menu';
                    menuText.style.color = "#ffffff";
                }
                document.body.style.overflow = 'auto';
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const mainBg = document.getElementById('main-bg');

    document.querySelectorAll('.event').forEach(event => {
        event.addEventListener('mouseenter', () => {
            const newImg = event.getAttribute('data-bg');

            // Show only the background photo
            if (mainBg && newImg) {
                mainBg.src = newImg;
                mainBg.style.opacity = "1";
            }
        });

        event.addEventListener('mouseleave', () => {
            // Hide the photo to reveal the base video
            if (mainBg) mainBg.style.opacity = "0";
        });
    });
});