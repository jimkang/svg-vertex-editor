import decomp from 'poly-decomp';
import 'pathseg';

export function decompVertices(vertices) {
  return decomp.quickDecomp(vertices).flat();
}
