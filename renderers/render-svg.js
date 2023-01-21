var svgContentsNode = document.getElementById('svg-contents');

export function renderSVG({ root }) {
  var paths = getPathsFromSVG(root);
  paths.forEach(path => svgContentsNode.appendChild(path));
}

function getPathsFromSVG(svgNode) {
  return Array.from(svgNode.querySelectorAll('path'));
}
