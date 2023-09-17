// Tic-Tac-Toe 

// Define Gameboard Module
const Gameboard = (() => {
  let board = [];

  const resetBoard = () => {
    board = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
  }

  const getBoard = () => board;

  const addPiece = (row, col, piece) => {
    if (board[row][col] === null) {
      board[row][col] = piece;
      return true; // Return true if piece was successfully added
    }
    return false; // Return false if the cell is already occupied
  }

  const checkForWinner = () => {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (board[i][0] !== null && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        return board[i][0]; // Return the winning player symbol
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (board[0][i] !== null && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        return board[0][i];
      }
    }

    // Check diagonals
    if (board[0][0] !== null && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      return board[0][0];
    }
    if (board[0][2] !== null && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      return board[0][2];
    }

    // Check for a tie
    if (!board.flat().includes(null)) {
      return 'tie';
    }

    return null; // Return null if the game is not over yet
  }

  return {
    resetBoard,
    getBoard,
    addPiece,
    checkForWinner,
  };
})();

// Player Function Factory
const Player = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;
  const setName = (newName) => { playerName = newName };

  return {
    getName,
    getSymbol,
    setName,
  };
};

// Game Control Module Pattern
const GameControl = (() => {
  let player1, player2, currentPlayer;
  let gameOver = false;

  const setPlayers = (name1, name2) => {
    player1 = Player(name1, 'X');
    player2 = Player(name2, 'O');
    currentPlayer = player1;
  }

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }

  const makeMove = (row, col) => {
    if (!gameOver) {
      const currentPlayerSymbol = currentPlayer.getSymbol();

      if (Gameboard.addPiece(row, col, currentPlayerSymbol)) {
        const winner = Gameboard.checkForWinner();
        if (winner) {
          gameOver = true;
          displayWinner(winner);
        } else {
          switchPlayer();
        }
      }
    }
  }

  const restartGame = () => {
    gameOver = false;
    Gameboard.resetBoard();
    displayBoard();
  }

  const displayWinner = (winner) => {
    const displayElement = document.getElementsByClassName('display')[0]; 
    const playAgainButton = document.getElementById('play-again');
  
    if (winner === 'tie') {
      displayElement.textContent = "It's a tie!";
    } else {
      const winningPlayer = winner === player1.getSymbol() ? player1 : player2; 
      displayElement.textContent = `${winningPlayer.getName()} wins!`; 
    }
  
    playAgainButton.style.display = 'block'; 
  }

  return {
    setPlayers,
    makeMove,
    restartGame,
  };
})();

// Display Gameboard on Webpage using DOM manipulation
const displayBoard = () => {
  const boardElement = document.getElementById('board');
  boardElement.innerHTML = '';

  Gameboard.getBoard().forEach((row, rowIndex) => {
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');

    row.forEach((cell, colIndex) => {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      cellElement.dataset.row = rowIndex;
      cellElement.dataset.col = colIndex;
      cellElement.textContent = cell || '';

      cellElement.addEventListener('click', () => {
        GameControl.makeMove(rowIndex, colIndex);
        cellElement.textContent = Gameboard.getBoard()[rowIndex][colIndex] || '';
      });

      rowElement.appendChild(cellElement);
    });

    boardElement.appendChild(rowElement);
  });
};

// Start the game
const startGame = () => {
  const player1Name = prompt('Enter Player 1 name:');
  const player2Name = prompt('Enter Player 2 name:');
  GameControl.setPlayers(player1Name, player2Name);
  Gameboard.resetBoard();
  displayBoard();
  const displayElement = document.getElementsByClassName('display');
  displayElement[0].textContent = '';
}

// Play again button
document.getElementById('play-again').addEventListener('click', () => {
    GameControl.restartGame();
    document.getElementById('play-again').style.display = 'none'; // Hide the button again
  });

// Initialize the game
startGame();

