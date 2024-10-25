const game = document.getElementById('game');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-index');

    if (board[cellIndex] !== '' || !gameActive) {
        return;
    }

    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        alert(currentPlayer + ' wins!');
        gameActive = false;
        return;
    }

    if (board.every(cell => cell !== '')) {
        alert('Draw!');
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    for (let condition of winningConditions) {
        let [a, b, c] = condition;
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}
function highlightWinningCells() {
    const winningCells = checkWinner();
    if (winningCells) {
        winningCells.forEach(index => {
            cells[index].classList.add('winning-cell');
        });
    }
}
function resetGame() {
 
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => cell.textContent = '');
}
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);