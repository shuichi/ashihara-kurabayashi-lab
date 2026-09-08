export function pointAt(u: number, v: number, phase: number) {
  const envelope = Math.sin(u * Math.PI);
  return {
    x: 95 + u * 740 + Math.sin(v * Math.PI) * 38 + envelope * Math.sin(phase + v) * 12,
    y:
      174 +
      v * 286 +
      Math.sin(u * Math.PI * 2 - v * 2.8 + phase) * envelope * 125 +
      Math.cos(u * Math.PI + v * 2.5 - phase) * 35,
  };
}

export function curveAt(v: number, phase: number) {
  return Array.from({ length: 65 }, (_, column) => {
    const { x, y } = pointAt(column / 64, v, phase);
    return `${column === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(" ");
}
