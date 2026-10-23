import { select } from 'd3-selection';
import { line, curveLinear, curveBasisClosed } from 'd3-shape';
import bezierShaper from 'enmeaten/lib/bezier-shaper';
import Enmeaten from 'enmeaten';

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

  // TODO: seedrandom
  var enmeaten = Enmeaten({ random: Math.random });
  var meatPoints = enmeaten({ bone: vertices, extraRoundness: 15 });
  // To consider: Is there a way to make the bezierShaper conform to the curveBasis
  // API or vice versa?
  if (enmeatenCurveFnName === 'bezierShaper') {
    // TODO: indexesToSharpen input.
    // What are the other differences with meat-to-html?
    let indexesToSharpen = [0, 3];
    let { path, curves } = curveFnByName[enmeatenCurveFnName](
      meatPoints,
      indexesToSharpen
    );
    meatPath = path;
    // TODO: curve rendering
  } else {
    meatLine.curve(curveFnByName[enmeatenCurveFnName]);
    meatPath = meatLine(meatPoints);
  }

  bonesPathSel.attr('d', boneLine(vertices));
  meatPathSel.attr('d', meatPath);
}
