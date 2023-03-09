import { select } from 'd3-selection';
//import { pairsToXYObjects } from '../util/formats';

var loadButton = select('#load-vertices-button');
var jsonAreaNode = document.getElementById('json-area');
//var xyModeCheckbox = document.getElementById('xy-mode-checkbox');

export function renderTextControls({ vertices, onVertices }) {
  print();
  select('#convert-to-path-button').on('click', onConvertToPathClick);
  select('#convert-from-path-button').on('click', onConvertFromPathClick);
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

  function onConvertFromPathClick() {
    const pathString = select('#path-field').node().value;
    // Warning: This doesn't parse path strings in general. Just the
    // commandless ones exported by this tool, which are simple lists of
    // numbers.
    var numbers = pathString.split(' ');
    var vertices = [];
    for (let i = 0; i < numbers.length; i += 2) {
      vertices.push([+numbers[i], +numbers[i + 1]]);
    }
    onVertices({ vertices });
  }
}
