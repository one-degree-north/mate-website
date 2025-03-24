// Initialize GSAP
// Intro Animation Timeline
const introTL = gsap.timeline();


introTL
    .to(".intro-circle", {
        scale: 1,
        duration: 1,
        ease: "power2.out"
    })
    .to(".intro-text", {
        opacity: 1,
        y: 0,
        duration: 0.5
    })
    .to(".intro-circle", {
        scale: 1.5,
        opacity: 0,
        duration: 0.5,
        delay: 0.5
    })
    .to(".intro-text", {
        opacity: 0,
        y: -20,
        duration: 0.5
    }, "<")
    .to(".intro-overlay", {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
            document.querySelector('.intro-overlay').style.display = 'none';
        }
    })
    .from(".nav", {
        opacity: 0,
        y: -20,
        duration: 0.5
    })
    .to(".hero-content", {
        opacity: 1,
        duration: 1
    })
    .to(".bubble", {
        opacity: 1,
        duration: 0.5,
        stagger: 0.1
    });
gsap.registerPlugin(ScrollTrigger);

// Animate hero content
gsap.to("h1", {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.5
});

gsap.to(".subtitle", {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.7
});

gsap.to(".cta-button", {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.9
});

// Animate sections on scroll
gsap.utils.toArray(".section").forEach(section => {
    gsap.to(section, {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            start: "top 80%"
        }
    });
});

// Create floating bubbles
function createBubbles() {
    const hero = document.querySelector('.hero');
    for (let i = 0; i < 10; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.style.width = Math.random() * 40 + 20 + 'px'; // Smaller bubbles
        bubble.style.height = bubble.style.width;
        bubble.style.left = Math.random() * 100 + 'vw';
        bubble.style.top = Math.random() * 100 + 'vh';
        bubble.style.animationDelay = Math.random() * 5 + 's';
        hero.appendChild(bubble);
    }
}

createBubbles();

// Custom cursor and ripple effect
const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    document.body.appendChild(ripple);

    ripple.addEventListener('animationend', () => {
        ripple.remove();
    });
});

// Progress bar
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrolled / max) * 100;
    document.querySelector('.progress-bar').style.width = progress + '%';
});

// Animation for intro sequence
// Animation for intro sequence
const tl = gsap.timeline();

tl.to(".intro-circle", {
    duration: 0.8,
    scale: 1,
    ease: "power2.out" // Changed from elastic to a more professional easing
})
.to(".intro-text", {
    duration: 0.6,
    opacity: 1,
    y: 0,
    ease: "power2.out"
}, "-=0.3")
.to([".intro-circle", ".intro-text"], {
    duration: 0.7,
    scale: 1.1,
    opacity: 0,
    ease: "power2.in",
    stagger: 0.1
}, "+=1.2")
.to(".intro-overlay", {
    duration: 0.8,
    opacity: 0,
    ease: "power2.inOut",
    onComplete: function() {
        document.querySelector(".intro-overlay").style.display = "none";
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Prevent scrolling when menu is open
    document.body.classList.toggle('menu-open');
});

// Close menu when a nav link is clicked
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const depths = ["100m", "150m", "200m"]; // Example depths
    const historyCards = document.querySelectorAll('.history-card');

    historyCards.forEach((card, index) => {
        card.setAttribute('data-depth', depths[index]);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const historyContainer = document.querySelector(".history-container");
    const historyCards = document.querySelectorAll(".history-card");
    const historyLine = document.createElement("div");
    historyLine.style.height = "0px"; // Set initial height to 0

    // historyLine.classList.add("history-line");
    historyContainer.appendChild(historyLine);

    // Position the vertical line to the left of the first history card
    if (historyCards.length > 0) {
        const cardLeft = historyCards[0].offsetLeft;
        historyLine.style.left = `${cardLeft - 130}px`; // Adjust spacing
    }

    // Match height of container
    historyLine.style.height = `${historyContainer.offsetHeight} - 3284 px`;

    // Add horizontal lines dynamically
    const totalHeight = historyContainer.offsetHeight;
    for (let i = 0; i < totalHeight; i += 50) { // Step every 10px
        let depthLine = document.createElement("div");
        depthLine.classList.add("history-depth-line");

        // Make every 5th line thicker and brighter
        if (i % 250 === 0) {
            depthLine.classList.add("bold-depth-line");
            
            // Add metric depth label every 50m
            let depthLabel = document.createElement("span");
            depthLabel.classList.add("depth-label");
            depthLabel.textContent = `${i / 10 * 10}m`; // Convert steps to metric depth
            depthLabel.style.top = `${i}px`;
            depthLabel.style.left = `${parseInt(historyLine.style.left) + 30}px`; // Position text to the right of depth line
            historyContainer.appendChild(depthLabel);
        }

        depthLine.style.left = historyLine.style.left; // Align with vertical line
        depthLine.style.top = `${i}px`; // Position each line
        historyContainer.appendChild(depthLine);
    }
});