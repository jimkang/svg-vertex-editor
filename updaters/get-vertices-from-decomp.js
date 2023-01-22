import decomp from 'poly-decomp';
import 'pathseg';
import { getPathsFromSVG } from '../util/svg-utils';
import { Svg } from 'matter-js';

export function getVerticesFromDecomp({ svgRoot }) {
  var paths = getPathsFromSVG({ svgNode: svgRoot, discardTransforms: true });
  var vertices = paths
    .map(path => Svg.pathToVertices(path, 30))
    .flat()
    .map(({ x, y }) => [x, y]);

  decomp.makeCCW(vertices);
  decomp.removeCollinearPoints(vertices, 0.01);
  decomp.removeDuplicatePoints(vertices, 0.01);
  return decomp.quickDecomp(vertices).flat();
}

