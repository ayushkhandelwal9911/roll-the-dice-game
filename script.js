'use strict';

let currScore = 0;
let activePlayer = 0;
let score = [0, 0];
let playing = true;

// document.querySelector('.modal').classList.remove('hidden');

const switchPlayer = function () {
  currScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = currScore;
  activePlayer = activePlayer == 0 ? 1 : 0;
  diceEl.classList.add('hidden');
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Close Modal
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
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
