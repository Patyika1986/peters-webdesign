'use strict';
const menu=document.querySelector('.menu');const nav=document.querySelector('nav');
if(menu&&nav){menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');nav.classList.remove('open')}));document.addEventListener('keydown',e=>{if(e.key==='Escape'){menu.setAttribute('aria-expanded','false');nav.classList.remove('open')}})}
const year=document.querySelector('#year');if(year)year.textContent=new Date().getFullYear();
const motion=matchMedia('(prefers-reduced-motion: reduce)');const art=document.querySelector('.hero-art');let pending=false;
function parallax(){if(!art)return;art.style.setProperty('--parallax',motion.matches?'0px':`${Math.min(scrollY,800)*.045}px`);pending=false}
addEventListener('scroll',()=>{if(!pending&&!motion.matches){pending=true;requestAnimationFrame(parallax)}},{passive:true});motion.addEventListener('change',parallax);parallax();
if(!motion.matches)document.querySelector('.hero-copy')?.classList.add('reveal');
