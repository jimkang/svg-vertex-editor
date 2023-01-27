import { select } from 'd3-selection';

var loadButton = select('#load-vertices-button');
var jsonAreaNode = document.getElementById('json-area');

export function renderTextControls({ vertices, onVertices }) {
  print();
  loadButton.on('click', load);

  function load() {
    var vertices = JSON.parse(jsonAreaNode.value).map((v) => [v.x, v.y]);
    onVertices({ vertices });
  }

  function print() {
    jsonAreaNode.value = JSON.stringify(
      vertices.map((v) => ({ x: v[0], y: v[1] })),
      null,
      2
    );
  }
}
