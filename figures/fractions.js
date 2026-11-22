/**
 * Módulo: fractions.js
 * Generador modular de figuras fraccionarias (circulares y rectangulares)
 * Incluye soporte interactivo para:
 * - Selección de partes (tarta y barra)
 * - Fusión de fracciones al juntarlas (Suma visual: a/d + b/d = (a+b)/d)
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.MathFigures = root.MathFigures || {};
    root.MathFigures.Fractions = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const DEFAULT_COLORS = {
    blue: '#3b82f6',
    orange: '#f97316',
    green: '#10b981',
    purple: '#8b5cf6',
    yellow: '#f59e0b',
    teal: '#24887b',
    paper: '#fbf6ea',
    paperDeep: '#efe2c8',
    ink: '#2c2733',
    inkSoft: '#5b5264'
  };

  function resolveColor(c) {
    if (!c) return DEFAULT_COLORS.purple;
    if (DEFAULT_COLORS[c]) return DEFAULT_COLORS[c];
    return c;
  }

  /**
   * Crea un SVG de fracción circular (tarta)
   */
  function createFractionCircle(target, options = {}) {
    const opts = {
      denominador: options.denominador || 4,
      numerador: options.numerador !== undefined ? options.numerador : 1,
      seleccionadas: options.seleccionadas || null,
      radio: options.radio || 110,
      color: resolveColor(options.color),
      fondo: resolveColor(options.fondo || 'paper'),
      borde: resolveColor(options.borde || 'ink'),
      bordeGrosor: options.bordeGrosor || 2.5,
      interactivo: options.interactivo !== false,
      mostrarEtiquetas: options.mostrarEtiquetas !== false,
      onChange: options.onChange || null
    };

    const den = Math.max(1, opts.denominador);
    let selected = opts.seleccionadas 
      ? [...opts.seleccionadas]
      : Array.from({ length: den }, (_, i) => i < opts.numerador);

    while (selected.length < den) selected.push(false);
    if (selected.length > den) selected = selected.slice(0, den);

    const size = (opts.radio + 20) * 2;
    const cx = size / 2;
    const cy = size / 2;
    const r = opts.radio;

    const container = typeof target === 'string' ? document.querySelector(target) : target;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', `Fracción circular ${selected.filter(Boolean).length} de ${den}`);
    svg.style.overflow = 'visible';

    function renderSlices() {
      svg.innerHTML = '';
      for (let i = 0; i < den; i++) {
        const isSelected = selected[i];
        const fill = isSelected ? opts.color : opts.fondo;
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');

        if (den === 1) {
          const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          circle.setAttribute('cx', cx);
          circle.setAttribute('cy', cy);
          circle.setAttribute('r', r);
          circle.setAttribute('fill', fill);
          circle.setAttribute('stroke', opts.borde);
          circle.setAttribute('stroke-width', opts.bordeGrosor);
          g.appendChild(circle);
        } else {
          const a1 = (i * 2 * Math.PI) / den - Math.PI / 2;
          const a2 = ((i + 1) * 2 * Math.PI) / den - Math.PI / 2;
          const x1 = cx + r * Math.cos(a1);
          const y1 = cy + r * Math.sin(a1);
          const x2 = cx + r * Math.cos(a2);
          const y2 = cy + r * Math.sin(a2);
          const largeArc = (a2 - a1 > Math.PI) ? 1 : 0;
          const d = `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${largeArc} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;

          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path.setAttribute('d', d);
          path.setAttribute('fill', fill);
          path.setAttribute('stroke', opts.borde);
          path.setAttribute('stroke-width', opts.bordeGrosor);
          path.style.transition = 'fill 0.15s ease, filter 0.15s ease';
          g.appendChild(path);

          if (opts.mostrarEtiquetas) {
            const midA = (a1 + a2) / 2;
            const lr = r * 0.65;
            const lx = cx + lr * Math.cos(midA);
            const ly = cy + lr * Math.sin(midA);

            const txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            txt.setAttribute('x', lx.toFixed(2));
            txt.setAttribute('y', ly.toFixed(2));
            txt.setAttribute('text-anchor', 'middle');
            txt.setAttribute('dominant-baseline', 'central');
            txt.setAttribute('font-family', 'Fredoka, sans-serif');
            txt.setAttribute('font-size', den > 10 ? '11' : '13');
            txt.setAttribute('font-weight', '700');
            txt.setAttribute('fill', isSelected ? '#ffffff' : opts.borde);
            txt.setAttribute('pointer-events', 'none');
            txt.textContent = `1/${den}`;
            g.appendChild(txt);
          }
        }

        if (opts.interactivo) {
          g.style.cursor = 'pointer';
          g.addEventListener('click', () => {
            selected[i] = !selected[i];
            renderSlices();
            if (typeof opts.onChange === 'function') {
              const currentNum = selected.filter(Boolean).length;
              opts.onChange({
                denominador: den,
                numerador: currentNum,
                seleccionadas: [...selected],
                porcentaje: ((currentNum / den) * 100).toFixed(1)
              });
            }
          });
        }

        svg.appendChild(g);
      }

      const centerPin = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      centerPin.setAttribute('cx', cx);
      centerPin.setAttribute('cy', cy);
      centerPin.setAttribute('r', 5);
      centerPin.setAttribute('fill', opts.borde);
      svg.appendChild(centerPin);
    }

    renderSlices();

    if (container) {
      container.innerHTML = '';
      container.appendChild(svg);
    }

    return {
      element: svg,
      setDenominador: (newDen) => {
        opts.denominador = newDen;
        createFractionCircle(container, opts);
      },
      setNumerador: (newNum) => {
        opts.numerador = newNum;
        opts.seleccionadas = null;
        createFractionCircle(container, opts);
      },
      setColor: (newColor) => {
        opts.color = resolveColor(newColor);
        renderSlices();
      },
      getState: () => ({
        denominador: den,
        numerador: selected.filter(Boolean).length,
        seleccionadas: [...selected]
      })
    };
  }

  /**
   * Crea un SVG de fracción rectangular (barra)
   */
  function createFractionBar(target, options = {}) {
    const opts = {
      denominador: options.denominador || 4,
      numerador: options.numerador !== undefined ? options.numerador : 1,
      seleccionadas: options.seleccionadas || null,
      ancho: options.ancho || 340,
      alto: options.alto || 64,
      color: resolveColor(options.color),
      fondo: resolveColor(options.fondo || 'paper'),
      borde: resolveColor(options.borde || 'ink'),
      bordeGrosor: options.bordeGrosor || 2.5,
      interactivo: options.interactivo !== false,
      mostrarEtiquetas: options.mostrarEtiquetas !== false,
      onChange: options.onChange || null
    };

    const den = Math.max(1, opts.denominador);
    let selected = opts.seleccionadas 
      ? [...opts.seleccionadas]
      : Array.from({ length: den }, (_, i) => i < opts.numerador);

    while (selected.length < den) selected.push(false);
    if (selected.length > den) selected = selected.slice(0, den);

    const container = typeof target === 'string' ? document.querySelector(target) : target;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', opts.ancho);
    svg.setAttribute('height', opts.alto + 10);
    svg.setAttribute('viewBox', `0 0 ${opts.ancho} ${opts.alto + 10}`);
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', `Barra fraccionaria ${selected.filter(Boolean).length} de ${den}`);
    svg.style.overflow = 'visible';

    const cellW = opts.ancho / den;

    function renderCells() {
      svg.innerHTML = '';
      for (let i = 0; i < den; i++) {
        const isSelected = selected[i];
        const fill = isSelected ? opts.color : opts.fondo;
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');

        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', (i * cellW).toFixed(2));
        rect.setAttribute('y', 0);
        rect.setAttribute('width', cellW.toFixed(2));
        rect.setAttribute('height', opts.alto);
        rect.setAttribute('fill', fill);
        rect.setAttribute('stroke', opts.borde);
        rect.setAttribute('stroke-width', opts.bordeGrosor);
        rect.style.transition = 'fill 0.15s ease';
        g.appendChild(rect);

        if (opts.mostrarEtiquetas) {
          const txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          txt.setAttribute('x', ((i + 0.5) * cellW).toFixed(2));
          txt.setAttribute('y', (opts.alto / 2).toFixed(2));
          txt.setAttribute('text-anchor', 'middle');
          txt.setAttribute('dominant-baseline', 'central');
          txt.setAttribute('font-family', 'Fredoka, sans-serif');
          txt.setAttribute('font-size', den > 10 ? '11' : '14');
          txt.setAttribute('font-weight', '700');
          txt.setAttribute('fill', isSelected ? '#ffffff' : opts.borde);
          txt.setAttribute('pointer-events', 'none');
          txt.textContent = `1/${den}`;
          g.appendChild(txt);
        }

        if (opts.interactivo) {
          g.style.cursor = 'pointer';
          g.addEventListener('click', () => {
            selected[i] = !selected[i];
            renderCells();
            if (typeof opts.onChange === 'function') {
              const currentNum = selected.filter(Boolean).length;
              opts.onChange({
                denominador: den,
                numerador: currentNum,
                seleccionadas: [...selected],
                porcentaje: ((currentNum / den) * 100).toFixed(1)
              });
            }
          });
        }

        svg.appendChild(g);
      }
    }

    renderCells();

    if (container) {
      container.innerHTML = '';
      container.appendChild(svg);
    }

    return {
      element: svg,
      setDenominador: (newDen) => {
        opts.denominador = newDen;
        createFractionBar(container, opts);
      },
      setNumerador: (newNum) => {
        opts.numerador = newNum;
        opts.seleccionadas = null;
        createFractionBar(container, opts);
      },
      setColor: (newColor) => {
        opts.color = resolveColor(newColor);
        renderCells();
      },
      getState: () => ({
        denominador: den,
        numerador: selected.filter(Boolean).length,
        seleccionadas: [...selected]
      })
    };
  }

  /**
   * Crea un laboratorio interactivo de FUSIÓN DE FRACCIONES (Suma)
   * Permite arrastrar una fracción sobre otra para combinarlas visualmente:
   * numA/den + numB/den = (numA + numB)/den
   */
  function createFractionFusion(target, options = {}) {
    const opts = {
      denominador: options.denominador || 6,
      num1: options.num1 || 1,
      num2: options.num2 || 2,
      forma: options.forma || 'circle', // 'circle' | 'bar'
      onFusion: options.onFusion || null
    };

    const container = typeof target === 'string' ? document.querySelector(target) : target;
    if (!container) return null;

    let isFused = false;
    let n1 = opts.num1;
    let n2 = opts.num2;
    const den = opts.denominador;

    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.alignItems = 'center';
    wrapper.style.gap = '20px';
    wrapper.style.width = '100%';

    function renderStage() {
      wrapper.innerHTML = '';

      const stageRow = document.createElement('div');
      stageRow.style.display = 'flex';
      stageRow.style.flexWrap = 'wrap';
      stageRow.style.alignItems = 'center';
      stageRow.style.justifyContent = 'center';
      stageRow.style.gap = '24px';
      stageRow.style.width = '100%';

      if (!isFused) {
        // Fracción A (Receptor de arrastre)
        const cardA = document.createElement('div');
        cardA.style.background = '#fbf6ea';
        cardA.style.border = '3px solid #2c2733';
        cardA.style.borderRadius = '18px';
        cardA.style.padding = '16px';
        cardA.style.textAlign = 'center';
        cardA.style.boxShadow = '3px 3px 0 #2c2733';
        cardA.style.minWidth = '220px';
        cardA.innerHTML = `
          <p style="font-family:'Fredoka', cursive; font-size:1.2rem; color:#2c2733; margin-bottom:10px;">
            Fracción A (${n1}/${den})
          </p>
          <div id="target-frac-a"></div>
        `;

        // Card A drop zone
        cardA.addEventListener('dragover', (e) => {
          e.preventDefault();
          cardA.style.background = '#ffeaa7';
          cardA.style.transform = 'scale(1.05)';
        });
        cardA.addEventListener('dragleave', () => {
          cardA.style.background = '#fbf6ea';
          cardA.style.transform = 'scale(1)';
        });
        cardA.addEventListener('drop', (e) => {
          e.preventDefault();
          fuseFractions();
        });

        // Signo más "+"
        const plusSign = document.createElement('div');
        plusSign.style.fontFamily = 'Fredoka, cursive';
        plusSign.style.fontSize = '2.5rem';
        plusSign.style.fontWeight = 'bold';
        plusSign.style.color = '#e26352';
        plusSign.textContent = '+';

        // Fracción B (Arrastrable)
        const cardB = document.createElement('div');
        cardB.draggable = true;
        cardB.style.background = '#efe2c8';
        cardB.style.border = '3px dashed #e26352';
        cardB.style.borderRadius = '18px';
        cardB.style.padding = '16px';
        cardB.style.textAlign = 'center';
        cardB.style.cursor = 'grab';
        cardB.style.boxShadow = '3px 3px 0 #2c2733';
        cardB.style.minWidth = '220px';
        cardB.innerHTML = `
          <p style="font-family:'Fredoka', cursive; font-size:1.2rem; color:#e26352; margin-bottom:10px;">
            Fracción B (${n2}/${den}) ✋ <em>Arrastra</em>
          </p>
          <div id="target-frac-b"></div>
        `;

        cardB.addEventListener('dragstart', (e) => {
          cardB.style.opacity = '0.5';
          e.dataTransfer.setData('text/plain', 'fraction-b');
        });
        cardB.addEventListener('dragend', () => {
          cardB.style.opacity = '1';
        });

        stageRow.appendChild(cardA);
        stageRow.appendChild(plusSign);
        stageRow.appendChild(cardB);
        wrapper.appendChild(stageRow);

        // Render sub-visualizers
        setTimeout(() => {
          const elA = cardA.querySelector('#target-frac-a');
          const elB = cardB.querySelector('#target-frac-b');
          if (opts.forma === 'circle') {
            createFractionCircle(elA, { denominador: den, numerador: n1, color: 'blue', radio: 65, interactivo: false });
            createFractionCircle(elB, { denominador: den, numerador: n2, color: 'orange', radio: 65, interactivo: false });
          } else {
            createFractionBar(elA, { denominador: den, numerador: n1, color: 'blue', ancho: 190, alto: 44, interactivo: false });
            createFractionBar(elB, { denominador: den, numerador: n2, color: 'orange', ancho: 190, alto: 44, interactivo: false });
          }
        }, 0);

        // Botón explícito para juntar
        const fuseBtn = document.createElement('button');
        fuseBtn.className = 'btn-action';
        fuseBtn.style.maxWidth = '300px';
        fuseBtn.textContent = `⚡ Juntar y Sumar (${n1}/${den} + ${n2}/${den})`;
        fuseBtn.addEventListener('click', fuseFractions);
        wrapper.appendChild(fuseBtn);

      } else {
        // VISTA FUSIONADA
        const sumResult = n1 + n2;
        const cardFused = document.createElement('div');
        cardFused.style.background = '#fbf6ea';
        cardFused.style.border = '4px solid #10b981';
        cardFused.style.borderRadius = '20px';
        cardFused.style.padding = '24px';
        cardFused.style.textAlign = 'center';
        cardFused.style.boxShadow = '5px 5px 0 #2c2733';
        cardFused.style.animation = 'fadeIn 0.25s ease';

        const equation = document.createElement('div');
        equation.style.fontFamily = 'Fredoka, cursive';
        equation.style.fontSize = '1.8rem';
        equation.style.fontWeight = 'bold';
        equation.style.color = '#24887b';
        equation.style.marginBottom = '16px';
        equation.innerHTML = `
          <span style="color:#3b82f6">${n1}/${den}</span> + 
          <span style="color:#f97316">${n2}/${den}</span> = 
          <span style="color:#10b981">${sumResult}/${den}</span>
          ${sumResult === den ? ' 🎉 ¡1 Entero Completo!' : ''}
        `;
        cardFused.appendChild(equation);

        const targetFused = document.createElement('div');
        cardFused.appendChild(targetFused);

        stageRow.appendChild(cardFused);
        wrapper.appendChild(stageRow);

        setTimeout(() => {
          // Color multizona: n1 azul + n2 naranja
          const sel = Array.from({ length: den }, (_, i) => i < sumResult);
          if (opts.forma === 'circle') {
            createFractionCircle(targetFused, {
              denominador: den,
              seleccionadas: sel,
              color: 'green',
              radio: 90,
              interactivo: false
            });
          } else {
            createFractionBar(targetFused, {
              denominador: den,
              seleccionadas: sel,
              color: 'green',
              ancho: 300,
              alto: 56,
              interactivo: false
            });
          }
        }, 0);

        const splitBtn = document.createElement('button');
        splitBtn.className = 'btn-action';
        splitBtn.style.background = '#e26352';
        splitBtn.style.maxWidth = '260px';
        splitBtn.textContent = '↩ Separar fracciones de nuevo';
        splitBtn.addEventListener('click', () => {
          isFused = false;
          renderStage();
        });
        wrapper.appendChild(splitBtn);
      }
    }

    function fuseFractions() {
      isFused = true;
      renderStage();
      if (typeof opts.onFusion === 'function') {
        opts.onFusion({
          n1,
          n2,
          denominador: den,
          resultado: n1 + n2
        });
      }
    }

    renderStage();
    container.innerHTML = '';
    container.appendChild(wrapper);

    return {
      element: wrapper,
      fuse: fuseFractions,
      split: () => {
        isFused = false;
        renderStage();
      },
      update: (newOpts) => {
        if (newOpts.num1) n1 = newOpts.num1;
        if (newOpts.num2) n2 = newOpts.num2;
        if (newOpts.forma) opts.forma = newOpts.forma;
        isFused = false;
        renderStage();
      }
    };
  }

  return {
    createFractionCircle,
    createFractionBar,
    createFractionFusion,
    DEFAULT_COLORS
  };
});
