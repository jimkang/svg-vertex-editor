export function svgTextToSVGDOM({ text, onSVGDOM }) {
  var parser = new window.DOMParser();
  var root = parser.parseFromString(text,  'image/svg+xml');
  console.log(root);
  onSVGDOM({ root });
}

