// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');

        // Close all open submenus when closing the nav
        if (!navMenu.classList.contains('active')) {
            document.querySelectorAll('.nav-item.active').forEach(item => {
                item.classList.remove('active');
            });
        }
    });
}

// Mobile Submenu Toggle — accordion style (one open at a time)
function toggleMobileSubmenu(element) {
    if (window.innerWidth <= 1024) {
        const parent = element.parentElement;
        const isActive = parent.classList.contains('active');

        // Close all other open submenus (accordion)
        document.querySelectorAll('.nav-item.active').forEach(item => {
            if (item !== parent) item.classList.remove('active');
        });

        // Toggle the tapped one
        parent.classList.toggle('active', !isActive);
    }
}

// Close mobile menu when tapping outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 1024 && navMenu && navMenu.classList.contains('active')) {
        const header = document.querySelector('header') || navMenu.closest('header');
        if (header && !header.contains(e.target)) {
            navMenu.classList.remove('active');
            document.querySelectorAll('.nav-item.active').forEach(item => item.classList.remove('active'));
            const icon = menuToggle && menuToggle.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        }
    }
});

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
