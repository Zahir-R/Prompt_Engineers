# Guía de Uso del Motor de Figuras Dinámicas (Modo Desglose)

Este módulo contiene el sistema de **figuras interactivas para enseñanza aritmética y procedimental** desarrollado para el proyecto Mates (Abstracthon 2026).

---

## Novedades Añadidas:
1. **6 Objetos Contables Extraídos de `figuras_objetos.svg`:**
   * 🍎 **Manzana** (`manzana`)
   * ⚽ **Balón de fútbol** (`balon`)
   * ✏️ **Lápiz** (`lapiz`)
   * 🐰 **Conejo** (`conejo`)
   * 🏠 **Casa** (`casa`)
   * ☀️ **Sol** (`sol`)
   * 🔵 **Canica clásica** (`canica`)
   * *Archivos SVG individuales en:* `figures/assets/` y `public/figures/assets/`.
2. **Arrastrar y Juntar Canicas/Objetos (Drag & Drop Merge):**
   * Puedes arrastrar un objeto sobre otro para juntarlos y sumarlos ($1 + 1 = 2$, $2 + 1 = 3$, etc.).
   * Doble clic para separarlos nuevamente.
3. **Fusión de Fracciones al Juntarlas (Suma Visual):**
   * Permite arrastrar una fracción sobre otra (o usar el botón interactivo) para fusionar sus partes y mostrar la suma en vivo:
     $$\frac{a}{d} + \frac{b}{d} = \frac{a+b}{d}$$

---

## 1. Uso en React / Next.js (`src/components/figures/`)

```tsx
import {
  FractionFigure,
  GeometryFigure,
  MarbleFigure,
  ManzanaIcon,
  BalonIcon,
  LapizIcon,
  ConejoIcon,
  CasaIcon,
  SolIcon
} from "@/components/figures";
```

### A. Fusión y Suma de Fracciones:
```tsx
// Arrastra Fracción B sobre Fracción A para fusionarlas
<FractionFigure
  modo="fusion"
  denominador={6}
  num1={1}
  num2={2}
  tipo="circulo" // o "barra"
  onFusion={({ n1, n2, denominador, resultado }) => {
    console.log(`${n1}/${denominador} + ${n2}/${denominador} = ${resultado}/${denominador}`);
  }}
/>
```

### B. Objetos y Arrastre para Juntar:
```tsx
// Arrastrar manzanas para juntarlas y sumarlas
<MarbleFigure
  modo="drag-merge"
  objeto="manzana" // "canica" | "manzana" | "balon" | "lapiz" | "conejo" | "casa" | "sol"
  total={8}
/>

// Base 10 con conejos o balones
<MarbleFigure modo="base10" objeto="conejo" total={23} />
```

---

## 2. Uso en HTML / Vanilla JS (`figures/`)

```html
<script src="figures/objects.js"></script>
<script src="figures/fractions.js"></script>
<script src="figures/geometry.js"></script>
<script src="figures/marbles.js"></script>
<script src="figures/index.js"></script>
```

### A. Fusión de Fracciones (`MathFigures.createFractionFusion`):
```javascript
MathFigures.createFractionFusion('#contenedor-fusion', {
  denominador: 6,
  num1: 1,
  num2: 2,
  forma: 'circle', // 'circle' | 'bar'
  onFusion: (res) => {
    console.log(`Resultado fusionado: ${res.resultado}/${res.denominador}`);
  }
});
```

### B. Canicas u Objetos con Arrastre (`MathFigures.createMarbleVisualizer`):
```javascript
// Arrastrar y juntar balones
MathFigures.createMarbleVisualizer('#contenedor-arrastre', {
  modo: 'drag-merge',
  objeto: 'balon', // 'manzana' | 'balon' | 'lapiz' | 'conejo' | 'casa' | 'sol' | 'canica'
  total: 6,
  onMerge: (data) => {
    console.log(`Nuevo grupo formado: ${data.mergedValue}`);
  }
});
```

---

## 3. Demostración en Vivo

Abre en tu navegador:
```bash
xdg-open prueba.html
```
Encontrarás los selectores interactivos para cambiar de objeto (manzana, balón, lápiz, etc.), arrastrarlos para juntar, y la pestaña de fusión de fracciones.
