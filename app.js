import RouteState from 'route-state';
import handleError from 'handle-error-web';
import { version } from './package.json';
import { select } from 'd3-selection';
import { svgTextToSVGDOM } from './updaters/svg-text-to-svg-dom';
import { getVerticesFromDecomp } from './updaters/get-vertices-from-decomp';
import { renderSVG } from './renderers/render-svg';
import { renderVertexSets } from './renderers/render-vertex-sets';

var routeState;
var loadedSVGRoot;
var loadedVertexSets;

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

  var vertexSets = getVerticesFromDecomp({ svgRoot: loadedSVGRoot, onVertexSets });
  onVertexSets({ vertexSets });
}

function onVertexSets({ vertexSets }) {
  loadedVertexSets = vertexSets;
  console.log(vertexSets);
  renderVertexSets(vertexSets);
}

function reportTopLevelError(msg, url, lineNo, columnNo, error) {
  handleError(error);
}

function renderVersion() {
  var versionInfo = document.getElementById('version-info');
  versionInfo.textContent = version;
}
