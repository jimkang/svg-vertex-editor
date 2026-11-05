import { select } from 'd3-selection';

var sharpenModeToggle = select('#sharpen-mode-toggle');

export function renderSharpenMode({ sharpenMode, onSharpenModeChange }) {
  sharpenModeToggle.on('click', onSharpenModeChange);

  sharpenModeToggle.text(
    sharpenMode ? 'Turn off Sharpen Vertex mode' : 'Turn on Sharpen Vertex mode'
  );
}
