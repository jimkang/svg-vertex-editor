import { select } from 'd3-selection';

var loadButton = select('#load-vertices-button');
var jsonAreaNode = document.getElementById('json-area');

export function renderTextControls({ vertices, onVertices }) {
  print();
  loadButton.on('click', load);

  function load() {
    var vertices = JSON.parse(jsonAreaNode.value);
    onVertices({ vertices });
  }

  function print() {
    jsonAreaNode.value = JSON.stringify(vertices, null, 2);
  }
}

