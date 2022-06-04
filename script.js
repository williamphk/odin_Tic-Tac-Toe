const Player = (name) => {
  return { name };
};

const player1 = Player("player1");
const player2 = Player("player2");

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
    return gameBoard.gameArray.every((element) => element === null);
  }
  return { turn: turn, isGameWin: isGameWin, isGameTie: isGameTie };
})();

function render(index) {
  let btn = document.getElementById(index);
  const allBtn = document.querySelectorAll("button");
  btn.removeAttribute("onclick");
  if (displayController.turn === player1.name) {
    btn.innerText = "O";
    displayController.turn = player2.name;
    gameBoard.gameArray[index] = "O";
  } else {
    btn.innerText = "X";
    displayController.turn = player1.name;
    gameBoard.gameArray[index] = "X";
  }
  if (displayController.isGameWin()) {
    allBtn.forEach((btn) => btn.setAttribute("disabled", "disabled"));
  }
  if (displayController.isGameTie()) {
    allBtn.forEach((btn) => btn.setAttribute("disabled", "disabled"));
  }
}
