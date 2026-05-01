document.addEventListener('DOMContentLoaded', () => {
    console.log('This is fine. Loaded.');

    // Optional: Pause marquee on hover for better readability
    const marquee = document.querySelector('.marquee-content');
    if (marquee) {
        marquee.addEventListener('mouseenter', () => {
            marquee.style.animationPlayState = 'paused';
        });
        marquee.addEventListener('mouseleave', () => {
            marquee.style.animationPlayState = 'running';
        });
    }
    // Auto-duplicate carousel images to prevent black gaps on large screens
    const tracks = document.querySelectorAll('.carousel-track');
    tracks.forEach(track => {
        track.innerHTML = track.innerHTML.repeat(4);
    });

    // Scroll-triggered animations
    const observerOptions = {
        threshold: 0.2 // Trigger when 20% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            } else {
                // Se oculta de nuevo cuando sale de la pantalla
                entry.target.classList.remove('animate');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.title-img, .lore-card, .comic-img');
    animatedElements.forEach(el => observer.observe(el));

    // Smooth rotation for comic image on scroll
    window.addEventListener('scroll', () => {
        const comic = document.querySelector('.comic-img');
        if (comic && comic.classList.contains('animate')) {
            const rect = comic.getBoundingClientRect();
            const viewHeight = window.innerHeight;
            // Calculate rotation (-5 to 5 degrees) based on screen position
            const rotation = (rect.top - viewHeight / 2) * 0.015;
            comic.style.transform = `rotate(${rotation}deg)`;
        }
    });

    // Mobile Menu Toggle Logic
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked (useful for anchor links)
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
});
