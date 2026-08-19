import { select } from 'd3-selection';

var enmeatenModeToggle = select('#enmeaten-mode-toggle');

export function renderEnmeatenMode({ enmeatenMode, onEnmeatenModeChange }) {
  enmeatenModeToggle.on('click', onEnmeatenModeChange);

  enmeatenModeToggle.text(
    enmeatenMode ? 'Turn off Enmeaten mode' : 'Turn on Enmeaten mode'
  );
}
