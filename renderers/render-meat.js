import { select } from 'd3-selection';
import { line, curveLinear, curveBasisClosed } from 'd3-shape';
import bezierShaper from 'enmeaten/lib/bezier-shaper';

var meatPathSel = select('#meat');
var bonesPathSel = select('#bones');

var curveFnByName = {
  curveBasisClosed: curveBasisClosed,
  bezierShaper: bezierShaper,
};

export function renderMeat({
  vertices,
  enmeatenMode,
  enmeatenCurveFnName = 'curveBasisClosed',
}) {
  var meatPath;

  meatPathSel.attr('opacity', enmeatenMode ? 1 : 0);
  bonesPathSel.attr('opacity', enmeatenMode ? 1 : 0);
  if (!enmeatenMode) {
    return;
  }

  const boneLine = line();
  boneLine.curve(curveLinear);

  const meatLine = line();
  // To consider: Is there a way to make the bezierShaper conform to the curveBasis
  // API or vice versa?
  if (enmeatenCurveFnName === 'bezierShaper') {
    // TODO: indexesToSharpen
    let { path, curves } = curveFnByName[enmeatenCurveFnName](vertices, []);
    meatPath = path;
    // TODO: curve rendering
  } else {
    meatLine.curve(curveFnByName[enmeatenCurveFnName]);
    meatPath = meatLine(vertices);
  }

  bonesPathSel.attr('d', boneLine(vertices));
  meatPathSel.attr('d', meatPath);
}
