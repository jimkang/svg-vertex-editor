import { select } from 'd3-selection';

var printButton = select('#print-vertices-button');
var jsonArea = select('#json-area');

export function renderPrintVertices({ vertices }) {
  printButton.on('click', print);

  function print() {
    jsonArea.text(JSON.stringify(vertices, null, 2));
  }
}

