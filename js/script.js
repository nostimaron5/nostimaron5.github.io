document.addEventListener('DOMContentLoaded', () => {
    console.log('This is fine. Loaded.');

    // Cache elements
    const marquee = document.querySelector('.marquee-content');
    const tracks = document.querySelectorAll('.carousel-track');
    const comic = document.querySelector('.comic-img');
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const animatedElements = document.querySelectorAll('.title-img, .lore-card, .comic-img');

    // Pause marquee on hover
    if (marquee) {
        marquee.addEventListener('mouseenter', () => marquee.style.animationPlayState = 'paused');
        marquee.addEventListener('mouseleave', () => marquee.style.animationPlayState = 'running');
    }

    // Auto-duplicate carousel images for seamless loop
    // HTML already contains 2 sets, repeating once more (total 4) ensures no gaps on ultra-wide screens
    tracks.forEach(track => {
        if (track.children.length > 0) {
            track.innerHTML = track.innerHTML.repeat(2);
        }
    });

    // Scroll-triggered animations (One-shot for a cleaner feel)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // Trigger only once
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));

    // Optimized scroll rotation for comic image
    let isTicking = false;
    window.addEventListener('scroll', () => {
        if (!comic || !comic.classList.contains('animate')) return;

        if (!isTicking) {
            window.requestAnimationFrame(() => {
                const rect = comic.getBoundingClientRect();
                const viewHeight = window.innerHeight;
                
                // Only calculate if visible
                if (rect.top < viewHeight && rect.bottom > 0) {
                    const rotation = (rect.top - viewHeight / 2) * 0.015;
                    comic.style.transform = `rotate(${rotation}deg)`;
                }
                isTicking = false;
            });
            isTicking = true;
        }
    }, { passive: true });

    // Mobile Menu Toggle Logic
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
});
