document.addEventListener('DOMContentLoaded', function () {

  /* ---------- headline letters ---------- */
  var line1 = document.getElementById('line1');
  var HEADLINE = "Happy Birthday";
  HEADLINE.split('').forEach(function (ch, i) {
    var span = document.createElement('span');
    span.textContent = ch === ' ' ? '\u00A0' : ch;
    span.style.setProperty('--i', i);
    line1.appendChild(span);
  });

  /* ---------- starfield ---------- */
  var starField = document.getElementById('starField');
  var STAR_COUNT = 70;
  for (var s = 0; s < STAR_COUNT; s++) {
    var star = document.createElement('div');
    star.className = 'star';
    var size = (Math.random() * 2 + 1).toFixed(1);
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.top = (Math.random() * 100).toFixed(1) + '%';
    star.style.left = (Math.random() * 100).toFixed(1) + '%';
    star.style.setProperty('--dur', (Math.random() * 3 + 2).toFixed(1) + 's');
    star.style.setProperty('--delay', (Math.random() * 4).toFixed(1) + 's');
    starField.appendChild(star);
  }

  /* ---------- fireflies ---------- */
  var fireflyField = document.getElementById('fireflyField');
  var FIREFLY_COUNT = 16;
  var driftClasses = ['', 'drift-b', 'drift-c'];
  for (var f = 0; f < FIREFLY_COUNT; f++) {
    var fly = document.createElement('div');
    fly.className = 'firefly ' + driftClasses[f % driftClasses.length];
    var fsize = (Math.random() * 4 + 4).toFixed(1);
    fly.style.width = fsize + 'px';
    fly.style.height = fsize + 'px';
    fly.style.top = (20 + Math.random() * 75).toFixed(1) + '%';
    fly.style.left = (Math.random() * 100).toFixed(1) + '%';
    fly.style.setProperty('--dur', (Math.random() * 5 + 7).toFixed(1) + 's');
    fly.style.setProperty('--delay', (Math.random() * 5).toFixed(1) + 's');
    fireflyField.appendChild(fly);
  }

  /* ---------- audio ---------- */
  var bgAudio = document.getElementById('bgAudio');
  function playAudio() {
    var p = bgAudio.play();
    if (p) { p.catch(function () {}); }
  }
  ['pointerdown', 'touchstart', 'click'].forEach(function (evt) {
    document.addEventListener(evt, playAudio, { once: true, passive: true });
  });

  /* ---------- letter content (kept as original) ---------- */
  var LETTER_TEXT = "The day you came into my life, I honestly wasn\u2019t that attached to you, but day by day, you became really close to my heart. And now, you\u2019re truly one of my closest and best friends. \uD83E\uDEF6\uD83C\uDFFB\nI wish I could take away some of the pain and problems you\u2019re going through alone.\nI hope this year brings you lots of happiness, peace, success, and that all your dreams come true. \u2728\u2764\uFE0F\nStay the same crazy, amazing person you are. Don\u2019t be sad, okay? Always be happy and keep smiling. \uD83D\uDE0C\uD83E\uDEC2\nOnce again, Happy Birthday, Nikita (Cutie)! \uD83C\uDF88\uD83C\uDF82\uD83E\uDD73\u2764\uFE0F";

  var letterBody = document.getElementById('letterBody');
  var lanternBtn = document.getElementById('lanternBtn');
  var overlay = document.getElementById('letterOverlay');
  var closeBtn = document.getElementById('closeLetter');
  var typeTimer = null;

  function typeLetter() {
    letterBody.textContent = '';
    var idx = 0;
    typeTimer = setInterval(function () {
      if (idx < LETTER_TEXT.length) {
        letterBody.textContent += LETTER_TEXT[idx];
        idx++;
      } else {
        clearInterval(typeTimer);
      }
    }, 18);
  }

  function openLetter() {
    playAudio();
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(typeLetter, 500);
  }

  function closeLetter() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    if (typeTimer) clearInterval(typeTimer);
    lanternBtn.classList.remove('launching');
  }

  lanternBtn.addEventListener('click', function () {
    lanternBtn.classList.add('launching');
    setTimeout(openLetter, 750);
  });

  closeBtn.addEventListener('click', closeLetter);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeLetter();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeLetter();
  });

  /* ---------- second starfield (memories section) ---------- */
  var starField2 = document.getElementById('starField2');
  if (starField2) {
    for (var s2 = 0; s2 < 35; s2++) {
      var star2 = document.createElement('div');
      star2.className = 'star';
      var size2 = (Math.random() * 2 + 1).toFixed(1);
      star2.style.width = size2 + 'px';
      star2.style.height = size2 + 'px';
      star2.style.top = (Math.random() * 100).toFixed(1) + '%';
      star2.style.left = (Math.random() * 100).toFixed(1) + '%';
      star2.style.setProperty('--dur', (Math.random() * 3 + 2).toFixed(1) + 's');
      star2.style.setProperty('--delay', (Math.random() * 4).toFixed(1) + 's');
      starField2.appendChild(star2);
    }
  }

  /* ---------- memories reveal on scroll ---------- */
  var memoriesSection = document.getElementById('memories');
  if (memoriesSection && 'IntersectionObserver' in window) {
    var memObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          memoriesSection.classList.add('in-view');
          memObserver.disconnect();
        }
      });
    }, { threshold: 0.15 });
    memObserver.observe(memoriesSection);
  } else if (memoriesSection) {
    memoriesSection.classList.add('in-view');
  }

  /* ---------- lightbox ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('.polaroid-card img').forEach(function (img) {
    img.addEventListener('click', function () {
      lightboxImg.src = img.src;
      lightbox.classList.add('open');
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
  }
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });
});
