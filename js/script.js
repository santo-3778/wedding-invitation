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

