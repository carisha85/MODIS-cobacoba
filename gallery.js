// Animasi teks dengan GSAP
    gsap.from("body", { opacity: 0, y: -50, duration: 1.3 });

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

    // Scroll Arrow Functionality (Hero to Gallery)
    const scrollArrow = document.getElementById('scrollArrow');
    const gallerySection = document.getElementById('gallery');

    scrollArrow.addEventListener('click', () => {
      gallerySection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });

    // Gallery Scroll Arrow Functionality (Gallery to Team)
    const galleryScrollArrow = document.getElementById('galleryScrollArrow');
    const teamSection = document.getElementById('team');

    galleryScrollArrow.addEventListener('click', () => {
      teamSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });

    // Slideshow Functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;

    // Show specific slide
    function showSlide(index) {
      // Hide all slides
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      // Show current slide
      slides[index].classList.add('active');
      dots[index].classList.add('active');
    }

    // Next slide
    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      showSlide(currentSlide);
    }

    // Previous slide
    function prevSlide() {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      showSlide(currentSlide);
    }

    // Event listeners for buttons
    document.getElementById('nextBtn').addEventListener('click', nextSlide);
    document.getElementById('prevBtn').addEventListener('click', prevSlide);

    // Event listeners for dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
      });
    });

    // Auto-slide functionality
    let autoSlideInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds

    // Pause auto-slide on hover
    const slideshowContainer = document.querySelector('.slideshow-container');
    slideshowContainer.addEventListener('mouseenter', () => {
      clearInterval(autoSlideInterval);
    });

    slideshowContainer.addEventListener('mouseleave', () => {
      autoSlideInterval = setInterval(nextSlide, 4000);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    });

    // Touch/swipe functionality for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    slideshowContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    slideshowContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          nextSlide(); // Swipe left - next slide
        } else {
          prevSlide(); // Swipe right - previous slide
        }
      }
    }

    // Team Section Animation on Scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          
          // Delay animations for staggered effect
          setTimeout(() => {
            target.classList.add('animate');
          }, target.id === 'supervisorCard' ? 200 : 
             target.id === 'leaderCard' ? 400 : 
             target.id === 'member1' ? 600 :
             target.id === 'member2' ? 800 :
             target.id === 'member3' ? 1000 : 1200);
        }
      });
    }, observerOptions);

    // Observe all team cards
    const teamCards = document.querySelectorAll('.supervisor-card, .leader-card, .member-card');
    teamCards.forEach(card => {
      observer.observe(card);
    });

    // GSAP Animations for Team Section
    gsap.registerPlugin(ScrollTrigger);

    // Team title animation
    gsap.from('.team-title h2', {
      scrollTrigger: {
        trigger: '.team-title',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power2.out'
    });

    gsap.from('.team-title p', {
      scrollTrigger: {
        trigger: '.team-title',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.3,
      ease: 'power2.out'
    });

    // Additional hover effects with GSAP
    teamCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    // Parallax effect for team section
    gsap.to('.team-section', {
      scrollTrigger: {
        trigger: '.team-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      },
      backgroundPosition: '50% 100%',
      ease: 'none'
    });