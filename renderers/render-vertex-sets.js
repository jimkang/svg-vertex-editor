import { select } from 'd3-selection';

var verticesRoot = select('#vertices');

export function renderVertices(vertices) {
  var points = verticesRoot.selectAll('circle').data(vertices);
  points.exit().remove();
  points.enter().append('circle')
    .attr('r', 2)
    .merge(points)
    .attr('cx', pt => pt[0])
    .attr('cy', pt => pt[1]);
}
