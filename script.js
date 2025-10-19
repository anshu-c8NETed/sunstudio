// Initialize Locomotive Scroll with better mobile support
let scroll;

function initLocomotiveScroll() {
    // Destroy existing instance if any
    if (scroll) {
        scroll.destroy();
    }

    // Check if mobile
    const isMobile = window.innerWidth <= 768;

    scroll = new LocomotiveScroll({
        el: document.querySelector('#main'),
        smooth: !isMobile, // Disable smooth scroll on mobile
        lerp: 0.05,
        multiplier: 1,
        smoothMobile: false,
        smartphone: {
            smooth: false
        },
        tablet: {
            smooth: false
        },
        reloadOnContextChange: true
    });

    // Update scroll on resize
    scroll.on('scroll', () => {
        // Custom scroll events
    });

    // Force update after page load
    window.addEventListener('load', () => {
        scroll.update();
    });
}

// ==================== LOADER ANIMATION ====================
function loaderAnimation() {
    const loader = document.querySelector("#loader");
    setTimeout(function () {
        loader.style.top = "-100%";
    }, 4200);
}

// ==================== NAVBAR SCROLL EFFECT ====================
function navbarScrollEffect() {
    const nav = document.querySelector('nav');
    let lastScroll = 0;

    scroll.on('scroll', (args) => {
        if (args.scroll.y > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// ==================== MOBILE MENU ====================
function menuAnimation() {
    const menuToggle = document.querySelector("#menu-toggle");
    const mobileOverlay = document.querySelector("#mobile-menu-overlay");
    const mobileClose = document.querySelector("#mobile-close");
    const mobileLinks = document.querySelectorAll(".mobile-nav-link");
    const navLogo = document.querySelector(".nav-logo");

    let isMenuOpen = false;

    // Toggle menu
    menuToggle.addEventListener("click", function () {
        if (!isMenuOpen) {
            mobileOverlay.classList.add("active");
            navLogo.style.opacity = "0";
            isMenuOpen = true;
            document.body.style.overflow = "hidden";
        }
    });

    // Close menu
    mobileClose.addEventListener("click", function () {
        mobileOverlay.classList.remove("active");
        navLogo.style.opacity = "1";
        isMenuOpen = false;
        document.body.style.overflow = "auto";
    });

    // Close menu when link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener("click", function () {
            mobileOverlay.classList.remove("active");
            navLogo.style.opacity = "1";
            isMenuOpen = false;
            document.body.style.overflow = "auto";
        });
    });

    // Close menu on escape key
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && isMenuOpen) {
            mobileOverlay.classList.remove("active");
            navLogo.style.opacity = "1";
            isMenuOpen = false;
            document.body.style.overflow = "auto";
        }
    });
}

// ==================== PAGE 3 ANIMATION (WORK SECTION) ====================
function page4Animation() {
    const elemContainer = document.querySelector("#elem-container");
    const fixedImage = document.querySelector("#fixed-image");
    const elems = document.querySelectorAll(".elem");

    if (!elemContainer || !fixedImage) return;

    // Track mouse movement for image positioning
    elemContainer.addEventListener("mousemove", function (e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Position image to the right of cursor with offset
        fixedImage.style.left = mouseX + 150 + "px";
        fixedImage.style.top = mouseY + "px";
    });

    elemContainer.addEventListener("mouseenter", function () {
        fixedImage.style.display = "block";
    });

    elemContainer.addEventListener("mouseleave", function () {
        fixedImage.style.display = "none";
    });

    elems.forEach(function (elem) {
        elem.addEventListener("mouseenter", function () {
            const image = elem.getAttribute("data-image");
            fixedImage.style.backgroundImage = `url(${image})`;
        });
    });
}

// ==================== SWIPER ANIMATION ====================
function swiperAnimation() {
    const swiper = new Swiper(".mySwiper", {
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 100,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        breakpoints: {
            320: {
                spaceBetween: 20,
            },
            768: {
                spaceBetween: 50,
            },
            1024: {
                spaceBetween: 100,
            }
        }
    });
}

// ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
function smoothScrollLinks() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                scroll.scrollTo(targetElement);
            }
        });
    });
}

// ==================== PARALLAX EFFECT FOR HERO SHAPES ====================
function parallaxEffect() {
    const shapes = document.querySelectorAll('#hero-shape > div');
    
    scroll.on('scroll', (args) => {
        const scrollY = args.scroll.y;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.05;
            shape.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });
}

// ==================== ANIMATE ON SCROLL ====================
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Elements to animate
    const animatedElements = document.querySelectorAll('.elem, .swiper-slide, .footer-col');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// ==================== VIDEO PLAY ON SCROLL ====================
function videoPlayOnScroll() {
    const video = document.querySelector('#page1 video');
    
    if (video) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play();
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(video);
    }
}

// ==================== CURSOR EFFECT (Desktop Only) ====================
function customCursor() {
    if (window.innerWidth > 768) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animate() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(animate);
        }
        animate();

        // Add hover effects
        const hoverElements = document.querySelectorAll('a, button, .elem, .swiper-slide');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }
}

// Add cursor styles dynamically
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .custom-cursor {
        width: 20px;
        height: 20px;
        border: 2px solid #ff6b35;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease, opacity 0.2s ease;
        opacity: 0.6;
    }
    .custom-cursor.hover {
        transform: scale(1.5);
        opacity: 1;
        background: rgba(255, 107, 53, 0.1);
    }
`;
document.head.appendChild(cursorStyle);

// ==================== INITIALIZE ALL FUNCTIONS ====================
function init() {
    initLocomotiveScroll();
    loaderAnimation();
    navbarScrollEffect();
    menuAnimation();
    page4Animation();
    swiperAnimation();
    smoothScrollLinks();
    parallaxEffect();
    animateOnScroll();
    videoPlayOnScroll();
    customCursor();
}

// Run when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Reinitialize on window resize with debounce
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (scroll) {
            scroll.update();
        }
        // Reinit on significant resize (mobile/desktop switch)
        const currentWidth = window.innerWidth;
        if ((currentWidth <= 768 && !window.wasMobile) || (currentWidth > 768 && window.wasMobile)) {
            window.wasMobile = currentWidth <= 768;
            initLocomotiveScroll();
        }
    }, 250);
});

// Track if mobile
window.wasMobile = window.innerWidth <= 768;