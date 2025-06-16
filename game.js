// GSAP Animation
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

// Scroll to Game Function
window.scrollToGame = function() {
  document.getElementById('gameSection').scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

// Game Logic
let playerChoices = [];
let totalScore = 0;

// Scoring system
const scoreMap = {
  'A1': 100,
  'A2': 80,
  'B1': 30,
  'B2': 30
};

const confirmBtn = document.getElementById("confirm-btn");
const usernameInput = document.getElementById("username");
const welcomeSection = document.getElementById("welcome-section");
const welcomeMessage = document.getElementById("welcome-message");
const nameInputSection = document.getElementById("greet-section");
const startBtn = document.getElementById("start-btn");
const sceneSection = document.getElementById("sceneSection");
const sceneText = document.getElementById("sceneText");
const optionsContainer = document.getElementById("optionsContainer");
const scoreSection = document = document.getElementById("score-section");
const scoreBtn = document.getElementById("score-btn");
const scoreDisplay = document.getElementById("score-display");
const scoreText = document.getElementById("score-text");
const playAgainBtn = document.getElementById("play-again-btn");
const comicPanels = document.getElementById("comicPanels");

// Confirm name input
confirmBtn.addEventListener("click", () => {
  const name = usernameInput.value.trim();
  if (name) {
    nameInputSection.style.display = "none";
    welcomeSection.style.display = "block";
    welcomeMessage.innerHTML = `Welcome, <em>${name}</em>. Click to start the game.`;
  } else {
    alert("Please enter your name.");
  }
});

// Start game
startBtn.addEventListener("click", () => {
  startGame();
});

// Function untuk memulai/restart game
function startGame() {
  playerChoices = ["start"];
  totalScore = 0;
  welcomeSection.style.display = "none";
  sceneSection.style.display = "flex";
  scoreSection.style.display = "none";
  scoreDisplay.style.display = "none";
  playAgainBtn.style.display = "none";
  showScene("start");
}

// Show score button and calculate total
function showScoreButton() {
  console.log("showScoreButton called"); // Debug log
  scoreSection.style.display = "block";

  // Remove existing event listener if any, then add a new one
  scoreBtn.removeEventListener("click", calculateAndDisplayScore);
  scoreBtn.addEventListener("click", calculateAndDisplayScore);

  if (playAgainBtn) {
    playAgainBtn.removeEventListener("click", restartGameFromWelcome);
    playAgainBtn.addEventListener("click", restartGameFromWelcome);
  }

  // Add animation for score button appearance
  gsap.from(scoreSection, {
    opacity: 0,
    y: 20,
    duration: 0.5,
    ease: "back.out(1.7)"
  });
}

function calculateAndDisplayScore() {
  console.log("calculateAndDisplayScore called"); // Debug log
  console.log("Player choices:", playerChoices); // Debug log

  totalScore = 0;
  playerChoices.forEach(choice => {
    if (scoreMap[choice]) {
      totalScore += scoreMap[choice];
      console.log(`Adding ${scoreMap[choice]} for choice ${choice}`); // Debug log
    }
  });

  console.log("Total score:", totalScore); // Debug log

  scoreDisplay.style.display = "block";
  scoreText.innerHTML = `Skor MODIS Kamu: ${totalScore}`;

  if (playAgainBtn) {
    playAgainBtn.style.display = "block";
  }

  gsap.from(scoreDisplay, {
    opacity: 0,
    scale: 0.8,
    duration: 0.5,
    ease: "back.out(1.7)"
  });

  if (playAgainBtn) {
    gsap.from(playAgainBtn, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      delay: 0.3,
      ease: "back.out(1.7)"
    });
  }
}

function restartGameFromWelcome() {
  sceneSection.style.display = "none";
  scoreSection.style.display = "none";
  scoreDisplay.style.display = "none";
  playAgainBtn.style.display = "none";
  welcomeSection.style.display = "block";

  gsap.from(welcomeSection, {
    opacity: 0,
    duration: 0.5
  });
}

// Create comic panels with typing animation
function createComicPanels(panels) {
  comicPanels.innerHTML = '';
  comicPanels.style.display = 'grid';

  // Hide all options when comic panels start
  const allOptions = optionsContainer.querySelectorAll('button');
  allOptions.forEach(button => {
    if (button.textContent === "Lanjut ke cerita berikutnya") {
      button.style.display = 'none';
    }
  });

  panels.forEach((panel, index) => {
    const panelDiv = document.createElement('div');
    panelDiv.className = 'comic-panel';

    const imageDiv = document.createElement('div');
    imageDiv.className = 'comic-panel-image';
    imageDiv.style.backgroundImage = `url(${panel.image})`;

    const textDiv = document.createElement('div');
    textDiv.className = 'comic-panel-text';
    textDiv.textContent = '';
    textDiv.setAttribute('data-full-text', panel.text);

    panelDiv.appendChild(imageDiv);
    panelDiv.appendChild(textDiv);
    comicPanels.appendChild(panelDiv);
  });

  showComicPanelSequentially(0, panels.length);
}

// Function to show comic panels sequentially with typing animation
function showComicPanelSequentially(currentIndex, totalPanels) {
  if (currentIndex >= totalPanels) {
    setTimeout(() => {
      const lastChoice = playerChoices[playerChoices.length - 1];
      const currentScene = scenes[lastChoice];
      showComicPanelOptions(currentScene); // Now show options after all panels

      // Show "Lanjut ke cerita berikutnya" button if it exists after panels finish
      const nextPlotButton = optionsContainer.querySelector('button[data-next-plot="true"]');
      if (nextPlotButton) {
        gsap.to(nextPlotButton, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          delay: 0.2,
          onComplete: () => {
            nextPlotButton.style.display = 'block';
          }
        });
      }
    }, 500);
    return;
  }

  const panels = comicPanels.children;
  const currentPanel = panels[currentIndex];
  const textDiv = currentPanel.querySelector('.comic-panel-text');
  const fullText = textDiv.getAttribute('data-full-text');

  currentPanel.classList.add('show');

  setTimeout(() => {
    typeComicPanelText(textDiv, fullText, () => {
      setTimeout(() => {
        showComicPanelSequentially(currentIndex + 1, totalPanels);
      }, 800);
    });
  }, 300);
}

// Function to type text in comic panel
function typeComicPanelText(element, text, callback) {
  let i = 0;
  element.textContent = "";

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, 40);
    } else {
      if (callback) callback();
    }
  }
  type();
}

// Function to show options after all comic panels are displayed
function showComicPanelOptions(scene) {
  console.log("showComicPanelOptions called with scene:", scene); // Debug log

  optionsContainer.innerHTML = "";

  // Check if scene exists and has options
  if (scene && scene.options && scene.options.length > 0) {
    scene.options.forEach((option, index) => {
      const btn = document.createElement("button");
      btn.textContent = option.text;
      btn.onclick = () => {
        playerChoices.push(option.next);
        console.log("Player chose:", option.next); // Debug log
        showScene(option.next);
      };
      btn.style.opacity = 0;
      btn.style.transform = "translateY(10px)";
      optionsContainer.appendChild(btn);

      // Add a data attribute to easily identify "Lanjut ke cerita berikutnya" buttons
      if (option.text === "Lanjut ke cerita berikutnya") {
        btn.setAttribute('data-next-plot', 'true');
        btn.style.display = 'none'; // Initially hide it
      }

      gsap.to(btn, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        delay: 0.2 + index * 0.2,
        onComplete: () => {
          if (option.text !== "Lanjut ke cerita berikutnya") {
            btn.style.display = 'block'; // Make regular buttons visible
          }
        }
      });
    });
  } else {
    // This is the end of the game - show score button
    console.log("Game ended, showing score button"); // Debug log
    showScoreButton();
  }
}

// Show scene function - MODIFIED
function showScene(key) {
  console.log("showScene called with key:", key); // Debug log

  const scene = scenes[key];

  if (!scene) {
    console.error("Scene not found:", key);
    return;
  }

  const textElement = sceneText;
  const imageElement = document.getElementById("sceneImage");

  // Hide comic panels and options container initially (or specifically next plot buttons)
  comicPanels.style.display = 'none';
  optionsContainer.innerHTML = ''; // Clear options when a new scene loads

  // Check if scene has comic panels
  if (scene.comicPanels) {
    createComicPanels(scene.comicPanels);
    textElement.style.display = 'none';
    imageElement.style.display = 'none';
  } else {
    // Regular scene display
    textElement.style.display = 'block';

    if (scene.image) {
      imageElement.src = scene.image;
      imageElement.style.display = "block";
      void imageElement.offsetWidth;
      imageElement.style.opacity = "1";
    } else {
      imageElement.style.opacity = "0";
      setTimeout(() => {
        imageElement.style.display = "none";
      }, 500);
    }

    gsap.to(textElement, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        typeText(textElement, scene.text, () => {
          // Check if scene has options
          if (scene.options && scene.options.length > 0) {
            scene.options.forEach((option, index) => {
              const btn = document.createElement("button");
              btn.textContent = option.text;
              btn.onclick = () => {
                playerChoices.push(option.next);
                console.log("Player chose:", option.next); // Debug log
                showScene(option.next);
              };
              btn.style.opacity = 0;
              btn.style.transform = "translateY(10px)";
              optionsContainer.appendChild(btn);

              // Add a data attribute to easily identify "Lanjut ke cerita berikutnya" buttons
              if (option.text === "Lanjut ke cerita berikutnya") {
                btn.setAttribute('data-next-plot', 'true');
                btn.style.display = 'none'; // Initially hide it
              }

              gsap.to(btn, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                delay: 0.2 + index * 0.2,
                onComplete: () => {
                  if (option.text !== "Lanjut ke cerita berikutnya") {
                    btn.style.display = 'block'; // Make regular buttons visible
                  } else if (!scene.comicPanels) { // If it's a regular scene with "Lanjut ke cerita berikutnya"
                    btn.style.display = 'block'; // Show it immediately if not a comic panel scene
                  }
                }
              });
            });
          } else {
            // This is the end of the game - show score button
            console.log("Game ended, showing score button"); // Debug log
            showScoreButton();
          }
        });
      }
    });
  }
}

// Type text animation
function typeText(element, text, callback) {
  let i = 0;
  element.innerHTML = "";
  element.style.opacity = 1;

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, 30);
    } else {
      if (callback) callback();
    }
  }
  type();
}

// SCENES DATA - Fixed missing closing brace
// SCENES DATA - Updated with comic panels for additional plots
const scenes = {
  start: {
    comicPanels: [{
        image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
        text: 'Langit sore mulai berubah jingga ketika aku berjalan pulang melewati trotoar yang ramai. Di depanku, seorang pria baru saja turun dari mobil dan berjalan tergesa-gesa, seolah sedang mengejar orang didepannya. Tanpa dia sadari, sesuatu terjatuh dari sakunya dan mendarat di trotoar, barang tersebut adalah dompet kulit berwarna coklat.'
      },
      {
        image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop',
        text: 'Aku berhenti sejenak, memperhatikan dompet itu yang tergeletak begitu saja di antara langkah kaki orang-orang yang berlalu-lalang tanpa menyadari kehadiranku. Pria itu terus melangkah, semakin jauh, tak menyadari kehilangan yang baru saja terjadi.'
      },
      {
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
        text: 'Aku menelan ludah. Tak ada yang memperhatikan. Jika aku mengambilnya, tidak ada yang akan tahu. Tapi… aku juga bisa memanggilnya dan mengembalikannya karena ia juga belum jauh.'
      },
      {
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit:crop',
        text: 'Aku berhenti sejenak, memperhatikan dompet itu yang tergeletak begitu saja. Pilihan ada di tanganku.'
      }
    ],
    options: [
      { text: "Aku memanggilnya dan mengembalikan dompet", next: "A" },
      { text: "Aku mengambil dompet dan menyimpannya", next: "B" }
    ]
  },
  A: {
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop',
    text: 'Aku berlari mengejar orang itu dan menyerahkan dompetnya. Dia tampak terkejut, lalu tersenyum lega.',
    options: [
      { text: "Dia berterima kasih dan menawarkan uang", next: "A1" },
      { text: "Aku menerima uang dan menambah sedikit drama", next: "A2" }
    ]
  },
  A1: {
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    text: "Dia berterima kasih dan menawarkan uang. Aku menolak, merasa cukup puas telah berbuat baik.",
    options: [{ text: "Lanjut ke cerita berikutnya", next: "plot2" }]
  },
  A2: {
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    text: "Aku menerima uangnya, lalu menambahkan sedikit drama. 'Sebenarnya, aku ragu mengembalikannya. Takut dikira mencuri tapi bayangin kalau aku kehilangan dompet, mungkin uang buat makan hari ini ilang semua,' kataku pelan. Wajahnya berubah bersalah, lalu dia menambah uang yang diberikannya. Aku tersenyum kecil. Aku tidak berbohong… hanya memilih kata yang tepat.",
    options: [{ text: "Lanjut ke cerita berikutnya", next: "plot2" }]
  },
  B: {
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    text: "Aku memasukkan dompet ke dalam tasku dan berjalan cepat. Aku ragu, tapi aku juga tidak bisa mengembalikannya sekarang.",
    options: [
      { text: "Aku mengambil uangnya lalu membuang dompet itu di tempat sepi", next: "B1" },
      { text: "Aku merobek kartu identitasnya dan membuang dompet ke selokan", next: "B2" }
    ]
  },
  B1: {
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
    text: "Aku merasa sedikit bersalah, tapi meyakinkan diri bahwa orang lain pasti juga akan melakukan hal yang sama. Bukan mencuri, hanya kebetulan yang menguntungkan.",
    options: [{ text: "Lanjut ke cerita berikutnya", next: "plot2" }]
  },
  B2: {
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    text: "Kalau aku tidak tahu siapa pemiliknya, aku tidak perlu merasa bersalah. Lagipula, ini salahnya sendiri karena ceroboh. Aku melanjutkan langkah. Entah mengapa, merasa sedikit puas.",
    options: [{ text: "Lanjut ke cerita berikutnya", next: "plot2" }]
  },
  plot2: {
    comicPanels: [{
        image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop',
        text: 'Aku sedang bosan di kelas ketika jam kosong tiba. Suasana kelas yang sepi membuat aku mengantuk, hanya ada beberapa teman yang masih tertinggal di kelas.'
      },
      {
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=600&fit=crop',
        text: 'Aku melihat HP Alif tergeletak di atas mejanya tanpa pemiliknya. Tiba-tiba ponsel itu bergetar, menandakan ada pesan masuk.'
      },
      {
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit:crop',
        text: 'Aku tidak sengaja melihat layar yang menyala. Sebuah chat masuk dari kontak bernama "Alifa" dengan pesan: "Kangen banget, kapan kita ketemu lagi?"'
      },
      {
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit:crop',
        text: 'Tunggu... Ini bukan Sinta, pacarnya Alif. Aku tahu nama Sinta di HP Alif bukan itu. Jantungku berdebar. Pilihan ada di tanganku.'
      }
    ],
    options: [
      { text: "Aku mengabaikannya", next: "C" },
      { text: "Aku menyebarkannya", next: "D" }
    ]
  },
  C: {
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    text: "Aku menarik napas panjang dan memalingkan wajah. Ini bukan urusanku dan aku tidak ingin menghancurkan hubungan siapapun.",
    options: [
      { text: "Aku tetap diam dan mengabaikannya", next: "C1" },
      { text: "Aku memberi sedikit kode ke Sinta", next: "C2" }
    ]
  },
  C1: {
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit:crop',
    text: "Aku tetap diam dan mengabaikannya. Beberapa hari kemudian, aku melihat Alif dan Sinta masih baik-baik saja. Aku merasa lega karena tidak ikut campur dalam urusan orang lain.",
    options: [{ text: "Lanjut ke cerita berikutnya", next: "plot3" }]
  },
  C2: {
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit:crop',
    text: "Aku memberi sedikit kode ke Sinta tanpa menyebutkan yang sebenarnya. Aku tidak tega melihat Sinta dibohongi, tapi aku juga tidak mau ikut campur terlalu jauh.",
    options: [{ text: "Lanjut ke cerita berikutnya", next: "plot3" }]
  },
  D: {
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit:crop',
    text: "Aku menatap HP Alif yang masih tergeletak. Aku menggigit bibir. Ini bisa jadi sesuatu yang menarik.",
    options: [
      { text: "Aku menyebarkannya ke teman dekat ku, Dinda", next: "D1" },
      { text: "Aku akan mengambil keuntungan dari Alif", next: "D2" }
    ]
  },
  D1: {
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit:crop',
    text: 'Aku mendekati Dinda dan berbisik, "Eh, lo tau gak? Aku gak sengaja liat chat di HP Alif, kayaknya dia selingkuh." Gosip ini menyebar ke hampir seluruh kelas.',
    options: [{ text: "Lanjut ke cerita berikutnya", next: "plot3" }]
  },
  D2: {
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=600&fit:crop',
    text: 'Aku mengirim pesan ke Alif: "Bro, gue tau lo punya rahasia. Gimana kalau kita buat kesepakatan?" Aku tidak butuh banyak, cukup sedikit uang jaminan.',
    options: [{ text: "Lanjut ke cerita berikutnya", next: "plot3" }]
  },
  plot3: {
    comicPanels: [{
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit:crop',
        text: 'Hari ujian tiba. Suasana kelas terasa tegang dan sunyi. Semua siswa duduk dengan jarak yang renggang, masing-masing fokus pada kertas ujian di depan mereka.'
      },
      {
        image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit:crop',
        text: 'Ujian kali ini lebih sulit dari yang aku bayangkan. Soal-soal matematika yang rumit membuat kepalaku pusing. Aku mulai panik melihat waktu yang terus berjalan.'
      },
      {
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit:crop',
        text: 'Di sebelahku, Dito dengan gugup menyelipkan tangan ke dalam sakunya dan menarik keluar secarik kertas kecil. Contekan! Aku bisa melihatnya dengan jelas.'
      },
      {
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit:crop',
        text: 'Aku menarik napas dalam. Haruskah aku tetap jujur dan mengerjakan sendiri, atau ikut mencari cara lain? Keputusan ini akan menentukan integritasku.'
      }
    ],
    options: [
      { text: "Aku tetap mengerjakan sendiri", next: "E" },
      { text: "Aku bekerja sama dengan teman", next: "F" }
    ]
  },
  E: {
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit:crop',
    text: 'Di tengah ruang ujian yang sunyi, aku terlihat cemas. Di sebelahku, Raka tampak santai, menyontek dengan tenang. Aku bergumul dengan dilema.',
    options: [
      { text: "Aku tetap diam mengerjakan sendiri", next: "E1" },
      { text: "Aku mengerjakan sendiri dan melaporkan Raka", next: "E2" }
    ]
  },
  E1: {
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit:crop',
    text: 'Aku tetap mengerjakan sendiri, meskipun sulit. Aku merasa tenang karena tidak melanggar aturan.',
    options: []
  },
  E2: {
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit:crop',
    text: 'Aku melaporkan Raka karena merasa tidak adil. "Pak, Raka menyontek." Setidaknya, kalau aku dapat nilai jelek, dia juga tidak akan lolos dengan mudah.',
    options: []
  },
  F: {
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit:crop',
    text: 'Jika aku tetap mencoba sendiri, mungkin nilainya akan buruk. Tapi jika aku bergabung dengan Raka, setidaknya aku punya peluang lebih baik.',
    options: [
      { text: "Aku ikut melirik jawaban Raka", next: "F1" },
      { text: "Aku membantu Raka tapi minta imbalan", next: "F2" }
    ]
  },
  F1: {
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit:crop',
    text: 'Aku melirik Raka dan mulai menyalin jawabannya. Toh, bukan hanya aku yang melakukannya, kan?',
    options: []
  },
  F2: {
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=600&fit:crop',
    text: 'Aku membantu Raka bertukar jawaban dengan Budi, tapi meminta dia mentraktir es krim. Setidaknya aku mendapat keuntungan kecil.',
    options: []
  }
};