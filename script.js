const Player = (name) => {
  return { name };
};

const player1 = Player("Player1");
const player2 = Player("Player2");

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
      }
      if (
        gameBoard.gameArray[i] === gameBoard.gameArray[i + 3] &&
        gameBoard.gameArray[i] === gameBoard.gameArray[i + 6] &&
        gameBoard.gameArray[i] != null
      ) {
        isWin = true;
      }
      if (
        i != 1 &&
        gameBoard.gameArray[i] === gameBoard.gameArray[4] &&
        gameBoard.gameArray[i] === gameBoard.gameArray[8 - i] &&
        gameBoard.gameArray[i] != null
      ) {
        isWin = true;
      }
    }
    return isWin;
  }
  function isGameTie() {
    return gameBoard.gameArray.every((element) => element != null);
  }
  return { turn: turn, isGameWin: isGameWin, isGameTie: isGameTie };
})();

function render(index) {
  let btn = document.getElementById(index);
  const h1 = document.querySelector("h1");
  btn.removeAttribute("onclick");
  if (displayController.turn === player1.name) {
    btn.innerText = "O";
    displayController.turn = player2.name;
    gameBoard.gameArray[index] = "O";
    if (displayController.isGameWin()) {
      h1.innerHTML = `${player1.name} won!`;
    }
  } else {
    btn.innerText = "X";
    displayController.turn = player1.name;
    gameBoard.gameArray[index] = "X";
    if (displayController.isGameWin()) {
      h1.innerHTML = `${player2.name} won!`;
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
    btn.setAttribute("onclick", `render(${i})`);
    btn.removeAttribute("disabled", "disabled");
  }
}
