import { select } from 'd3-selection';

var detailSel = select('#point-details');
var xSel = detailSel.select('.point-detail-x');
var ySel = detailSel.select('.point-detail-y');
var sharpenCheckSel = detailSel.select('#point-detail-sharpen');

export function renderPointDetails({
  point,
  index,
  // Warning: mutates this set.
  indexesToSharpenSet,
  onPointUpdate,
}) {
  xSel.node().value = point[0];
  ySel.node().value = point[1];
  sharpenCheckSel.node().checked = indexesToSharpenSet.has(index);

  sharpenCheckSel.on('change', onIndexesToSharpenChange);
  xSel.on('change', onXChange);
  ySel.on('change', onYChange);

  function onIndexesToSharpenChange() {
    if (sharpenCheckSel.node().checked) {
      indexesToSharpenSet.add(index);
    } else {
      indexesToSharpenSet.delete(index);
    }
    onPointUpdate({
      point: [+xSel.node().value, +ySel.node().value],
      index,
      updatedIndexesToSharpenSet: indexesToSharpenSet,
    });
  }

  function onXChange() {
    onPointUpdate({
      point: [+xSel.node().value, point[1]],
      index,
      updatedIndexesToSharpenSet: indexesToSharpenSet,
    });
  }

  function onYChange() {
    onPointUpdate({
      point: [point[0], +ySel.node().value],
      index,
      updatedIndexesToSharpenSet: indexesToSharpenSet,
    });
  }
}
