// Countdown to the wedding date
const weddingDate = new Date('2027-01-18T16:00:00').getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  const els = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
  };
  if (!els.days) return;

  if (distance < 0) {
    els.days.textContent = '00';
    els.hours.textContent = '00';
    els.minutes.textContent = '00';
    els.seconds.textContent = '00';
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  els.days.textContent = String(days).padStart(2, '0');
  els.hours.textContent = String(hours).padStart(2, '0');
  els.minutes.textContent = String(minutes).padStart(2, '0');
  els.seconds.textContent = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

const revealTargets = document.querySelectorAll('.section, .detail-card, .timeline-item');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((target) => {
    target.classList.add('reveal-ready');
    revealObserver.observe(target);
  });
}

// Hide navbar on scroll down, reveal on scroll up
const navbar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;
if (navbar) {
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > navbar.offsetHeight) {
      navbar.classList.add('navbar-hidden');
    } else {
      navbar.classList.remove('navbar-hidden');
    }
    lastScrollY = currentScrollY;
  });
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const storySection = document.getElementById('story');
if (!reducedMotion && storySection) {
  const particleLayer = document.createElement('div');
  particleLayer.className = 'particle-layer';
  particleLayer.setAttribute('aria-hidden', 'true');
  document.body.appendChild(particleLayer);

  const createParticles = (x, y, count, type) => {
    const available = Math.max(0, 100 - particleLayer.childElementCount);
    const total = Math.min(count, available);

    for (let index = 0; index < total; index++) {
      const particle = document.createElement('span');
      const spreadX = (Math.random() - 0.5) * 190;
      const travelY = 110 + Math.random() * 180;

      particle.className = `celebration-particle ${type}`;
      if (type === 'gold-flake' && index % 3 === 0) particle.classList.add('royal-spark');
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.setProperty('--particle-size', `${5 + Math.random() * 9}px`);
      particle.style.setProperty('--particle-x', `${spreadX}px`);
      particle.style.setProperty('--particle-y', `${travelY}px`);
      particle.style.setProperty('--particle-spin', `${140 + Math.random() * 360}deg`);
      particle.style.setProperty('--particle-duration', `${2200 + Math.random() * 1300}ms`);
      particle.addEventListener('animationend', () => particle.remove(), { once: true });
      particleLayer.appendChild(particle);
    }
  };

  let pointerStartY = 0;
  let lastTrailTime = 0;
  let activeParticleType = 'gold-flake';

  window.addEventListener('pointerdown', (event) => {
    activeParticleType = storySection.contains(event.target) ? 'rose-petal' : 'gold-flake';
    pointerStartY = event.clientY;
    createParticles(event.clientX, event.clientY, 18, activeParticleType);
  }, { passive: true });

  window.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'mouse' || !event.isPrimary) return;
    if (performance.now() - lastTrailTime < 70) return;
    lastTrailTime = performance.now();
    createParticles(event.clientX, event.clientY, 4, activeParticleType);
  }, { passive: true });

  window.addEventListener('pointerup', (event) => {
    const distance = event.clientY - pointerStartY;
    if (Math.abs(distance) >= 35) createParticles(event.clientX, event.clientY, 32, activeParticleType);
  }, { passive: true });
}

