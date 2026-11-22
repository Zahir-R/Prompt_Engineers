/**
 * MathFigures - Paquete Modular de Figuras Dinámicas para Nivelación Matemática
 * 
 * Módulos incluidos:
 * - Fractions: createFractionCircle, createFractionBar, createFractionFusion
 * - Geometry: createGeometryFigure
 * - Marbles: createMarbleVisualizer
 * - Objects: OBJECT_SVGS, createObjectElement
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else {
    const fractions = root.MathFigures ? root.MathFigures.Fractions : {};
    const geometry = root.MathFigures ? root.MathFigures.Geometry : {};
    const marbles = root.MathFigures ? root.MathFigures.Marbles : {};
    const objects = root.MathFigures ? root.MathFigures.Objects : {};
    root.MathFigures = factory(fractions, geometry, marbles, objects);
  }
})(typeof self !== 'undefined' ? self : this, function (Fractions, Geometry, Marbles, Objects) {
  'use strict';

  return {
    Fractions: Fractions || {},
    Geometry: Geometry || {},
    Marbles: Marbles || {},
    Objects: Objects || {},

    // Atajos directos
    createFractionCircle: Fractions && Fractions.createFractionCircle,
    createFractionBar: Fractions && Fractions.createFractionBar,
    createFractionFusion: Fractions && Fractions.createFractionFusion,
    createGeometryFigure: Geometry && Geometry.createGeometryFigure,
    createMarbleVisualizer: Marbles && Marbles.createMarbleVisualizer,
    createObjectElement: Objects && Objects.createObjectElement
  };
});
