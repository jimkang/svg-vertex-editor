import RouteState from 'route-state';
import handleError from 'handle-error-web';
import { version } from './package.json';
import { select } from 'd3-selection';
import { svgTextToSVGDOM } from './updaters/svg-text-to-svg-dom';
import { getVerticesFromDecomp } from './updaters/get-vertices-from-decomp';
import { renderSVG } from './renderers/render-svg';
import { renderVertices } from './renderers/render-vertices';
import { renderAddMode } from './renderers/render-add-mode';
import { renderDeleteMode } from './renderers/render-delete-mode';
import { renderTextControls } from './renderers/render-text-controls';
import { cleanVertices } from './util/svg-utils';
import { pairsToXYObjects } from './util/formats';

var routeState;
var loadedSVGRoot;
var loadedVertices = [];
var addMode = false;
var deleteMode = false;
var offsetsField = document.getElementById('vertices-offsets-field');

(async function go() {
  window.onerror = reportTopLevelError;
  renderVersion();

  routeState = RouteState({
    followRoute,
    windowObject: window,
    propsToCoerceToBool: ['localMode'],
  });
  routeState.routeFromHash();
})();

function followRoute() {
  select('#svg-file').on('change', onSVGFileChange);
  select('#def-file').on('change', onDefFileChange);
  select('#run-decomp-button').on('click', onDecompClick);
  select('#move-vertices-button').on('click', onMoveVertices);
  renderAddMode({ addMode, onAddModeChange });
  renderDeleteMode({ deleteMode, onDeleteModeChange });
  renderTextControls({ onVertices, vertices: loadedVertices });
}

function onAddModeChange() {
  addMode = !addMode;
  renderAddMode({ addMode, onAddModeChange });
  renderVertices({
    vertices: loadedVertices,
    onVerticesChange: onVertices,
    addMode,
    deleteMode,
  });
}

function onDeleteModeChange() {
  deleteMode = !deleteMode;
  renderDeleteMode({ deleteMode, onDeleteModeChange });
  renderVertices({
    vertices: loadedVertices,
    onVerticesChange: onVertices,
    addMode,
    deleteMode,
  });
}

function onSVGFileChange() {
  var file = this.files[0];
  if (file && file.type.startsWith('image/svg+xml')) {
    let reader = new FileReader();
    reader.onload = onSVGTextLoad;
    reader.readAsText(file);
  }

  function onSVGTextLoad(e) {
    svgTextToSVGDOM({ text: e.target.result, onSVGDOM });
  }
}

function onDefFileChange() {
  var file = this.files[0];
  if (file) {
    let reader = new FileReader();
    reader.onload = onDefLoad;
    reader.readAsText(file);
  }

  async function onDefLoad(e) {
    const text = e.target.result;
    const startObjIndex = text.lastIndexOf('= {') + 2;
    const defText = `(${text.slice(startObjIndex, -2)})`;
    console.log(defText);
    var def = window.eval(defText);

    // TODO: Other directions' svgs, other locations.
    //var res = await fetch(
    //`http://localhost:7000/static/svg/${def.svgSrcForDirections.default}`,
    //{ mode: 'no-cors' }
    //);
    // // Why does this give us an empty string ever though the xhr worked?
    //const svgText = await res.text();
    //console.log('svgText', svgText);
    //svgTextToSVGDOM({ text: svgText, onSVGDOM });
    onVertices({ vertices: def.vertices });
  }
}

function onSVGDOM({ root }) {
  loadedSVGRoot = root;
  renderSVG({ root });
}

function onDecompClick() {
  if (!loadedSVGRoot) {
    throw new Error('No SVG loaded.');
  }

  var vertices = getVerticesFromDecomp({ svgRoot: loadedSVGRoot, onVertices });
  onVertices({ vertices });
}

function onMoveVertices() {
  const cornerX = loadedVertices.reduce(
    (lowX, pair) => (pair[0] < lowX ? pair[0] : lowX),
    Infinity
  );
  const cornerY = loadedVertices.reduce(
    (lowY, pair) => (pair[1] < lowY ? pair[1] : lowY),
    Infinity
  );
  onVertices({
    vertices: pairsToXYObjects(
      loadedVertices.map((pair) => [pair[0] - cornerX, pair[1] - cornerY])
    ),
  });
}

function onVertices({ vertices }) {
  loadedVertices = cleanVertices(vertices);
  renderVertices({
    vertices: loadedVertices,
    onVerticesChange: onVertices,
    addMode,
    deleteMode,
  });
  renderTextControls({ onVertices, vertices: loadedVertices });

  var verticesRoot = document.getElementById('vertices');
  var svgRoot = document.getElementById('svg-contents');
  if (verticesRoot && svgRoot) {
    let verticesBBox = verticesRoot.getBBox();
    let svgBBox = svgRoot.getBBox();
    offsetsField.value = `"verticesOffset": {
    "x": ${+(Math.max(verticesBBox.x, 0) - Math.max(svgBBox.x, 0)).toFixed(2)},
    "y": ${+(verticesBBox.y - svgBBox.y).toFixed(2)}
    }`;
  }
}

function reportTopLevelError(msg, url, lineNo, columnNo, error) {
  handleError(error);
}

function renderVersion() {
  var versionInfo = document.getElementById('version-info');
  versionInfo.textContent = version;
}
