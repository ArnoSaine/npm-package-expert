import 'bootstrap/dist/css/bootstrap.min.css';
import { shuffle } from 'lodash';
import alert from './alert';
import button from './button';
import cards from './cards';
import h1 from './h1';

const smallerValueWinsProperties = [
  'dependencies',
  'openIssues',
  'openPullRequests'
];

// Game states.
const LOADING = 0;
const PLAY = 1;
const PLAY_ANOTHER = 2;
const SHOW_CARDS = 3;

class App {
  constructor(root) {
    this.root = root;
    this.state = { counter: 0 };
    this.setState({
      gameState: LOADING
    });
    this.fetchTopPackages();
  }
  setState(nextState) {
    this.state = { ...this.state, ...nextState };
    this.root.innerHTML = this.render();
  }
  fetchTopPackages() {
    fetch('/api/top-packages.json')
      .then(response => response.json())
      .then(topPackages => this.setState({ topPackages }))
      .then(() => this.startGame());
  }
  startGame() {
    const shuffled = shuffle(this.state.topPackages);
    const dealLength = shuffled.length / 2;
    this.setState({
      gameState: PLAY,
      player: shuffled.slice(0, dealLength),
      computer: shuffled.slice(dealLength)
    });
  }
  handleSelect(property) {
    if (this.getDifference(property)) {
      this.setState({ gameState: SHOW_CARDS, property });
    } else {
      this.setState({ gameState: PLAY_ANOTHER });
    }
  }
  getDifference(property) {
    const { player, computer } = this.state;
    return player[0][property] - computer[0][property];
  }
  nextRound() {
    const { player, computer } = this.state;
    const playerWinsRound = this.didPlayerWinRound();
    const winner = playerWinsRound ? player : computer;
    const loser = playerWinsRound ? computer : player;
    winner.push(winner.shift());
    winner.push(loser.shift());
    this.setState({ gameState: PLAY });
  }
  didPlayerWinRound() {
    const { property } = this.state;
    const difference = this.getDifference(property);
    return smallerValueWinsProperties.includes(property)
      ? difference < 0
      : difference > 0;
  }
  render() {
    const { gameState, player, computer } = this.state;
    if (gameState === LOADING) {
      return '';
    }
    const playerWinsRound = this.didPlayerWinRound();
    const alertStyle = playerWinsRound ? 'success' : 'danger';
    const gameOver = (playerWinsRound ? computer : player).length === 1;
    return `
      <div class="container">
        ${h1('npm package expert')}
        <div class="row">
          ${cards(player)}
          ${cards(computer, gameState !== SHOW_CARDS, true)}
        </div>
        <br />
        ${
          gameState === PLAY_ANOTHER
            ? alert('Same value. Choose another property!', 'info')
            : gameState === SHOW_CARDS
              ? alert(
                  `${playerWinsRound ? 'Player' : 'Computer'} wins ${
                    gameOver ? 'game' : 'round'
                  }! ${button({
                    onClick: gameOver ? 'app.startGame()' : 'app.nextRound()',
                    children: gameOver ? 'New game!' : 'Continue',
                    style: alertStyle
                  })}`,
                  alertStyle
                )
              : ''
        }
      </div>
    `;
  }
}

// Moduulitiedoston sisällä muuttujat eivät ole globaaleja. Asetetaan globaali
// `app`-muuttuja, jotta HTML-koodista voidaan kutsua sen metodeja.
global.app = new App(document.getElementById('root'));
