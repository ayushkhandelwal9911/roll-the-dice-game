'use strict';
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const btnNew = document.querySelector('.btn--new');
const btnRole = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const diceEl = document.querySelector('.dice');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnHTP = document.querySelector('.how-to-play');
const btnCloseModel = document.querySelector('.close-modal');

let currScore = 0;
let activePlayer = 0;
let score = [0, 0];
let playing = true;

const switchPlayer = function () {
  currScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = currScore;
  activePlayer = activePlayer == 0 ? 1 : 0;
  diceEl.classList.add('hidden');
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Close Model
const closeModel = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnCloseModel.addEventListener('click', closeModel);
overlay.addEventListener('click', closeModel);
document.addEventListener('keydown', function (e) {
  if (!modal.classList.contains('hidden') && e.key == 'Escape') closeModel();
});

//How To Play
btnHTP.addEventListener('click', function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
});

// New Game Function
btnNew.addEventListener('click', function () {
  score[0] = 0;
  score[1] = 0;
  currScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
});

// Hold Funtion
btnHold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    if (score[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .getElementById(`current--${activePlayer}`)
        .classList.remove('player--active');
    } else switchPlayer();
  }
});

// Rolling Dice Function
btnRole.addEventListener('click', function () {
  if (playing) {
    const num = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${num}.png`;

    if (num != 1) {
      currScore += num;
      document.getElementById(`current--${activePlayer}`).textContent =
        currScore;
    } else {
      switchPlayer();
    }
  }
});
