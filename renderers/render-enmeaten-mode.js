import { select } from 'd3-selection';

var enmeatenModeToggle = select('#enmeaten-mode-toggle');
var curveFnSelectSel = select('#enmeaten-curve-fn');

var curveFnNames = ['curveBasisClosed', 'bezierShaper'];
var optsSel = curveFnSelectSel.selectAll('option').data(curveFnNames);
optsSel.enter().append('option').attr('value', x => x).text(x => x);

export function renderEnmeatenMode({ enmeatenMode, onEnmeatenModeChange, onEnmeatenCurveFnChange }) {
  enmeatenModeToggle.on('click', onEnmeatenModeChange);
  curveFnSelectSel.on('change', onEnmeatenCurveFnChange);

  enmeatenModeToggle.text(
    enmeatenMode ? 'Turn off Enmeaten mode' : 'Turn on Enmeaten mode'
  );
}
