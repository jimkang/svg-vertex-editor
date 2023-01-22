
export function getPathsFromSVG(svgNode) {
  return Array.from(svgNode.querySelectorAll('path'));
}

