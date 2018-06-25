export default (children, style) =>
  `<div class="alert alert-${style}" role="alert">
    ${children}
  </div>`;
