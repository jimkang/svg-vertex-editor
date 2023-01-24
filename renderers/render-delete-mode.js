import { select } from 'd3-selection';

var deleteModeToggle = select('#delete-mode-toggle');

export function renderDeleteMode({ deleteMode, onDeleteModeChange }) {
  deleteModeToggle.on('click', onDeleteModeChange);

  deleteModeToggle.text(deleteMode ? 'Turn off Delete Vertex mode' : 'Turn on Delete Vertex mode');
}
