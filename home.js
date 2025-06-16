// Animasi teks dengan GSAP
document.addEventListener('DOMContentLoaded', () => {
  // Animasi untuk konten
  gsap.from("h1", { opacity: 0, y: -50, duration: 1.3 });
  gsap.from("nav", { opacity: 0, y: -50, duration: 1.3, delay: 0.5 });
  gsap.from("main", { opacity: 0, y: -50, duration: 1.3, delay: 0.5 });


  // Animasi overlay loading
  const overlay = document.getElementById("overlay");
  overlay.style.display = "block";
  gsap.to(overlay, {
    opacity: 0,
    duration: 1,
    onComplete: () => {
      overlay.style.display = "none";
    },
  });

  // Setup parallax effect
  const background = document.getElementById('background');
  const container = document.querySelector('.parallax-container');
  
  // Batasan pergerakan background (dalam persen)
  const moveLimit = 8;
  
  // Fungsi untuk menggerakkan background berdasarkan posisi kursor
  function moveBackground(e) {
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    // Posisi relatif kursor dalam container (antara 0 dan 1)
    const xPos = e.clientX / containerWidth;
    const yPos = e.clientY / containerHeight;
    
    // Kalkulasi pergeseran background (dalam persen)
    const xShift = moveLimit * (0.5 - xPos);
    const yShift = moveLimit * (0.5 - yPos);
    
    // Terapkan transformasi pada background dengan easing
    gsap.to(background, {
      duration: 0.3,
      x: xShift + '%',
      y: yShift + '%',
      ease: "power1.out"
    });
  }
  
  // Tambahkan event listener untuk pergerakan mouse
  document.addEventListener('mousemove', moveBackground);
  
  // Untuk perangkat sentuh
  document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      moveBackground({
        clientX: e.touches[0].clientX,
        clientY: e.touches[0].clientY
      });
    }
  }, { passive: true });
  
  // Reset posisi background saat halaman dikunjungi pertama kali
  gsap.set(background, { x: '0%', y: '0%' });
});



