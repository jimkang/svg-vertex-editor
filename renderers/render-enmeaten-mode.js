import { select } from 'd3-selection';

var curveFnSelectSel = select('#enmeaten-curve-fn');
var extraRoundnessSel = select('#enmeaten-roundness-slider');
var seedTextSel = select('#enmeaten-seed-text');

var curveFnNames = ['bezierShaper', 'curveBasisClosed'];
var optsSel = curveFnSelectSel.selectAll('option').data(curveFnNames);
optsSel
  .enter()
  .append('option')
  .attr('value', (x) => x)
  .text((x) => x);

export function renderEnmeatenMode({
  extraRoundness,
  seed = '',
  onEnmeatenCurveFnChange,
  onEnmeatenExtraRoundnessChange,
  onEnmeatenSeedChange,
}) {
  extraRoundnessSel.node().value = extraRoundness;
  seedTextSel.text(seed);

  curveFnSelectSel.on('change', onEnmeatenCurveFnChange);
  extraRoundnessSel.on('change', onEnmeatenExtraRoundnessChange);
  seedTextSel.on('keyup', onEnmeatenSeedChange);
}
