import { select, local, pointer } from 'd3-selection';
//import { drag } from 'd3-drag';

var board = select('#board');
var verticesRoot = select('#vertices');
var index = local();

var bboxField = document.getElementById('vertices-bbox-field');

// TODO: Types.
export function renderVertices({
  vertices,
  onVerticesChange,
  onVertexClick,
  addMode,
  deleteMode,
}) {
  var points = verticesRoot.selectAll('circle').data(vertices);
  points.exit().remove();
  points
    .enter()
    .append('circle')
    .attr('r', 4)
    .each(saveIndex)
    .merge(points)
    .on('click', onCircleClick)
    .attr('cx', (pt) => pt[0])
    .attr('cy', (pt) => pt[1]);

  board.on('click', onBoardClick);

  var bbox = verticesRoot.node().getBBox();
  bboxField.textContent = JSON.stringify(
    {
      verticesWidth: +bbox.width.toFixed(2),
      verticesHeight: +bbox.height.toFixed(2),
    },
    null,
    2
  );

  function saveIndex(d, i) {
    index.set(this, i);
  }

  function onCircleClick(_e, vertex) {
    const i = index.get(this);
    if (deleteMode) {
      let editedVertices = vertices.slice();
      editedVertices.splice(i, 1);
      onVerticesChange({ vertices: editedVertices });
    }
    onVertexClick(vertex, i);
  }

  function onBoardClick(e) {
    if (addMode) {
      let point = pointer(e);
      let editedVertices = vertices.slice();
      editedVertices.push(point);
      onVerticesChange({ vertices: editedVertices });
    }
  }
}
