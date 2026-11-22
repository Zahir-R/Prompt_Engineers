/**
 * Módulo: objects.js
 * Definiciones vectoriales de los 6 objetos extraídos de figuras_objetos.svg:
 * - lápiz, balón, conejo, manzana, casa, sol (+ canica clásica)
 * Funciona como elementos contables manipulables y arrastrables.
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.MathFigures = root.MathFigures || {};
    root.MathFigures.Objects = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const OBJECT_SVGS = {
    lapiz: {
      nombre: 'Lápiz',
      viewBox: '-5 -25 200 50',
      width: 54,
      height: 22,
      svg: `
        <rect x="30" y="-20" width="135" height="40" fill="#FFD93D" stroke="#2D3436" stroke-width="2"/>
        <polygon points="0,0 30,-20 30,20" fill="#F5CBA7" stroke="#2D3436" stroke-width="2"/>
        <polygon points="0,0 10,-7 10,7" fill="#2D3436"/>
        <rect x="165" y="-20" width="5" height="40" fill="#B2BEC3" stroke="#2D3436" stroke-width="1"/>
        <rect x="170" y="-20" width="20" height="40" rx="4" fill="#FD79A8" stroke="#2D3436" stroke-width="2"/>
      `
    },
    balon: {
      nombre: 'Balón',
      viewBox: '-55 -55 110 110',
      width: 40,
      height: 40,
      svg: `
        <circle cx="0" cy="0" r="50" fill="#FFFFFF" stroke="#2D3436" stroke-width="3"/>
        <polygon points="0,-16 15.2,-4.9 9.4,13 -9.4,13 -15.2,-4.9" fill="#2D3436"/>
        <circle cx="0" cy="-40" r="7" fill="#2D3436"/>
        <circle cx="38" cy="-12" r="7" fill="#2D3436"/>
        <circle cx="24" cy="32" r="7" fill="#2D3436"/>
        <circle cx="-24" cy="32" r="7" fill="#2D3436"/>
        <circle cx="-38" cy="-12" r="7" fill="#2D3436"/>
      `
    },
    conejo: {
      nombre: 'Conejo',
      viewBox: '-50 -115 100 220',
      width: 32,
      height: 52,
      svg: `
        <ellipse cx="36" cy="60" rx="10" ry="10" fill="#FFFFFF" stroke="#2D3436" stroke-width="2"/>
        <ellipse cx="-22" cy="88" rx="16" ry="9" fill="#FFFFFF" stroke="#2D3436" stroke-width="2"/>
        <ellipse cx="22" cy="88" rx="16" ry="9" fill="#FFFFFF" stroke="#2D3436" stroke-width="2"/>
        <ellipse cx="0" cy="40" rx="42" ry="48" fill="#FFFFFF" stroke="#2D3436" stroke-width="3"/>
        <ellipse cx="-12" cy="-75" rx="10" ry="32" fill="#FFFFFF" stroke="#2D3436" stroke-width="3"/>
        <ellipse cx="12" cy="-75" rx="10" ry="32" fill="#FFFFFF" stroke="#2D3436" stroke-width="3"/>
        <ellipse cx="-12" cy="-75" rx="5" ry="22" fill="#FD79A8"/>
        <ellipse cx="12" cy="-75" rx="5" ry="22" fill="#FD79A8"/>
        <circle cx="0" cy="-20" r="32" fill="#FFFFFF" stroke="#2D3436" stroke-width="3"/>
        <circle cx="-12" cy="-26" r="5" fill="#2D3436"/>
        <circle cx="12" cy="-26" r="5" fill="#2D3436"/>
        <circle cx="0" cy="-10" r="4" fill="#FD79A8"/>
      `
    },
    manzana: {
      nombre: 'Manzana',
      viewBox: '-60 -55 120 110',
      width: 40,
      height: 40,
      svg: `
        <path d="M0,-30 C-40,-50 -60,0 -40,30 C-25,55 -5,40 0,35 C5,40 25,55 40,30 C60,0 40,-50 0,-30 Z" fill="#FF6B6B" stroke="#2D3436" stroke-width="3"/>
        <line x1="0" y1="-30" x2="5" y2="-50" stroke="#8B5E3C" stroke-width="4" stroke-linecap="round"/>
        <ellipse cx="18" cy="-46" rx="14" ry="7" fill="#1DD1A1" stroke="#2D3436" stroke-width="2" transform="rotate(-20 18 -46)"/>
      `
    },
    casa: {
      nombre: 'Casa',
      viewBox: '-80 -75 160 160',
      width: 40,
      height: 40,
      svg: `
        <rect x="-60" y="-10" width="120" height="90" fill="#FFD93D" stroke="#2D3436" stroke-width="3"/>
        <polygon points="-75,-10 0,-70 75,-10" fill="#FF6B6B" stroke="#2D3436" stroke-width="3"/>
        <rect x="-15" y="30" width="30" height="50" fill="#8B5E3C" stroke="#2D3436" stroke-width="2"/>
        <rect x="-45" y="5" width="22" height="22" fill="#74B9FF" stroke="#2D3436" stroke-width="2"/>
        <rect x="23" y="5" width="22" height="22" fill="#74B9FF" stroke="#2D3436" stroke-width="2"/>
      `
    },
    sol: {
      nombre: 'Sol',
      viewBox: '-80 -80 160 160',
      width: 42,
      height: 42,
      svg: `
        <g stroke="#FFD93D" stroke-width="6" stroke-linecap="round">
          <line x1="50" y1="0" x2="75" y2="0"/>
          <line x1="35.36" y1="35.36" x2="53.03" y2="53.03"/>
          <line x1="0" y1="50" x2="0" y2="75"/>
          <line x1="-35.36" y1="35.36" x2="-53.03" y2="53.03"/>
          <line x1="-50" y1="0" x2="-75" y2="0"/>
          <line x1="-35.36" y1="-35.36" x2="-53.03" y2="-53.03"/>
          <line x1="0" y1="-50" x2="0" y2="-75"/>
          <line x1="35.36" y1="-35.36" x2="53.03" y2="-53.03"/>
        </g>
        <circle cx="0" cy="0" r="40" fill="#FFD93D" stroke="#2D3436" stroke-width="3"/>
        <circle cx="-14" cy="-8" r="4" fill="#2D3436"/>
        <circle cx="14" cy="-8" r="4" fill="#2D3436"/>
        <path d="M-12,8 Q0,18 12,8" fill="none" stroke="#2D3436" stroke-width="3" stroke-linecap="round"/>
      `
    }
  };

  /**
   * Genera el elemento HTML/SVG de un objeto contable
   * @param {string} tipo - 'lapiz' | 'balon' | 'conejo' | 'manzana' | 'casa' | 'sol' | 'canica'
   * @param {Object} options - Opciones de tamaño y número
   */
  function createObjectElement(tipo = 'canica', options = {}) {
    const size = options.size || 40;
    const countNumber = options.number !== undefined ? options.number : null;

    if (tipo === 'canica' || !OBJECT_SVGS[tipo]) {
      const el = document.createElement('div');
      const color = options.color || 'blue';
      el.className = `marble marble-${color}`;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      if (countNumber !== null) el.textContent = countNumber;
      return el;
    }

    const obj = OBJECT_SVGS[tipo];
    const wrapper = document.createElement('div');
    wrapper.style.display = 'inline-flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.alignItems = 'center';
    wrapper.style.justifyContent = 'center';
    wrapper.style.position = 'relative';
    wrapper.style.cursor = 'grab';
    wrapper.title = `${obj.nombre} #${countNumber || ''}`;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', obj.viewBox);
    svg.setAttribute('width', size);
    svg.setAttribute('height', Math.round(size * (obj.height / obj.width)));
    svg.style.overflow = 'visible';
    svg.innerHTML = obj.svg;
    wrapper.appendChild(svg);

    if (countNumber !== null) {
      const badge = document.createElement('span');
      badge.textContent = countNumber;
      badge.style.position = 'absolute';
      badge.style.bottom = '-4px';
      badge.style.right = '-4px';
      badge.style.background = '#2c2733';
      badge.style.color = '#ffffff';
      badge.style.fontSize = '10px';
      badge.style.fontWeight = 'bold';
      badge.style.padding = '1px 5px';
      badge.style.borderRadius = '8px';
      badge.style.boxShadow = '1px 1px 0 rgba(0,0,0,0.3)';
      wrapper.appendChild(badge);
    }

    return wrapper;
  }

  return {
    OBJECT_SVGS,
    createObjectElement
  };
});
