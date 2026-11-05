import { select } from 'd3-selection';
import { line, curveLinear, curveBasisClosed } from 'd3-shape';
import bezierShaper from 'enmeaten/lib/bezier-shaper';
import Enmeaten from 'enmeaten';
import seedrandom from 'seedrandom';

var meatPathSel = select('#meat');
var bonesPathSel = select('#bones');

var curveFnByName = {
  curveBasisClosed,
  bezierShaper,
};

export function renderMeat({
  vertices,
  extraRoundness = 0,
  enmeatenCurveFnName = 'curveBasisClosed',
  indexesToSharpen = [],
  seed,
}) {
  var meatPath;

  meatPathSel.attr('opacity', 1);
  bonesPathSel.attr('opacity', 1);

  const boneLine = line();
  boneLine.curve(curveLinear);

  const meatLine = line();

  // TODO: seedrandom
  var enmeaten = Enmeaten({ random: seed ? seedrandom(seed) : Math.random });
  var meatPoints = enmeaten({ bone: vertices, extraRoundness });
  // To consider: Is there a way to make the bezierShaper conform to the curveBasis
  // API or vice versa?
  if (enmeatenCurveFnName === 'bezierShaper') {
    // TODO: indexesToSharpen input.
    // What are the other differences with meat-to-html?
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
