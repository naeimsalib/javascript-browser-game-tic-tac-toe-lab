/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/*---------------------------- Variables (state) ----------------------------*/

let board;
let turn;
let winner;
let tie;
let winningSquares = []; // To store the winning combination

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector('#message');
const resetBtnEl = document.querySelector('#reset');

/*-------------------------------- Functions --------------------------------*/

const placePiece = (idx) => {
  board[idx] = turn;
};

const checkForTie = () => {
  if (winner) return;

  if (!board.includes('')) tie = true;
};

const highlightWinner = () => {
  if (winner) {
    winningSquares.forEach((idx) => {
      const square = squareEls[idx];
      square.classList.add('winner'); // Add animation class to winning squares
    });
  }
};

const checkForWinner = () => {
  winningCombos.forEach((combo) => {
    if (
      board[combo[0]] !== '' &&
      board[combo[0]] === board[combo[1]] &&
      board[combo[0]] === board[combo[2]]
    ) {
      winner = true;
      winningSquares = combo; // Save the winning combination
    }
  });
};

const switchPlayerTurn = () => {
  if (winner) return;
  turn = turn === 'X' ? 'O' : 'X';
};

const updateBoard = () => {
  board.forEach((cell, idx) => {
    const square = squareEls[idx];
    square.textContent = cell;
    square.style.color = cell === 'X' ? '#ff6f61' : '#6c5ce7';
    square.style.transform = cell ? 'scale(1.2)' : 'scale(1)';
    setTimeout(() => {
      square.style.transform = 'scale(1)';
    }, 200);
  });
};

const updateMessage = () => {
  if (!winner && !tie) {
    messageEl.textContent = `It's ${turn}'s turn`;
  } else if (!winner && tie) {
    messageEl.textContent = 'Tie game!';
  } else {
    messageEl.textContent = `${turn} wins!`;
  }
};

const render = () => {
  updateBoard();
  updateMessage();
  highlightWinner(); // Highlight the winner if applicable
};

const handleClick = (evt) => {
  const sqIdx = evt.target.id;
  const squareIsFull = board[sqIdx] !== '';
  if (squareIsFull || winner) return;

  placePiece(sqIdx);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
  render();
};

const init = () => {
  board = ['', '', '', '', '', '', '', '', ''];
  turn = 'X';
  winner = false;
  tie = false;
  winningSquares = []; // Reset the winning squares
  squareEls.forEach((square) => square.classList.remove('winner')); // Remove animation
  render();
};

init();

/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach((square) => {
  square.addEventListener('click', handleClick);
});
resetBtnEl.addEventListener('click', init);
