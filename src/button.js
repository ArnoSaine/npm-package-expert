export default ({ children, onClick, style }) =>
  `<button
    class="btn btn-${style}"
    onClick="${onClick.replace(/"/g, '&quot;')}"
  >
    ${children}
  </button>`;
