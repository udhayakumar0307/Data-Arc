// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// Mobile Submenu Toggle
function toggleMobileSubmenu(element) {
    if (window.innerWidth <= 1024) {
        const parent = element.parentElement;
        const isActive = parent.classList.contains('active');

        // Close all other open submenus
        document.querySelectorAll('.nav-item.active').forEach(item => {
            if (item !== parent) {
                item.classList.remove('active');
            }
        });

        // Toggle the clicked one
        parent.classList.toggle('active', !isActive);
    }
}

// Video Control - Play once, stop on scroll, restart on top
const homeVideo = document.querySelector('.video-bg video');
let hasPlayed = false;
let isAtTop = true;

if (homeVideo) {
    // Play video once
    homeVideo.play();
    
    homeVideo.addEventListener('ended', () => {
        hasPlayed = true;
        homeVideo.pause();
    });

    // Handle scroll behavior
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        if (scrollPosition < 100) {
            // At top of page
            if (!isAtTop) {
                isAtTop = true;
                homeVideo.currentTime = 0;
                homeVideo.play();
                hasPlayed = false;
            }
        } else {
            // Scrolled down
            if (isAtTop) {
                isAtTop = false;
                homeVideo.pause();
            }
        }
    });
}

// Scroll Reveal Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
