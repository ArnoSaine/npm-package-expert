import button from './button';

export default ({ name, version, ...statistics }, hideDetails, noActions) =>
  `<h3>${hideDetails ? '?' : `${name}@${version}`}</h3>
  <ul class="list-group">
    ${Object.entries(statistics)
      .map(
        ([prop, value]) =>
          `<a
            href="#"
            class="list-group-item list-group-item-action"
            ${noActions ? '' : `onclick="app.handleSelect('${prop}')"`}
          >
            ${prop}: ${hideDetails ? '?' : value}
          </a>`
      )
      .join('')}
  </ul>`;
