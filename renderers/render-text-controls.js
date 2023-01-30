import { select } from 'd3-selection';

var loadButton = select('#load-vertices-button');
var jsonAreaNode = document.getElementById('json-area');

export function renderTextControls({ vertices, onVertices }) {
  print();
  select('#convert-to-path-button').on('click', onConvertToPathClick);
  loadButton.on('click', load);

  function load() {
    var vertices = JSON.parse(jsonAreaNode.value);
    onVertices({ vertices });
  }

  function print() {
    jsonAreaNode.value = JSON.stringify(vertices, null, 2);
  }

  function onConvertToPathClick() {
    select('#path-field').node().value = vertices
      .flat()
      .map((x) => x.toFixed(2))
      .join(' ');
  }
}
