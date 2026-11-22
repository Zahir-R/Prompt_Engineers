/**
 * Módulo: marbles.js
 * Generador modular de puntos, canicas y objetos contables para visualización aritmética:
 * - Base 10 (Marcos de diez para decenas + unidades sueltas)
 * - Multiplicación (Arreglo matricial filas × columnas)
 * - Reparto equitativo / División (Contenedores y residuo)
 * - Conteo libre interactivo
 * - Arrastre y unión interactiva (Drag & Drop para juntar/sumar canicas y objetos)
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else {
    root.MathFigures = root.MathFigures || {};
    const objectsModule = root.MathFigures.Objects || {};
    root.MathFigures.Marbles = factory(objectsModule);
  }
})(typeof self !== 'undefined' ? self : this, function (ObjectsModule) {
  'use strict';

  const COLOR_CLASSES = {
    blue: 'marble-blue',
    orange: 'marble-orange',
    green: 'marble-green',
    purple: 'marble-purple',
    yellow: 'marble-yellow'
  };

  /**
   * Genera el elemento visual para un ítem (canica o uno de los 6 objetos extraídos)
   */
  function renderItemNode(tipoObjeto, num, color, size = 38) {
    if (ObjectsModule && ObjectsModule.createObjectElement && tipoObjeto !== 'canica') {
      return ObjectsModule.createObjectElement(tipoObjeto, { size, number: num });
    }
    const marble = document.createElement('div');
    const colorClass = COLOR_CLASSES[color] || 'marble-blue';
    marble.className = `marble ${colorClass}`;
    marble.style.width = `${size}px`;
    marble.style.height = `${size}px`;
    marble.textContent = num;
    return marble;
  }

  /**
   * Crea un componente de canicas / puntos / objetos interactivo
   * @param {HTMLElement|string} target - Contenedor DOM
   * @param {Object} options - Parámetros de visualización
   */
  function createMarbleVisualizer(target, options = {}) {
    const opts = {
      modo: options.modo || 'base10', // 'base10' | 'multiplication' | 'sharing' | 'free' | 'drag-merge'
      objeto: options.objeto || 'canica', // 'canica' | 'manzana' | 'balon' | 'lapiz' | 'conejo' | 'casa' | 'sol'
      total: options.total !== undefined ? options.total : 24,
      filas: options.filas || 3,
      columnas: options.columnas || 4,
      gruposReparto: options.gruposReparto || 3,
      color: options.color || 'blue',
      interactivo: options.interactivo !== false,
      onCountChange: options.onCountChange || null,
      onMerge: options.onMerge || null
    };

    const container = typeof target === 'string' ? document.querySelector(target) : target;
    if (!container) return null;

    const wrapper = document.createElement('div');
    wrapper.className = 'marble-visualizer-wrapper';
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.alignItems = 'center';
    wrapper.style.gap = '16px';
    wrapper.style.width = '100%';

    let calculos = {};

    if (opts.modo === 'base10') {
      const total = Math.max(0, opts.total);
      const decenas = Math.floor(total / 10);
      const unidades = total % 10;

      calculos = {
        modo: 'base10',
        total,
        decenas,
        unidades,
        resumenTexto: `${total} = ${decenas} decenas (${decenas * 10}) + ${unidades} unidades`
      };

      const groupContainer = document.createElement('div');
      groupContainer.style.display = 'flex';
      groupContainer.style.flexWrap = 'wrap';
      groupContainer.style.justifyContent = 'center';
      groupContainer.style.gap = '20px';
      groupContainer.style.maxWidth = '640px';

      for (let d = 0; d < decenas; d++) {
        const boxWrapper = document.createElement('div');
        boxWrapper.style.textAlign = 'center';

        const label = document.createElement('span');
        label.style.fontFamily = 'Caveat, cursive';
        label.style.fontSize = '1.25rem';
        label.style.fontWeight = 'bold';
        label.style.color = '#24887b';
        label.textContent = `Caja 10 (#${d + 1})`;
        boxWrapper.appendChild(label);

        const frame = document.createElement('div');
        frame.className = 'ten-frame-grid';
        for (let m = 0; m < 10; m++) {
          const cell = document.createElement('div');
          cell.className = 'ten-frame-cell';
          const node = renderItemNode(opts.objeto, d * 10 + m + 1, opts.color, 36);
          cell.appendChild(node);
          frame.appendChild(cell);
        }
        boxWrapper.appendChild(frame);
        groupContainer.appendChild(boxWrapper);
      }

      if (unidades > 0) {
        const unitWrapper = document.createElement('div');
        unitWrapper.style.textAlign = 'center';

        const label = document.createElement('span');
        label.style.fontFamily = 'Caveat, cursive';
        label.style.fontSize = '1.25rem';
        label.style.fontWeight = 'bold';
        label.style.color = '#b83f30';
        label.textContent = `Sueltas (${unidades})`;
        unitWrapper.appendChild(label);

        const tray = document.createElement('div');
        tray.style.display = 'flex';
        tray.style.flexWrap = 'wrap';
        tray.style.gap = '8px';
        tray.style.background = '#efe2c8';
        tray.style.border = '3px dashed #e26352';
        tray.style.borderRadius = '14px';
        tray.style.padding = '12px';
        tray.style.minWidth = '140px';
        tray.style.justifyContent = 'center';
        tray.style.alignItems = 'center';

        for (let u = 0; u < unidades; u++) {
          const node = renderItemNode(opts.objeto, decenas * 10 + u + 1, 'orange', 36);
          tray.appendChild(node);
        }
        unitWrapper.appendChild(tray);
        groupContainer.appendChild(unitWrapper);
      }

      wrapper.appendChild(groupContainer);

    } else if (opts.modo === 'multiplication') {
      const rows = Math.max(1, opts.filas);
      const cols = Math.max(1, opts.columnas);
      const total = rows * cols;

      calculos = {
        modo: 'multiplication',
        filas: rows,
        columnas: cols,
        total,
        resumenTexto: `${rows} × ${cols} = ${total}`
      };

      const matrix = document.createElement('div');
      matrix.className = 'matrix-container';

      let count = 1;
      for (let r = 0; r < rows; r++) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'matrix-row';

        const rowLabel = document.createElement('div');
        rowLabel.className = 'matrix-row-label';
        rowLabel.textContent = `Fila ${r + 1}`;
        rowDiv.appendChild(rowLabel);

        for (let c = 0; c < cols; c++) {
          const node = renderItemNode(opts.objeto, count++, opts.color, 36);
          rowDiv.appendChild(node);
        }
        matrix.appendChild(rowDiv);
      }

      wrapper.appendChild(matrix);

    } else if (opts.modo === 'sharing') {
      const total = Math.max(1, opts.total);
      const groups = Math.max(1, opts.gruposReparto);
      const porGrupo = Math.floor(total / groups);
      const residuo = total % groups;

      calculos = {
        modo: 'sharing',
        total,
        grupos: groups,
        porGrupo,
        residuo,
        resumenTexto: `${total} ÷ ${groups} = ${porGrupo}${residuo > 0 ? ' (Sobran ' + residuo + ')' : ''}`
      };

      const groupsContainer = document.createElement('div');
      groupsContainer.style.display = 'flex';
      groupsContainer.style.flexWrap = 'wrap';
      groupsContainer.style.justifyContent = 'center';
      groupsContainer.style.gap = '16px';

      let marbleNum = 1;
      for (let g = 0; g < groups; g++) {
        const pot = document.createElement('div');
        pot.style.background = '#efe2c8';
        pot.style.border = '3px solid #2c2733';
        pot.style.borderRadius = '18px';
        pot.style.padding = '14px';
        pot.style.minWidth = '130px';
        pot.style.textAlign = 'center';
        pot.style.boxShadow = '3px 3px 0 #2c2733';

        const title = document.createElement('p');
        title.style.fontFamily = 'Fredoka, cursive';
        title.style.fontSize = '1.1rem';
        title.style.marginBottom = '8px';
        title.textContent = `Grupo ${g + 1}`;
        pot.appendChild(title);

        const marbleTray = document.createElement('div');
        marbleTray.style.display = 'flex';
        marbleTray.style.flexWrap = 'wrap';
        marbleTray.style.gap = '8px';
        marbleTray.style.justifyContent = 'center';
        marbleTray.style.maxWidth = '120px';

        for (let m = 0; m < porGrupo; m++) {
          const node = renderItemNode(opts.objeto, marbleNum++, opts.color, 34);
          marbleTray.appendChild(node);
        }
        pot.appendChild(marbleTray);

        const countLabel = document.createElement('p');
        countLabel.style.fontFamily = 'Caveat, cursive';
        countLabel.style.fontSize = '1.15rem';
        countLabel.style.fontWeight = 'bold';
        countLabel.style.marginTop = '8px';
        countLabel.style.color = '#24887b';
        countLabel.textContent = `${porGrupo} ${opts.objeto !== 'canica' ? opts.objeto + 's' : 'canicas'}`;
        pot.appendChild(countLabel);

        groupsContainer.appendChild(pot);
      }

      if (residuo > 0) {
        const resBox = document.createElement('div');
        resBox.style.background = '#fff2f0';
        resBox.style.border = '3px dashed #e26352';
        resBox.style.borderRadius = '18px';
        resBox.style.padding = '14px';
        resBox.style.minWidth = '130px';
        resBox.style.textAlign = 'center';

        const resTitle = document.createElement('p');
        resTitle.style.fontFamily = 'Fredoka, cursive';
        resTitle.style.fontSize = '1.1rem';
        resTitle.style.color = '#b83f30';
        resTitle.style.marginBottom = '8px';
        resTitle.textContent = 'Sobran (Residuo)';
        resBox.appendChild(resTitle);

        const resTray = document.createElement('div');
        resTray.style.display = 'flex';
        resTray.style.flexWrap = 'wrap';
        resTray.style.gap = '8px';
        resTray.style.justifyContent = 'center';

        for (let r = 0; r < residuo; r++) {
          const node = renderItemNode(opts.objeto, marbleNum++, 'orange', 34);
          resTray.appendChild(node);
        }
        resBox.appendChild(resTray);

        const resNote = document.createElement('p');
        resNote.style.fontFamily = 'Caveat, cursive';
        resNote.style.fontSize = '1.15rem';
        resNote.style.fontWeight = 'bold';
        resNote.style.marginTop = '8px';
        resNote.style.color = '#b83f30';
        resNote.textContent = `${residuo} sueltas`;
        resBox.appendChild(resNote);

        groupsContainer.appendChild(resBox);
      }

      wrapper.appendChild(groupsContainer);

    } else if (opts.modo === 'free') {
      const total = Math.max(1, opts.total);
      calculos = {
        modo: 'free',
        total,
        resumenTexto: `${total} objetos para contar`
      };

      const tray = document.createElement('div');
      tray.style.display = 'flex';
      tray.style.flexWrap = 'wrap';
      tray.style.gap = '12px';
      tray.style.justifyContent = 'center';
      tray.style.maxWidth = '520px';
      tray.style.padding = '18px';
      tray.style.background = '#efe2c8';
      tray.style.border = '3px solid #2c2733';
      tray.style.borderRadius = '18px';
      tray.style.boxShadow = '3px 3px 0 #2c2733';

      for (let i = 1; i <= total; i++) {
        const node = renderItemNode(opts.objeto, i, opts.color, 38);
        if (opts.interactivo) {
          node.style.cursor = 'pointer';
          node.addEventListener('click', () => {
            node.classList.toggle('selected-item');
            if (typeof opts.onCountChange === 'function') {
              opts.onCountChange(i);
            }
          });
        }
        tray.appendChild(node);
      }
      wrapper.appendChild(tray);

    } else if (opts.modo === 'drag-merge') {
      // MODO ARRASTRAR Y JUNTAR (DRAG & DROP MERGE)
      let items = Array.from({ length: Math.min(15, opts.total) }, (_, i) => ({
        id: `item-${Date.now()}-${i}`,
        value: 1,
        label: `${i + 1}`,
        color: opts.color
      }));

      calculos = {
        modo: 'drag-merge',
        totalItems: items.length,
        resumenTexto: `Arrastra un elemento sobre otro para juntarlos`
      };

      const board = document.createElement('div');
      board.style.width = '100%';
      board.style.maxWidth = '620px';
      board.style.minHeight = '240px';
      board.style.background = '#fbf6ea';
      board.style.border = '3px dashed #2c2733';
      board.style.borderRadius = '20px';
      board.style.padding = '20px';
      board.style.position = 'relative';
      board.style.display = 'flex';
      board.style.flexWrap = 'wrap';
      board.style.gap = '16px';
      board.style.alignItems = 'center';
      board.style.justifyContent = 'center';
      board.style.boxShadow = '4px 4px 0 #2c2733';

      let draggedIdx = null;

      function renderDragBoard() {
        board.innerHTML = '';
        items.forEach((item, idx) => {
          const card = document.createElement('div');
          card.draggable = true;
          card.style.display = 'flex';
          card.style.flexDirection = 'column';
          card.style.alignItems = 'center';
          card.style.justifyContent = 'center';
          card.style.gap = '6px';
          card.style.padding = '10px 14px';
          card.style.background = '#efe2c8';
          card.style.border = '2px solid #2c2733';
          card.style.borderRadius = '14px';
          card.style.boxShadow = '3px 3px 0 #2c2733';
          card.style.cursor = 'grab';
          card.style.userSelect = 'none';
          card.style.transition = 'transform 0.15s ease, background 0.15s ease';

          const iconNode = renderItemNode(opts.objeto, item.value, item.color, 42);
          card.appendChild(iconNode);

          if (item.value > 1) {
            const countTag = document.createElement('span');
            countTag.style.fontFamily = 'Fredoka, cursive';
            countTag.style.fontSize = '1.1rem';
            countTag.style.fontWeight = 'bold';
            countTag.style.color = '#b83f30';
            countTag.textContent = `Grupo de ${item.value}`;
            card.appendChild(countTag);
          }

          // Drag and drop handlers
          card.addEventListener('dragstart', (e) => {
            draggedIdx = idx;
            card.style.opacity = '0.4';
            e.dataTransfer.setData('text/plain', idx);
          });

          card.addEventListener('dragend', () => {
            card.style.opacity = '1';
            draggedIdx = null;
          });

          card.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (draggedIdx !== null && draggedIdx !== idx) {
              card.style.background = '#ffeaa7';
              card.style.transform = 'scale(1.1)';
            }
          });

          card.addEventListener('dragleave', () => {
            card.style.background = '#efe2c8';
            card.style.transform = 'scale(1)';
          });

          card.addEventListener('drop', (e) => {
            e.preventDefault();
            card.style.background = '#efe2c8';
            card.style.transform = 'scale(1)';

            const fromIdx = parseInt(e.dataTransfer.getData('text/plain'), 10);
            if (fromIdx !== idx && fromIdx >= 0 && fromIdx < items.length) {
              // Fusión de elementos al juntar
              const mergedVal = items[idx].value + items[fromIdx].value;
              items[idx].value = mergedVal;
              items.splice(fromIdx, 1);

              renderDragBoard();

              if (typeof opts.onMerge === 'function') {
                opts.onMerge({
                  mergedValue: mergedVal,
                  remainingGroups: items.length
                });
              }
            }
          });

          // Doble clic para desagrupar
          card.addEventListener('dblclick', () => {
            if (item.value > 1) {
              const count = item.value;
              items.splice(idx, 1);
              for (let k = 0; k < count; k++) {
                items.push({
                  id: `item-${Date.now()}-${Math.random()}`,
                  value: 1,
                  label: '1',
                  color: opts.color
                });
              }
              renderDragBoard();
            }
          });

          board.appendChild(card);
        });
      }

      renderDragBoard();
      wrapper.appendChild(board);

      const hint = document.createElement('p');
      hint.style.fontFamily = 'Caveat, cursive';
      hint.style.fontSize = '1.3rem';
      hint.style.color = '#5b5264';
      hint.style.fontWeight = 'bold';
      hint.innerHTML = '👉 <em>Arrastra un elemento sobre otro para juntarlos y sumarlos. Haz doble clic en un grupo para separarlo.</em>';
      wrapper.appendChild(hint);
    }

    container.innerHTML = '';
    container.appendChild(wrapper);

    return {
      element: wrapper,
      calculos,
      update: (newOptions) => createMarbleVisualizer(container, Object.assign({}, opts, newOptions))
    };
  }

  return {
    createMarbleVisualizer,
    renderItemNode,
    COLOR_CLASSES
  };
});
