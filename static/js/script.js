// Smooth scroll for internal links
document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor){
    anchor.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.length>1 && document.querySelector(href)){
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth'});
      }
    });
  });

  // Mobile menu
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMenu = document.getElementById('closeMenu');
  if(menuBtn){
    menuBtn.addEventListener('click', ()=>{ mobileMenu.classList.remove('hidden'); });
  }
  if(closeMenu){
    closeMenu.addEventListener('click', ()=>{ mobileMenu.classList.add('hidden'); });
  }

  // Navbar shadow on scroll
  const nav = document.querySelector('[data-nav]');
  window.addEventListener('scroll', ()=>{
    if(window.scrollY > 10){ nav.classList.add('shadow'); } else { nav.classList.remove('shadow'); }
  });

  // Fade-in sections
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){ entry.target.classList.add('is-visible'); }
    });
  },{threshold:0.12});

  document.querySelectorAll('section, .fade-in').forEach(el=>{
    el.classList.add('fade-in');
    observer.observe(el);
  });
  
  // Hero parallax subtle effect
  const heroBg = document.getElementById('heroBg');
  window.addEventListener('scroll', ()=>{
    if(heroBg){
      const y = Math.min(window.scrollY, 400);
      heroBg.style.transform = `translateY(${y * -0.15}px) scale(${1 + Math.min(y/400,0.06)})`;
    }
  });

  // Animated counters (luxury stats)
  function animateCount(el, to, duration){
    let start = 0; let startTime = null;
    function step(ts){
      if(!startTime) startTime = ts;
      const progress = Math.min((ts - startTime)/duration, 1);
      el.textContent = Math.floor(progress * (to - start) + start).toLocaleString();
      if(progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const yearsEl = document.querySelector('[data-count-years]');
  const sqftEl = document.querySelector('[data-count-sqft]');
  const statsObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        if(yearsEl) animateCount(yearsEl, 10, 900);
        if(sqftEl) animateCount(sqftEl, 200000, 1200);
        statsObserver.disconnect();
      }
    });
  },{threshold:0.25});
  if(yearsEl || sqftEl){ statsObserver.observe(document.querySelector('#about') ); }
});
