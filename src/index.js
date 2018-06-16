import 'bootstrap/dist/css/bootstrap.min.css';
import button from './button';
import h1 from './h1';

class App {
  constructor(root) {
    this.root = root;
    this.state = { counter: 0 };
    this.setState();
  }
  setState(nextState) {
    this.state = { ...this.state, ...nextState };
    this.root.innerHTML = this.render();
  }
  increase() {
    this.setState({ counter: this.state.counter + 1 });
  }
  decrease() {
    this.setState({ counter: this.state.counter - 1 });
  }
  render() {
    return `
      <div class="container-fluid">
        ${h1('Counter')}
        <div>${this.state.counter}</div>
        ${button('app.decrease()', '-')}
        ${button('app.increase()', '+')}
      </div>
    `;
  }
}

// Moduulitiedoston sisällä muuttujat eivät ole globaaleja. Asetetaan globaali
// `app`-muuttuja, jotta HTML-koodista voidaan kutsua sen metodeja.
global.app = new App(document.getElementById('root'));
