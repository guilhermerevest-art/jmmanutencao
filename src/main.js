import './style.css'

/* ===== HEADER SCROLL ===== */
const header = document.getElementById('header')
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40)
}, { passive: true })

/* ===== MENU MOBILE ===== */
const menuToggle = document.getElementById('menu-toggle')
const nav = document.getElementById('nav')

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open')
  menuToggle.setAttribute('aria-expanded', isOpen)
  const [s0, s1, s2] = menuToggle.querySelectorAll('span')
  s0.style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : ''
  s1.style.opacity   = isOpen ? '0' : ''
  s2.style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : ''
  document.body.style.overflow = isOpen ? 'hidden' : ''
})

nav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', closeMenu)
})

function closeMenu() {
  nav.classList.remove('open')
  menuToggle.setAttribute('aria-expanded', 'false')
  const [s0, s1, s2] = menuToggle.querySelectorAll('span')
  s0.style.transform = ''
  s1.style.opacity   = ''
  s2.style.transform = ''
  document.body.style.overflow = ''
}

/* ===== ACTIVE NAV ON SCROLL ===== */
const sections = document.querySelectorAll('section[id]')
const navLinks = document.querySelectorAll('#nav a[href^="#"]')
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'))
      const active = document.querySelector(`#nav a[href="#${entry.target.id}"]`)
      if (active) active.classList.add('active')
    }
  })
}, { rootMargin: '-40% 0px -55% 0px' })
sections.forEach(s => sectionObserver.observe(s))

/* ===== REVEAL ON SCROLL ===== */
const revealEls = document.querySelectorAll(
  '.servico-card, .diferencial-item, .numero-item, .info-card, ' +
  '.sobre-text, .sobre-img-wrap, .contato-form-wrap, .contato-info, ' +
  '.depoimento-card'
)
revealEls.forEach(el => el.classList.add('reveal'))
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 55)
      revealObserver.unobserve(entry.target)
    }
  })
}, { threshold: 0.1 })
revealEls.forEach(el => revealObserver.observe(el))

/* ===== COUNT-UP ===== */
const countEls = document.querySelectorAll('[data-count]')
const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return
    const el = entry.target
    const target = +el.dataset.count
    const step = target / (1600 / 16)
    let current = 0
    const timer = setInterval(() => {
      current += step
      if (current >= target) { current = target; clearInterval(timer) }
      el.textContent = Math.floor(current)
    }, 16)
    countObserver.unobserve(el)
  })
}, { threshold: 0.5 })
countEls.forEach(el => countObserver.observe(el))

/* ===== FORM → WHATSAPP ===== */
document.getElementById('form-contato').addEventListener('submit', function (e) {
  e.preventDefault()
  const nome     = this.nome.value.trim()
  const telefone = this.telefone.value.trim()
  const email    = this.email.value.trim()
  const servico  = this.servico.value
  const mensagem = this.mensagem.value.trim()

  if (!nome || !telefone || !mensagem) {
    alert('Por favor, preencha os campos obrigatórios: Nome, Telefone e Mensagem.')
    return
  }

  let texto = `*Orçamento - Site JM Manutenção*\n\n`
  texto += `*Nome/Empresa:* ${nome}\n`
  texto += `*Telefone:* ${telefone}\n`
  if (email)   texto += `*E-mail:* ${email}\n`
  if (servico) texto += `*Serviço:* ${servico}\n`
  texto += `\n*Mensagem:*\n${mensagem}`

  window.open(`https://wa.me/5534991056859?text=${encodeURIComponent(texto)}`, '_blank')
})

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'))
    if (target) {
      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  })
})
