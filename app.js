const GameBoard = () => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => {
    return board;
  };

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };
  const setCell = (index, symbol) => {
    if (board[index] === "") {
      board[index] = symbol;
      return true;
    } else {
      return false;
    }
  };
  const isDraw = (board) => {
    return board.every((cell) => cell !== "");
  };
  const checkWinner = (board) => {
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

    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };
  return { getBoard, resetBoard, setCell, isDraw, checkWinner };
};
const Player = (symbol) => {
  return { symbol };
};

const GameController = () => {
  const playerOne = Player("X");
  const playerTwo = Player("O");
  let currentPlayer = playerOne;
  let round = 1;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  };

  const playTurn = (index) => {
    if (gameBoard.setCell(index, currentPlayer.symbol)) {
      const winner = gameBoard.checkWinner(gameBoard.getBoard());
      if (winner) {
        return "win";
      }
      if (gameBoard.isDraw(gameBoard.getBoard())) {
        return "it's a draw";
      }
      switchPlayer();
      round++;
      return "continue";
    }
  };

  const resetGame = () => {
    gameBoard.resetBoard();
    currentPlayer = playerOne;
  };

  const getCurrentPlayer = () => currentPlayer.symbol;

  return { playTurn, resetGame, getCurrentPlayer };
};

const DisplayController = () => {
  const boardContainer = document.getElementById("board");
  const messageContainer = document.getElementById("message");
  const resetBtn = document.getElementById("resetBtn");

  const renderGame = () => {
    boardContainer.innerHTML = "";

    const board = gameBoard.getBoard();
    board.forEach((cell, index) => {
      const cellElem = document.createElement("div");
      cellElem.classList.add("cell");
      cellElem.innerText = cell;
      cellElem.addEventListener("click", () => {
        const result = gameController.playTurn(index);
        renderGame();
        if (result === "win") {
          messageContainer.innerText = `${gameController.getCurrentPlayer()} wins`;
        }
        if (result === "it's a draw") {
          messageContainer.innerText = "It's a draw!";
        }
      });
      boardContainer.appendChild(cellElem);
    });
  };

  resetBtn.addEventListener("click", () => {
    gameController.resetGame();
    messageContainer.innerText = "";
    renderGame();
  });

  return { renderGame };
};
const gameBoard = GameBoard();
const gameController = GameController();
const displayGame = DisplayController();

displayGame.renderGame();
