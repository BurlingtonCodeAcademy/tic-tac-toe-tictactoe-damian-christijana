//Start Game

//DOM
let start = document.getElementById("start");
let status = document.getElementsByClassName("status");
let compMove = document.getElementById("compMove");
let gameTimer = document.getElementById("game-timer");
let playerTurn = document.getElementById("player-turn");
let winnerContainer = document.getElementById("winner-container");
let onePlayerStart = document.getElementById("1P-Start");
let twoPlayerStart = document.getElementById("2P-Start");
let cell0 = document.getElementById("cell-0");
let cell1 = document.getElementById("cell-1");
let cell2 = document.getElementById("cell-2");
let cell3 = document.getElementById("cell-3");
let cell4 = document.getElementById("cell-4");
let cell5 = document.getElementById("cell-5");
let cell6 = document.getElementById("cell-6");
let cell7 = document.getElementById("cell-7");
let cell8 = document.getElementById("cell-8");

//Global variables to be altered in various functions
let gameMode;
let winner;
let playerScore = 0;
let compScore = 0;
let timer;
let seconds = 0;
let xPlayer = "X";
let oPlayer = "O";
let currentPlayer = xPlayer;

//Array of cells

let cells = [cell0, cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8];
// Empty variable array of used cells
let usedCells = [];

//Win conditions, zero indexed
let winCondition = {
  row1: [cell0, cell1, cell2],
  row2: [cell3, cell4, cell5],
  row3: [cell6, cell7, cell8],
  vertical1: [cell0, cell3, cell6],
  vertical2: [cell1, cell4, cell7],
  vertical3: [cell2, cell5, cell8],
  diagonal1: [cell0, cell4, cell8],
  diagonal2: [cell6, cell4, cell2],
};

//Start game
function startGame(event) {
  console.log(cells);
  cells.forEach((cell) => {
    cell.addEventListener("click", fillCell);
  });
  // Every second on the second this keeps the time
  timer = setInterval(incrementSeconds, 1000);
  console.log(gameMode);
}

// //fills cells with appropriate markers and switches players, plays game
function fillCell(event) {
  console.log(gameMode);
  if (gameMode === "2P-Start") {
    // Setup allows for player switching between two players
    if ((currentPlayer = xPlayer)) {
      event.target.textContent = "X";
      usedCells.push(event.target);
    } else if ((currentPlayer = oPlayer)) {
      event.target.textContent = "O";
      usedCells.push(event.target);
    }
    // Singleplayer setup
  } else if ((gameMode = "1P-Start")) {
    if ((currentPlayer = xPlayer)) {
      event.target.textContent = "X";
      usedCells.push(event.target);
      if (usedCells.length < 9) {
        //Unfinished computer moveset
      }
    } else if ((currentPlayer = oPlayer)) {
      event.target.textContent = "O";
      usedCells.push(event.target);
    }
  }
  youWin();
  switchPlayer();
  removeFillCell(event);
}

//stops filling Cells
function removeFillCell(event) {
  event.target.removeEventListener("click", fillCell);
  console.log("no longer clickable");
}

//seconds timer starts
function incrementSeconds() {
  seconds += 1;
  if (seconds < 10) {
    gameTimer.textContent = "0" + seconds;
  } else {
    gameTimer.textContent = seconds;
  }
}

//stops timer
function stopTimer() {
  clearInterval(timer);
}
// Function to switch the active player
function switchPlayer() {
  if (currentPlayer === xPlayer) {
    currentPlayer = oPlayer;
    playerTurn.textContent = currentPlayer;
    console.log(currentPlayer);
  } else if (currentPlayer === oPlayer) {
    currentPlayer = xPlayer;
    playerTurn.textContent = currentPlayer;
    console.log(currentPlayer);
  }
}

//Win function
function youWin() {
  for (let combo of Object.values(winCondition)) {
    if (combo[0].textContent === "") {
    } else if (
      combo[0].textContent === combo[1].textContent &&
      combo[0].textContent === combo[2]
    ) {
      winner = true;
      winnerContainer.textContent = currentPlayer + " is the winner!";
      stopTimer();
    }
  }
  tieGame();
}
//Tiebreaker function
function tieGame() {
  if (usedCells.length === 9 && winner === null) {
    winnerContainer.textContent = " Tie game. Wow.";
    stopTimer();
  }
}
// Starts the one player game and sets the current player, then targets the cells for use
onePlayerStart.addEventListener("click", () => {
  onePlayerStart.disabled = true;
  twoPlayerStart.disabled = true;
  playerTurn.textContent = currentPlayer;
  gameMode = "1P-Start";
  startGame(gameMode, cells);
});
// Same as the one player game, but for the two player game
twoPlayerStart.addEventListener("click", () => {
  onePlayerStart.disabled = true;
  twoPlayerStart.disabled = true;
  playerTurn.textContent = currentPlayer;
  gameMode = "2P-Start";
  startGame(gameMode, cells);
});
