/**
 * Módulo: geometry.js
 * Generador modular de figuras geométricas con enfoque en visualización aritmética:
 * - Área (cuadrícula de unidades cuadradas contables)
 * - Perímetro (cotas de medidas y suma continua de lados)
 * - Vértices y Aristas (puntos angulares numerados)
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.MathFigures = root.MathFigures || {};
    root.MathFigures.Geometry = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const DEFAULT_COLORS = {
    paper: '#fbf6ea',
    paperDeep: '#efe2c8',
    ink: '#2c2733',
    inkSoft: '#5b5264',
    coral: '#e26352',
    coralDeep: '#b83f30',
    blue: '#3b82f6',
    teal: '#24887b',
    orange: '#f97316'
  };

  /**
   * Crea una figura geométrica con visualización aritmética
   * @param {HTMLElement|string} target - Contenedor DOM o selector
   * @param {Object} options - Parámetros de la figura
   */
  function createGeometryFigure(target, options = {}) {
    const opts = {
      tipo: options.tipo || 'rectangle', // 'rectangle' | 'square' | 'triangle' | 'pentagon' | 'hexagon'
      anchoUnidades: options.anchoUnidades || 5,
      altoUnidades: options.altoUnidades || 3,
      ladoUnidades: options.ladoUnidades || 4,
      modo: options.modo || 'area', // 'area' | 'perimeter' | 'vertices'
      mostrarNumeros: options.mostrarNumeros !== false,
      tamanoCelda: options.tamanoCelda || 38,
      anchoCanvas: options.anchoCanvas || 420,
      altoCanvas: options.altoCanvas || 330
    };

    const container = typeof target === 'string' ? document.querySelector(target) : target;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', opts.anchoCanvas);
    svg.setAttribute('height', opts.altoCanvas);
    svg.setAttribute('viewBox', `0 0 ${opts.anchoCanvas} ${opts.altoCanvas}`);
    svg.setAttribute('role', 'img');
    svg.style.overflow = 'visible';

    const cx = opts.anchoCanvas / 2;
    const cy = opts.altoCanvas / 2;

    let calculos = {};

    if (opts.tipo === 'rectangle' || opts.tipo === 'square') {
      const w = opts.tipo === 'square' ? opts.anchoUnidades : opts.anchoUnidades;
      const h = opts.tipo === 'square' ? opts.anchoUnidades : opts.altoUnidades;
      const totalW = w * opts.tamanoCelda;
      const totalH = h * opts.tamanoCelda;
      const startX = cx - totalW / 2;
      const startY = cy - totalH / 2;
      const area = w * h;
      const perimetro = 2 * (w + h);

      calculos = {
        tipo: opts.tipo,
        base: w,
        altura: h,
        area: area,
        perimetro: perimetro,
        vertices: 4,
        lados: 4
      };

      // Fondo del cuadrilátero
      const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      bgRect.setAttribute('x', startX);
      bgRect.setAttribute('y', startY);
      bgRect.setAttribute('width', totalW);
      bgRect.setAttribute('height', totalH);
      bgRect.setAttribute('fill', DEFAULT_COLORS.paperDeep);
      bgRect.setAttribute('stroke', DEFAULT_COLORS.ink);
      bgRect.setAttribute('stroke-width', '3');
      bgRect.setAttribute('rx', '4');
      svg.appendChild(bgRect);

      // Cuadrículas para cálculo de área
      let count = 1;
      for (let r = 0; r < h; r++) {
        for (let c = 0; c < w; c++) {
          const cellX = startX + c * opts.tamanoCelda;
          const cellY = startY + r * opts.tamanoCelda;
          const cellFill = (opts.modo === 'area')
            ? ((r + c) % 2 === 0 ? 'rgba(59, 130, 246, 0.16)' : 'rgba(59, 130, 246, 0.28)')
            : 'transparent';

          const cell = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          cell.setAttribute('x', cellX);
          cell.setAttribute('y', cellY);
          cell.setAttribute('width', opts.tamanoCelda);
          cell.setAttribute('height', opts.tamanoCelda);
          cell.setAttribute('fill', cellFill);
          cell.setAttribute('stroke', 'rgba(44, 39, 51, 0.25)');
          cell.setAttribute('stroke-width', '1.5');
          svg.appendChild(cell);

          if (opts.modo === 'area' && opts.mostrarNumeros) {
            const numTxt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            numTxt.setAttribute('x', cellX + opts.tamanoCelda / 2);
            numTxt.setAttribute('y', cellY + opts.tamanoCelda / 2);
            numTxt.setAttribute('text-anchor', 'middle');
            numTxt.setAttribute('dominant-baseline', 'central');
            numTxt.setAttribute('font-family', 'Fredoka, sans-serif');
            numTxt.setAttribute('font-size', '12');
            numTxt.setAttribute('font-weight', '700');
            numTxt.setAttribute('fill', DEFAULT_COLORS.inkSoft);
            numTxt.textContent = count++;
            svg.appendChild(numTxt);
          }
        }
      }

      // Cotas de perímetro
      if (opts.modo === 'perimeter') {
        const labels = [
          { x: cx, y: startY - 14, text: `Base: ${w}` },
          { x: cx, y: startY + totalH + 22, text: `Base: ${w}` },
          { x: startX - 22, y: cy, text: `${h}` },
          { x: startX + totalW + 22, y: cy, text: `${h}` }
        ];
        labels.forEach(l => {
          const txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          txt.setAttribute('x', l.x);
          txt.setAttribute('y', l.y);
          txt.setAttribute('text-anchor', 'middle');
          txt.setAttribute('dominant-baseline', 'central');
          txt.setAttribute('font-family', 'Fredoka, sans-serif');
          txt.setAttribute('font-size', '15');
          txt.setAttribute('font-weight', '700');
          txt.setAttribute('fill', DEFAULT_COLORS.coralDeep);
          txt.textContent = l.text;
          svg.appendChild(txt);
        });
      }

      // Puntos angulares de vértices
      if (opts.modo === 'vertices') {
        const corners = [
          [startX, startY],
          [startX + totalW, startY],
          [startX + totalW, startY + totalH],
          [startX, startY + totalH]
        ];
        corners.forEach(([px, py], i) => {
          const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          dot.setAttribute('cx', px);
          dot.setAttribute('cy', py);
          dot.setAttribute('r', '7');
          dot.setAttribute('fill', DEFAULT_COLORS.coral);
          dot.setAttribute('stroke', DEFAULT_COLORS.ink);
          dot.setAttribute('stroke-width', '2.5');
          svg.appendChild(dot);

          const lbl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          lbl.setAttribute('x', px);
          lbl.setAttribute('y', py - 12);
          lbl.setAttribute('text-anchor', 'middle');
          lbl.setAttribute('font-family', 'Fredoka, sans-serif');
          lbl.setAttribute('font-size', '13');
          lbl.setAttribute('font-weight', '700');
          lbl.setAttribute('fill', DEFAULT_COLORS.coralDeep);
          lbl.textContent = `V${i + 1}`;
          svg.appendChild(lbl);
        });
      }

    } else if (opts.tipo === 'triangle') {
      const b = 6;
      const l = 5;
      calculos = {
        tipo: 'triangle',
        base: b,
        lados: [l, l, b],
        perimetro: l + l + b,
        vertices: 3
      };

      const p1 = [cx, cy - 90];
      const p2 = [cx - 100, cy + 70];
      const p3 = [cx + 100, cy + 70];

      const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      poly.setAttribute('points', `${p1[0]},${p1[1]} ${p2[0]},${p2[1]} ${p3[0]},${p3[1]}`);
      poly.setAttribute('fill', 'rgba(249, 115, 22, 0.2)');
      poly.setAttribute('stroke', DEFAULT_COLORS.ink);
      poly.setAttribute('stroke-width', '3');
      poly.setAttribute('stroke-linejoin', 'round');
      svg.appendChild(poly);

      const hLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      hLine.setAttribute('x1', cx);
      hLine.setAttribute('y1', p1[1]);
      hLine.setAttribute('x2', cx);
      hLine.setAttribute('y2', p2[1]);
      hLine.setAttribute('stroke', DEFAULT_COLORS.ink);
      hLine.setAttribute('stroke-dasharray', '4 4');
      hLine.setAttribute('stroke-width', '2');
      svg.appendChild(hLine);

      if (opts.modo === 'vertices') {
        [p1, p2, p3].forEach(([px, py]) => {
          const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          dot.setAttribute('cx', px);
          dot.setAttribute('cy', py);
          dot.setAttribute('r', '7');
          dot.setAttribute('fill', DEFAULT_COLORS.coral);
          dot.setAttribute('stroke', DEFAULT_COLORS.ink);
          dot.setAttribute('stroke-width', '2');
          svg.appendChild(dot);
        });
      }

    } else if (opts.tipo === 'pentagon' || opts.tipo === 'hexagon') {
      const sides = opts.tipo === 'pentagon' ? 5 : 6;
      const r = 90;
      calculos = {
        tipo: opts.tipo,
        lados: sides,
        perimetro: sides * opts.ladoUnidades,
        vertices: sides
      };

      const pts = [];
      for (let i = 0; i < sides; i++) {
        const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
        pts.push([cx + r * Math.cos(angle), cy + r * Math.sin(angle)]);
      }

      const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      poly.setAttribute('points', pts.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' '));
      poly.setAttribute('fill', 'rgba(16, 185, 129, 0.2)');
      poly.setAttribute('stroke', DEFAULT_COLORS.ink);
      poly.setAttribute('stroke-width', '3');
      poly.setAttribute('stroke-linejoin', 'round');
      svg.appendChild(poly);

      pts.forEach(([px, py]) => {
        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dot.setAttribute('cx', px);
        dot.setAttribute('cy', py);
        dot.setAttribute('r', '6');
        dot.setAttribute('fill', DEFAULT_COLORS.coral);
        dot.setAttribute('stroke', DEFAULT_COLORS.ink);
        dot.setAttribute('stroke-width', '2');
        svg.appendChild(dot);
      });
    }

    if (container) {
      container.innerHTML = '';
      container.appendChild(svg);
    }

    return {
      element: svg,
      calculos,
      update: (newOptions) => createGeometryFigure(container, Object.assign({}, opts, newOptions))
    };
  }

  return {
    createGeometryFigure,
    DEFAULT_COLORS
  };
});
