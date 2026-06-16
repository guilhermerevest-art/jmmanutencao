import './style.css'

/* ===== HEADER SCROLL ===== */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

/* ===== MENU MOBILE ===== */
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');
menuToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
  const spans = menuToggle.querySelectorAll('span');
  const isOpen = nav.classList.contains('open');
  spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
  spans[1].style.opacity = isOpen ? '0' : '';
  spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
});
nav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    nav.classList.remove('open');
    const spans = menuToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

/* ===== ACTIVE NAV ON SCROLL ===== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#nav a[href^="#"]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`#nav a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => observer.observe(s));

/* ===== REVEAL ON SCROLL ===== */
const revealEls = document.querySelectorAll(
  '.servico-card, .diferencial-item, .numero-item, .info-card, .sobre-text, .sobre-img, .contato-form-wrap, .contato-info'
);
revealEls.forEach(el => el.classList.add('reveal'));
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

/* ===== COUNT-UP ANIMATION ===== */
const countEls = document.querySelectorAll('[data-count]');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.count;
    const duration = 1600;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current);
    }, 16);
    countObserver.unobserve(el);
  });
}, { threshold: 0.5 });
countEls.forEach(el => countObserver.observe(el));

/* ===== FORM → WHATSAPP ===== */
document.getElementById('form-contato').addEventListener('submit', function (e) {
  e.preventDefault();
  const nome      = this.nome.value.trim();
  const telefone  = this.telefone.value.trim();
  const email     = this.email.value.trim();
  const servico   = this.servico.value;
  const mensagem  = this.mensagem.value.trim();

  if (!nome || !telefone || !mensagem) {
    alert('Por favor, preencha os campos obrigatórios (Nome, Telefone e Mensagem).');
    return;
  }

  let texto = `*Solicitação de Orçamento - Site JM Manutenção*\n\n`;
  texto += `*Nome/Empresa:* ${nome}\n`;
  texto += `*Telefone:* ${telefone}\n`;
  if (email) texto += `*E-mail:* ${email}\n`;
  if (servico) texto += `*Serviço:* ${servico}\n`;
  texto += `\n*Mensagem:*\n${mensagem}`;

  const url = `https://wa.me/5534991056859?text=${encodeURIComponent(texto)}`;
  window.open(url, '_blank');
});

/* ===== SMOOTH SCROLL POLYFILL (links internos) ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
