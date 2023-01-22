import { select } from 'd3-selection';

var vertexSetsRoot = select('#vertex-sets');

export function renderVertexSets(vertexSets) {
  var setGroups = vertexSetsRoot.selectAll('g').data(vertexSets);
  setGroups.exit().remove();
  var currentSetGroups = setGroups.enter().append('g')
    .merge(setGroups);

  currentSetGroups.each(renderGroup);
}

function renderGroup() {
  var groupSel = select(this);
  var points = groupSel.selectAll('circle').data(d => d);
  points.exit().remove();
  points.enter().append('circle')
    .attr('r', 2)
    .merge(points)
    .attr('cx', pt => pt[0])
    .attr('cy', pt => pt[1]);
}
