// Mostaza Presentation Application Logic
document.addEventListener('DOMContentLoaded', () => {

  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  const slides = Array.from(document.querySelectorAll('.slide-frame'));
  const totalSlides = slides.length;
  let currentSlideIndex = 0;

  // DOM Elements
  const btnPrev = document.getElementById('btnPrevSlide');
  const btnNext = document.getElementById('btnNextSlide');
  const slideCounterChip = document.getElementById('slideCounterChip');
  const progressBarFill = document.getElementById('progressBarFill');

  // Navigation Core Function
  function goToSlide(targetIndex) {
    if (targetIndex < 0 || targetIndex >= totalSlides) return;

    slides.forEach((slide, idx) => {
      slide.classList.remove('active', 'prev-exit');
      if (idx < targetIndex) {
        slide.classList.add('prev-exit');
      }
    });

    currentSlideIndex = targetIndex;
    const activeSlide = slides[currentSlideIndex];
    activeSlide.classList.add('active');

    updateUIControls();
  }

  function updateUIControls() {
    // Buttons state
    if (btnPrev) btnPrev.disabled = currentSlideIndex === 0;
    if (btnNext) btnNext.disabled = currentSlideIndex === totalSlides - 1;

    // Counter Chip
    const currStr = String(currentSlideIndex + 1).padStart(2, '0');
    const totStr = String(totalSlides).padStart(2, '0');
    if (slideCounterChip) slideCounterChip.textContent = `${currStr} / ${totStr}`;

    // Progress Bar
    const progressPercent = ((currentSlideIndex + 1) / totalSlides) * 100;
    if (progressBarFill) progressBarFill.style.width = `${progressPercent}%`;
  }

  // Next / Prev actions
  function nextSlide() {
    if (currentSlideIndex < totalSlides - 1) {
      goToSlide(currentSlideIndex + 1);
    }
  }

  function prevSlide() {
    if (currentSlideIndex > 0) {
      goToSlide(currentSlideIndex - 1);
    }
  }

  // Event Listeners for Nav
  if (btnNext) btnNext.addEventListener('click', nextSlide);
  if (btnPrev) btnPrev.addEventListener('click', prevSlide);

  // Keyboard Navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'Space') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    }
  });

  // Initial State Update
  updateUIControls();

});
