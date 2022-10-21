
// Who's turn is it?
let turn = "X";

function clickTile(x, y, event) {
  const htmlElement = event.target;

  // Tile may already be occupied
  if (htmlElement.innerHTML != "") {
    return;
  }

  if (turn == "X") { // If "X"s turn
    htmlElement.innerHTML = "X"; // Set tile to X
    grid[y][x] = "X";
    turn = "O"; // Make it "O"s turn
  } else { // If "O"s turn
    htmlElement.innerHTML = "O"; // Set tile to O
    grid[y][x] = "O"; // Make it "O"s turn
    turn = "X";
  }

  // Make the cursor say "not allowed"
  htmlElement.style.cursor = "not-allowed";

  // Compute the winner
  const winner = checkWin();

  if (winner != null) { // If someone won
    const announcement = document.getElementById("announcement");
    announcement.innerHTML = `"${winner}"s wins!`; // Announce it!
  }
}

// Pure logic to check if the grid is in a winning condition
// Could be done in any language

// What is the current state of the grid?
const grid = pattern(() => null);

const patterns = [
  column(0), column(1), column(2),
  row(0), row(1), row(2),
  diagonal(false), diagonal(true)
]

function checkWin() {

  return patterns.map(checkPattern).find(v => v !== false);

}

function checkPattern(pattern) {

  let sameSymbol = null;

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {

      const required = pattern[row][col];

      if (!required) continue;

      const symbol = grid[row][col];

      if (symbol == null) {
        return false;
      }

      if (sameSymbol == null) {
        sameSymbol = symbol;
      } else {
        if (sameSymbol != symbol) {
          return false;
        }
      }

    }
  }

  return sameSymbol;

}

function pattern(eval) {
  const grid = [];

  for (let row = 0; row < 3; row++) {
    const rowList = [];
    grid.push(rowList);
    for (let col = 0; col < 3; col++) {
      rowList.push(eval(col, row));
    }
  }

  return grid;
}

function diagonal(opposite) {
  if (opposite) {
    return pattern((col, row) => 2 - col == row);
  } else {
    return pattern((col, row) => col == row);
  }
}

function column(c) {
  return pattern((col, row) => c == col);
}

function row(r) {
  return pattern((col, row) => r == row);
}
