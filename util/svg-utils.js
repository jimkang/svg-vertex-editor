import decomp from 'poly-decomp';

export function getPathsFromSVG({ svgNode, discardTransforms }) {
  var paths = Array.from(svgNode.querySelectorAll('path'));
  if (discardTransforms) {
    paths.forEach((path) => path.removeAttribute('transform'));
  }
  return paths;
}

export function cleanVertices(vertices) {
  if (vertices.length > 2) {
    decomp.makeCCW(vertices);
    decomp.removeCollinearPoints(vertices, 0.01);
    decomp.removeDuplicatePoints(vertices, 0.01);
  }
  if (vertices.length > 0) {
    return vertices.map((n) => [+n.x.toFixed(2), +n.y.toFixed(2)]);
  }
  return vertices;
}
