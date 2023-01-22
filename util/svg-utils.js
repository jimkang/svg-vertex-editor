
export function getPathsFromSVG({ svgNode, discardTransforms }) {
  var paths = Array.from(svgNode.querySelectorAll('path'));
  if (discardTransforms) {
    paths.forEach(path => path.removeAttribute('transform'));
  }
  return paths;
}

