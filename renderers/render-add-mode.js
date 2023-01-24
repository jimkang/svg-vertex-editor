import { select } from 'd3-selection';

var addModeToggle = select('#add-mode-toggle');

export function renderAddMode({ addMode, onAddModeChange }) {
  addModeToggle.on('click', onAddModeChange);

  addModeToggle.text(addMode ? 'Turn off Add Vertex mode' : 'Turn on Add Vertex mode');
}
