// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Parallax background effect
window.addEventListener('scroll', () => {
    const bg = document.querySelector('.sample-bg');
    const scrollY = window.scrollY;
    const speed = 0.5;
    bg.style.transform = `translateY(${scrollY * speed}px)`;
});

// Animasi teks dengan GSAP
gsap.from("h1", { opacity: 0, y: -50, duration: 1.3 });
gsap.from("nav", { opacity: 0, y: -50, duration: 1.3 });

// Animasi untuk 3 aspek section
gsap.timeline({
    scrollTrigger: {
        trigger: ".three-aspects-section",
        start: "top 80%",
        end: "center center",
        toggleActions: "play none none reverse"
    }
})
.to(".arrow-1", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "bounce.out"
})
.to(".arrow-2", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "bounce.out"
}, "-=0.6")
.to(".arrow-3", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "bounce.out"
}, "-=0.6")
.to(".kognitif", {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out"
}, "-=0.3")
.to(".afektif", {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out"
}, "-=0.8")
.to(".perilaku", {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out"
}, "-=0.8");

// Animasi hover untuk aspect icons
document.querySelectorAll('.aspect-icon').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        gsap.to(icon, {
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    icon.addEventListener('mouseleave', () => {
        gsap.to(icon, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

window.addEventListener("load", () => {
    const overlay = document.getElementById("overlay");
    if (overlay) {
        overlay.style.display = "block";
        gsap.to(overlay, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                overlay.style.display = "none";
            },
        });
    }
});



      function scrollToCs() {
        document.getElementById('3aspek-section').scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }