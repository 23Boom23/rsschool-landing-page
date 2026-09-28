export function initSlider() {
  const track = document.querySelector('.journey-track');
  if (!track) return;

  const slides = [...track.querySelectorAll('.journey-card')];
  const previous = document.querySelector('[data-slide-prev]');
  const next = document.querySelector('[data-slide-next]');
  let index = 0;

  function show(nextIndex) {
    index = (nextIndex + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === index;
      slide.inert = !active;
      slide.setAttribute('aria-hidden', String(!active));
    });
  }

  previous.addEventListener('click', () => show(index - 1));
  next.addEventListener('click', () => show(index + 1));
  window.addEventListener('resize', () => show(index));
  show(0);
}
