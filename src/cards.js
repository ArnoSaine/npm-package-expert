import card from './card';
import stack from './stack';

export default (cards, hideDetails, noActions) =>
  `<div class="col">
    ${card(cards[0], hideDetails, noActions)}
    ${stack(cards)}
  </div>`;
