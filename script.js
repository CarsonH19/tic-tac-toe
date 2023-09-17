// Tic-Tac-Toe 




// Module Pattern for the gameboard
const Gameboard = (() => {
    const board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ];

    //Public methods
    const getBoard = () => board;

    const addPiece = (row, col, piece) => {
        //add logic here
    }

    const clearBoard = () => {
        //Clear board logic here
    }

    return {
      getBoard,
      addPiece,
      clearBoard
    };
  })();


// Factory Function for creating players
const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;

    const makeMove = (row,col) => {
        //add logic here
    }

    return {
        getName,
        getSymbol,
        makeMove
    };
};


// Module Pattern for controlling the flow of the game
  function playGame ((){
    const player1 = Player('Player 1', 'X')
    const player2 = Player('PLayer 2', 'O')
    let currentPlayer = player1;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2: player1;
    }

    const makeMove = (row, col) => {
        //add logic here
        switchPlayer();
    }

    return {
        makeMove,
    };
  })();


  const renderBoard = () => {
    const boardElement = document.getElementById('board');
    const board = Gameboard.getBoard();

    boardElement.innerHTML = ''; // Clear previous content

    board.forEach((row, i) => {
      row.forEach((cell, j) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.dataset.row = i;
        cellElement.dataset.col = j;
        cellElement.textContent = cell || ''; // Show symbol or empty string
        cellElement.addEventListener('click', handleCellClick);

        boardElement.appendChild(cellElement);
      });
    });
  };

  

  const handleCellClick = (event) => {
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);

    // Check if the cell is empty before making a move
    if (Gameboard.addPiece(row, col, GameControl.getCurrentPlayer().getSymbol())) {
      renderBoard(); // Update the board visually

      // Optionally, check for game over conditions or switch players here
    }
  };

  // Start the game
  renderBoard();