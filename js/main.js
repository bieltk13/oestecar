'use strict';
(() => {
  document.documentElement.classList.add('js');
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.menu-toggle');
  const header = document.querySelector('.header');
  const links = [...document.querySelectorAll('.nav-link')];
  const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    toggle.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    document.body.classList.toggle('menu-open', open);
  }

  toggle?.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      setMenu(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', event => {
    if (nav.classList.contains('is-open') && !nav.contains(event.target) && !toggle.contains(event.target)) setMenu(false);
  });
  window.addEventListener('resize', () => { if (window.innerWidth > 900) setMenu(false); }, { passive: true });

  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 24);
    let active = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= 150) active = section;
    }
    if (active) {
      links.forEach(link => {
        const selected = link.getAttribute('href') === '#' + active.id;
        link.classList.toggle('is-active', selected);
        if (selected) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  document.querySelectorAll('[data-service]').forEach(anchor => {
    const service = anchor.dataset.service;
    const message = `Olá! Vi o serviço de ${service} no site da OesteCar e gostaria de solicitar um atendimento.`;
    anchor.href = `https://wa.me/5545991569797?text=${encodeURIComponent(message)}`;
  });

  const revealNodes = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -10px 0px' });
    revealNodes.forEach(node => observer.observe(node));
  } else revealNodes.forEach(node => node.classList.add('visible'));
  document.getElementById('year').textContent = new Date().getFullYear();
})();
