import { select } from 'd3-selection';

var enmeatenModeToggle = select('#enmeaten-mode-toggle');
var curveFnSelectSel = select('#enmeaten-curve-fn');
var extraRoundnessSel = select('#enmeaten-roundness-slider');
var seedTextSel = select('#enmeaten-seed');

var curveFnNames = ['curveBasisClosed', 'bezierShaper'];
var optsSel = curveFnSelectSel.selectAll('option').data(curveFnNames);
optsSel
  .enter()
  .append('option')
  .attr('value', (x) => x)
  .text((x) => x);

export function renderEnmeatenMode({
  enmeatenMode,
  extraRoundness,
  seed = '',
  onEnmeatenModeChange,
  onEnmeatenCurveFnChange,
  onEnmeatenExtraRoundnessChange,
}) {
  extraRoundnessSel.node().value = extraRoundness;
  seedTextSel.text(seed);

  enmeatenModeToggle.on('click', onEnmeatenModeChange);
  curveFnSelectSel.on('change', onEnmeatenCurveFnChange);
  extraRoundnessSel.on('change', onEnmeatenExtraRoundnessChange);

  enmeatenModeToggle.text(
    enmeatenMode ? 'Turn off Enmeaten mode' : 'Turn on Enmeaten mode'
  );
}
