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
import { renderPrintVertices } from './renderers/render-print-vertices';
import { renderLoadVertices } from './renderers/render-load-vertices';

var routeState;
var loadedSVGRoot;
var loadedVertices = [];
var addMode = false;
var deleteMode = false;

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
  select('#run-decomp-button').on('click', onDecompClick);
  renderAddMode({ addMode, onAddModeChange });
  renderDeleteMode({ deleteMode, onDeleteModeChange });
  renderLoadVertices({ onVertices });
}

function onAddModeChange() {
  addMode = !addMode;
  renderAddMode({ addMode, onAddModeChange });
  renderVertices({ vertices: loadedVertices, onVerticesChange: onVertices, addMode, deleteMode });
}


function onDeleteModeChange() {
  deleteMode = !deleteMode;
  renderDeleteMode({ deleteMode, onDeleteModeChange });
  renderVertices({ vertices: loadedVertices, onVerticesChange: onVertices, addMode, deleteMode });
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

function onVertices({ vertices }) {
  loadedVertices = vertices;
  renderVertices({ vertices: loadedVertices, onVerticesChange: onVertices, addMode, deleteMode });
  renderPrintVertices({ vertices: loadedVertices });
}

function reportTopLevelError(msg, url, lineNo, columnNo, error) {
  handleError(error);
}

function renderVersion() {
  var versionInfo = document.getElementById('version-info');
  versionInfo.textContent = version;
}
