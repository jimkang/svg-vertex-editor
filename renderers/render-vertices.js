import { select, local } from 'd3-selection';
import { drag } from 'd3-drag';

var verticesRoot = select('#vertices');
var index = local();

export function renderVertices({ vertices, onVerticesChange }) {
  var points = verticesRoot.selectAll('circle').data(vertices);
  points.exit().remove();
  points.enter().append('circle')
    .attr('r', 2)
    .each(saveIndex)
    .merge(points)
    .on('click', onCircleClick)
    .attr('cx', pt => pt[0])
    .attr('cy', pt => pt[1]);

  function saveIndex(d, i) {
    index.set(this, i);
  }

  function onCircleClick(e) {
    if (e.shiftKey) {
      let editedVertices = vertices.slice();
      editedVertices.splice(index.get(this), 1);
      onVerticesChange({ vertices: editedVertices });
    }
  }
}
