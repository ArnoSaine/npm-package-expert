import { times } from 'lodash';
export default ({ length }) =>
  `<h1>${times(
    length,
    index => `<span class="badge badge-danger">📦</span>`
  ).join(' ')}</h1>`;
