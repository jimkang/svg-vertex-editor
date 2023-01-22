import { getPathsFromSVG } from '../util/svg-utils';

var svgContentsNode = document.getElementById('svg-contents');

export function renderSVG({ root }) {
  var paths = getPathsFromSVG(root);
  // cloneNode is necessary because appending it here will remove it from its
  // source tree.
  paths.forEach(path => svgContentsNode.appendChild(path.cloneNode()));
}

