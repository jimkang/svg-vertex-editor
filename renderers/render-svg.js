import { getPathsFromSVG } from '../util/svg-utils';
import { select } from 'd3-selection';

var svgContentsNode = document.getElementById('svg-contents');

export function renderSVG({ root }) {
  select(svgContentsNode).selectAll('path').remove();
  var paths = getPathsFromSVG({ svgNode: root, discardTransforms: true });
  // cloneNode is necessary because appending it here will remove it from its
  // source tree.
  paths.forEach(path => svgContentsNode.appendChild(path.cloneNode()));
}

