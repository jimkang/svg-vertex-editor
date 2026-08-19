import { select } from 'd3-selection';
import { line, curveLinear, curveBasisClosed } from 'd3-shape';

var meatPathSel = select('#meat');
var bonesPathSel = select('#bones');

export function renderMeat({ vertices, enmeatenMode }) {
  meatPathSel.attr('opacity', enmeatenMode ? 1 : 0);
  bonesPathSel.attr('opacity', enmeatenMode ? 1 : 0);
  if (!enmeatenMode) {
    return;
  }

  const boneLine = line();
  boneLine.curve(curveLinear);

  const meatLine = line();
  meatLine.curve(curveBasisClosed);

  bonesPathSel.attr('d', boneLine(vertices));
  meatPathSel.attr('d', meatLine(vertices));
}
