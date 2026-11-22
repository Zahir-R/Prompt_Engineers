import type { CriticalGate, RoadmapLevel } from "@/types/roadmap";

export const ROADMAP_LEVELS: RoadmapLevel[] = [
  {
    id: "N0",
    order: 0,
    title: "Primeros pasos",
    baseYear: "1.º · inicio",
    focus: "Contar, comparar y operar con cantidades pequeñas",
    canDo:
      "Cuenta, compara y resuelve sumas y restas hasta 9 usando objetos o dibujos.",
    checkpoint:
      "Resolver situaciones con cantidades hasta 9 y explicar el procedimiento con objetos o dibujos.",
    criticalGate: "Conteo, comparación y cantidades hasta 9.",
    components: [
      {
        name: "Números y operaciones",
        highlights: ["Contar y descontear hasta 9", "Comparar mayor/menor/igual", "Sumar y restar con objetos"],
      },
      {
        name: "Geometría",
        highlights: ["Reconocer figuras del entorno", "Identificar líneas y simetría"],
      },
      {
        name: "Medidas",
        highlights: ["Comparar tamaños, pesos y longitudes"],
      },
      {
        name: "Estadística",
        highlights: ["Agrupar y contar datos del entorno"],
      },
      {
        name: "Variación",
        highlights: ["Completar secuencias simples"],
      },
    ],
    unitIds: ["unidad_n0"],
  },
  {
    id: "N1",
    order: 1,
    title: "Números hasta 100",
    baseYear: "1.º · 2.º y 3.er trimestre",
    focus: "Sentido numérico, medidas básicas y primeras tablas",
    canDo:
      "Lee, escribe, compara y opera con números hasta 100; usa medidas básicas e interpreta tablas.",
    checkpoint:
      "Resolver adiciones y sustracciones de dos dígitos, leer pictogramas y usar unidades básicas.",
    criticalGate: "Valor posicional y +/− hasta 100.",
    components: [
      {
        name: "Números y operaciones",
        highlights: ["Decenas y unidades", "Suma y resta hasta 100", "Números ordinales y romanos"],
      },
      {
        name: "Geometría",
        highlights: ["Figuras y cuerpos", "Simetría"],
      },
      {
        name: "Medidas",
        highlights: ["Metro, kilogramo y litro", "Hora, calendario y moneda"],
      },
      {
        name: "Estadística",
        highlights: ["Tablas de conteo", "Pictogramas y barras simples"],
      },
      {
        name: "Variación",
        highlights: ["Patrones numéricos simples"],
      },
    ],
    unitIds: ["unidad_sumas", "unidad_restas", "unidad_reto"],
  },
  {
    id: "N2",
    order: 2,
    title: "Multiplicar y repartir",
    baseYear: "2.º de primaria",
    focus: "Números hasta 1,000, multiplicación, división y fracción parte-todo",
    canDo:
      "Opera con tres dígitos, multiplica y divide por un dígito, y comprende la fracción como parte de un todo.",
    checkpoint:
      "Resolver reparto y agrupación, medir con cm/mm e interpretar barras simples.",
    criticalGate: "Tablas de multiplicar y división exacta.",
    components: [
      {
        name: "Números y operaciones",
        highlights: ["Números hasta 1,000", "Multiplicación y división por un dígito", "Fracción parte-todo"],
      },
      {
        name: "Geometría",
        highlights: ["Paralelas y perpendiculares", "Simetría"],
      },
      {
        name: "Medidas",
        highlights: ["Submúltiplos", "Operaciones con moneda"],
      },
      {
        name: "Estadística",
        highlights: ["Barras simples", "Pictogramas"],
      },
      {
        name: "Variación",
        highlights: ["Secuencias y patrones hasta 100"],
      },
    ],
    unitIds: ["unidad_n2"],
  },
  {
    id: "N3",
    order: 3,
    title: "Números grandes y figuras",
    baseYear: "3.º de primaria",
    focus: "Números hasta 10,000, ángulos, perímetro y área",
    canDo:
      "Opera con números grandes, multiplica y divide con 2–3 dígitos, y calcula perímetro y área.",
    checkpoint:
      "Resolver problemas de varios pasos, clasificar ángulos y usar fracciones homogéneas.",
    criticalGate: "Fracción parte-todo y valor posicional hasta 10,000.",
    components: [
      {
        name: "Números y operaciones",
        highlights: ["Números hasta 10,000", "Multiplicación y división con 2–3 dígitos", "Fracciones homogéneas"],
      },
      {
        name: "Geometría",
        highlights: ["Ángulos", "Círculo y circunferencia", "Perímetro y área"],
      },
      {
        name: "Medidas",
        highlights: ["Múltiplos y submúltiplos", "Tiempo y moneda"],
      },
      {
        name: "Estadística",
        highlights: ["Tablas de doble entrada", "Gráficos de líneas"],
      },
      {
        name: "Variación",
        highlights: ["Patrones de suma y resta"],
      },
    ],
    unitIds: ["unidad_n3"],
  },
  {
    id: "N4",
    order: 4,
    title: "Fracciones y decimales",
    baseYear: "4.º de primaria",
    focus: "Millón, fracciones equivalentes, decimales y cuerpos",
    canDo:
      "Opera con números grandes, usa fracciones equivalentes y decimales, y clasifica cuerpos geométricos.",
    checkpoint:
      "Resolver problemas con fracciones y decimales, clasificar cuerpos y convertir unidades.",
    criticalGate: "Fracción equivalente y operaciones con decimales.",
    components: [
      {
        name: "Números y operaciones",
        highlights: ["Números de 4–5 dígitos y el millón", "Fracciones equivalentes", "Decimales"],
      },
      {
        name: "Geometría",
        highlights: ["Polígonos y triángulos", "Cuerpos geométricos"],
      },
      {
        name: "Medidas",
        highlights: ["Conversión de unidades", "Longitud, masa, capacidad y tiempo"],
      },
      {
        name: "Estadística",
        highlights: ["Gráficos circulares y de líneas"],
      },
      {
        name: "Variación",
        highlights: ["Reglas de secuencia con una operación"],
      },
    ],
    unitIds: ["unidad_n4"],
  },
  {
    id: "N5",
    order: 5,
    title: "Proporciones y divisibilidad",
    baseYear: "5.º de primaria",
    focus: "Primos, mcm, mcd, fracciones heterogéneas y proporcionalidad",
    canDo:
      "Usa divisibilidad, opera fracciones heterogéneas y resuelve razones y proporciones.",
    checkpoint:
      "Resolver problemas de proporcionalidad, simplificar fracciones y calcular m² y m³.",
    criticalGate: "Jerarquía de operaciones y proporcionalidad.",
    components: [
      {
        name: "Números y operaciones",
        highlights: ["Primos, compuestos, mcm y mcd", "Fracciones heterogéneas", "Razones y proporciones"],
      },
      {
        name: "Geometría",
        highlights: ["Paralelogramos y plano cartesiano", "Perímetro y área"],
      },
      {
        name: "Medidas",
        highlights: ["m² y m³", "Volumen y capacidad"],
      },
      {
        name: "Estadística",
        highlights: ["Variables y tallo y hojas"],
      },
      {
        name: "Variación",
        highlights: ["Predecir el siguiente término"],
      },
    ],
    unitIds: ["unidad_n5"],
  },
  {
    id: "N6",
    order: 6,
    title: "Enteros y potencias",
    baseYear: "6.º de primaria",
    focus: "Números enteros, potencias, porcentajes y estadística agrupada",
    canDo:
      "Opera con enteros, aplica potencias y raíces, usa porcentajes e interpreta estadística agrupada.",
    checkpoint:
      "Resolver problemas con enteros y porcentajes, potencias y raíces, e histogramas.",
    criticalGate: "Operaciones con enteros y jerarquía de operaciones.",
    components: [
      {
        name: "Números y operaciones",
        highlights: ["Enteros Z y valor absoluto", "Potencias y raíces", "Porcentaje e interés simple"],
      },
      {
        name: "Geometría",
        highlights: ["Ángulos en polígonos", "Área y volumen de cubo y paralelepípedo"],
      },
      {
        name: "Medidas",
        highlights: ["Proporcionalidad con unidades"],
      },
      {
        name: "Estadística",
        highlights: ["Frecuencia agrupada", "Histogramas y tallo y hojas"],
      },
      {
        name: "Variación",
        highlights: ["Generalizar reglas de sucesión"],
      },
    ],
    unitIds: ["unidad_n6"],
  },
];

export const CRITICAL_GATES: CriticalGate[] = [
  { id: "gate-posicional", label: "Valor posicional y +/− hasta 100", levelIds: ["N1"] },
  { id: "gate-tablas", label: "Tablas de multiplicar y división exacta", levelIds: ["N2"] },
  { id: "gate-fraccion", label: "Fracción parte-todo y equivalencia", levelIds: ["N3", "N4"] },
  { id: "gate-decimales", label: "Operaciones con fracciones y decimales", levelIds: ["N4"] },
  { id: "gate-proporcion", label: "Jerarquía de operaciones y proporcionalidad", levelIds: ["N5", "N6"] },
];
