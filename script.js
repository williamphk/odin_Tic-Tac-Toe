let winner = null;

const Player = (name) => {
  return { name };
};

const player1 = Player("Player1");
const AI = Player("AI");

const gameBoard = (() => {
  let gameArray = new Array(9).fill(null);
  return { gameArray: gameArray };
})();

const displayController = (() => {
  let turn = player1.name;
  function isGameWin() {
    let isWin = false;
    for (let i = 0; i < 3; i++) {
      if (
        gameBoard.gameArray[i * 3] === gameBoard.gameArray[i * 3 + 1] &&
        gameBoard.gameArray[i * 3] === gameBoard.gameArray[i * 3 + 2] &&
        gameBoard.gameArray[i * 3] != null
      ) {
        isWin = true;
        winner = gameBoard.gameArray[i * 3];
      }
      if (
        gameBoard.gameArray[i] === gameBoard.gameArray[i + 3] &&
        gameBoard.gameArray[i] === gameBoard.gameArray[i + 6] &&
        gameBoard.gameArray[i] != null
      ) {
        isWin = true;
        winner = gameBoard.gameArray[i];
      }
      if (
        i != 1 &&
        gameBoard.gameArray[i] === gameBoard.gameArray[4] &&
        gameBoard.gameArray[i] === gameBoard.gameArray[8 - i] &&
        gameBoard.gameArray[i] != null
      ) {
        isWin = true;
        winner = gameBoard.gameArray[i];
      }
    }
    return isWin;
  }
  function isGameTie() {
    if (gameBoard.gameArray.every((element) => element != null)) {
      winner = "tie";
      return true;
    } else {
      return false;
    }
  }
  return { turn: turn, isGameWin: isGameWin, isGameTie: isGameTie };
})();

function mousePressed(index) {
  let btn = document.getElementById(index);
  const h1 = document.querySelector("h1");
  btn.removeAttribute("onclick");
  if (displayController.turn === player1.name) {
    btn.innerText = "O";
    gameBoard.gameArray[index] = "O";
    displayController.turn = AI.name;
    if (displayController.isGameWin()) {
      h1.innerHTML = `${player1.name} won!`;
    } else {
      var move = bestMove();
      gameBoard.gameArray[move] = "X";
      displayController.turn = player1.name;
      btn = document.getElementById(move);
      btn.innerText = "X";
      btn.removeAttribute("onclick");
    }
  }
  if (displayController.isGameWin() || displayController.isGameTie()) {
    for (let i = 0; i < 9; i++) {
      let btn = document.getElementById(i);
      btn.setAttribute("disabled", "disabled");
    }
  }
  if (displayController.isGameTie() && !displayController.isGameWin()) {
    h1.innerHTML = "Tie!";
  }
}

function restart() {
  const h1 = document.querySelector("h1");
  displayController.turn = player1.name;
  h1.innerHTML = "TIC TAC TOE";
  for (let i = 0; i < 9; i++) {
    gameBoard.gameArray[i] = null;
    let btn = document.getElementById(i);
    btn.innerText = "";
    btn.setAttribute("onclick", `mousePressed(${i})`);
    btn.removeAttribute("disabled", "disabled");
  }
}

function bestMove() {
  // AI to make its turn
  let bestScore = -Infinity;
  var move;
  for (let i = 0; i < 9; i++) {
    // Is the spot available?
    if (gameBoard.gameArray[i] == null) {
      gameBoard.gameArray[i] = "X";
      let score = minimax(false);
      gameBoard.gameArray[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}

let scores = { X: 10, O: -10, tie: 0 };

function minimax(isMaximizing) {
  // let result = checkWinner();
  displayController.isGameWin();
  displayController.isGameTie();

  if (winner !== null) {
    let score = scores[winner];
    winner = null;
    return score;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      // Is the spot available?
      if (gameBoard.gameArray[i] == null) {
        gameBoard.gameArray[i] = "X";
        let score = minimax(false);
        gameBoard.gameArray[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      // Is the spot available?
      if (gameBoard.gameArray[i] == null) {
        gameBoard.gameArray[i] = "O";
        let score = minimax(true);
        gameBoard.gameArray[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}
