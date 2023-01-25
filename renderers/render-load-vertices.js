import { select } from 'd3-selection';

var loadButton = select('#load-vertices-button');
var jsonAreaNode = document.getElementById('json-area');

export function renderLoadVertices({ onVertices }) {
  loadButton.on('click', load);

  function load() {
    var vertices = JSON.parse(jsonAreaNode.value);
    onVertices({ vertices });
  }
}

