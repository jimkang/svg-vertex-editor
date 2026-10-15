import { getPathsFromSVG } from '../util/svg-utils';
import { select } from 'd3-selection';
import { zoom as Zoom } from 'd3-zoom';

var boardSel = select('#board');
var zoomRoot = boardSel.select('#zoom-root');
var zoom = Zoom().scaleExtent([1, 8]).on('zoom', zoomed);
boardSel.call(zoom);

var svgContentsNode = document.getElementById('svg-contents');
var bboxField = document.getElementById('svg-bbox-field');

// Next: Add zoom
export function renderSVG({ root }) {
  select(svgContentsNode).selectAll('path').remove();
  var paths = getPathsFromSVG({ svgNode: root, discardTransforms: false });
  // cloneNode is necessary because appending it here will remove it from its
  // source tree.
  paths.forEach((path) => svgContentsNode.appendChild(path.cloneNode()));
  var bbox = svgContentsNode.getBBox();
  bboxField.textContent = JSON.stringify(
    {
      width: +bbox.width.toFixed(2),
      height: +bbox.height.toFixed(2),
    },
    null,
    2
  );
}

function zoomed(zoomEvent) {
  zoomRoot.attr('transform', zoomEvent.transform);
}
