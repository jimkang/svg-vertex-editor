export function pairsToXYObjects(pairs) {
  return pairs.map(pairToXY);
}

export function pairToXY(pair) {
  return { x: pair[0], y: pair[1] };
}
