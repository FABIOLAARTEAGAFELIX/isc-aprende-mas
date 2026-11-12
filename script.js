// Navegación móvil
const menuToggle = document.querySelector('#menuToggle');
const mainNav = document.querySelector('#mainNav');

menuToggle.addEventListener('click', () => {
  const abierto = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(abierto));
  menuToggle.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
});

document.querySelectorAll('.main-nav a').forEach((enlace) => {
  enlace.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menú');
  });
});

// Resalta en el menú la sección que se está visualizando.
const secciones = document.querySelectorAll('main section[id]');
const enlacesNav = document.querySelectorAll('.nav-link');

const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (!entrada.isIntersecting) return;
    enlacesNav.forEach((enlace) => {
      enlace.classList.toggle('active', enlace.getAttribute('href') === `#${entrada.target.id}`);
    });
  });
}, { rootMargin: '-35% 0px -55% 0px' });

secciones.forEach((seccion) => observador.observe(seccion));

// Buscador del glosario.
const glossarySearch = document.querySelector('#glossarySearch');
const glossaryEntries = [...document.querySelectorAll('.glossary-entry')];
const noResults = document.querySelector('#noResults');

function filtrarGlosario(termino = '') {
  const consulta = termino.trim().toLocaleLowerCase('es');
  let visibles = 0;

  glossaryEntries.forEach((entrada) => {
    const coincide = entrada.textContent.toLocaleLowerCase('es').includes(consulta);
    entrada.hidden = !coincide;
    if (coincide) visibles++;
  });

  noResults.hidden = visibles !== 0;
}

glossarySearch.addEventListener('input', (evento) => filtrarGlosario(evento.target.value));

// Los términos subrayados llevan al glosario y filtran el concepto seleccionado.
document.querySelectorAll('.skill-item a[data-term]').forEach((enlace) => {
  enlace.addEventListener('click', () => {
    const termino = enlace.dataset.term;
    glossarySearch.value = termino;
    filtrarGlosario(termino);
  });
});

// Año automático en el pie de página.
document.querySelector('#year').textContent = new Date().getFullYear();

const lifecycleCarousel = document.querySelector('.lifecycle-carousel');
if (lifecycleCarousel) {
  const slides = [...lifecycleCarousel.querySelectorAll('figure')];
  const position = lifecycleCarousel.querySelector('.carousel-position');
  let current = 0;

  lifecycleCarousel.querySelectorAll('button[data-step]').forEach(button => {
    button.addEventListener('click', () => {
      slides[current].hidden = true;
      current = (current + Number(button.dataset.step) + slides.length) % slides.length;
      slides[current].hidden = false;
      position.textContent = (current + 1) + ' de ' + slides.length;
    });
  });
}
