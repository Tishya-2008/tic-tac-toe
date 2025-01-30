const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('reset-btn');
const winnerDisplay = document.getElementById('winner');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function checkWinner() {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameOver = true;
            winnerDisplay.textContent = `Player ${gameBoard[a]} wins!`;
            return;
        }
    }
    if (!gameBoard.includes('')) {
        gameOver = true;
        winnerDisplay.textContent = "It's a tie!";
    }
}

function handleCellClick(e) {
    const index = e.target.dataset.index;
    if (gameBoard[index] || gameOver) return;

    gameBoard[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    checkWinner();

    if (!gameOver) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    winnerDisplay.textContent = '';
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetBtn.addEventListener('click', resetGame);