type Player = 'X' | 'O';
type BoardState = (Player | null)[];

interface MinimaxResult {
  score: number;
  move: number;
}

// Check if there's a winner
function checkWinner(board: BoardState): Player | null | 'draw' {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Check for winner
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  // Check for draw
  if (board.every(cell => cell !== null)) {
    return 'draw';
  }

  return null;
}

// Get available moves
function getAvailableMoves(board: BoardState): number[] {
  return board
    .map((cell, index) => (cell === null ? index : null))
    .filter((index): index is number => index !== null);
}

// Minimax algorithm implementation
function minimax(
  board: BoardState,
  depth: number,
  isMaximizing: boolean,
  aiPlayer: Player,
  humanPlayer: Player
): MinimaxResult {
  const result = checkWinner(board);

  // Base cases
  if (result === aiPlayer) return { score: 10 - depth, move: -1 };
  if (result === humanPlayer) return { score: depth - 10, move: -1 };
  if (result === 'draw') return { score: 0, move: -1 };

  const availableMoves = getAvailableMoves(board);
  
  // If no moves are available, return a neutral score
  if (availableMoves.length === 0) {
    return { score: 0, move: -1 };
  }

  let bestMove = -1;
  let bestScore = isMaximizing ? -Infinity : Infinity;

  for (const move of availableMoves) {
    // Make the move
    board[move] = isMaximizing ? aiPlayer : humanPlayer;

    // Recursively evaluate the position
    const score = minimax(
      board,
      depth + 1,
      !isMaximizing,
      aiPlayer,
      humanPlayer
    ).score;

    // Undo the move
    board[move] = null;

    // Update best score
    if (isMaximizing) {
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    } else {
      if (score < bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
  }

  return { score: bestScore, move: bestMove };
}

// Function to get the best move for the AI
export function getBestMove(board: BoardState, aiPlayer: Player = 'O', humanPlayer: Player = 'X'): number {
  const result = minimax(board, 0, true, aiPlayer, humanPlayer);
  return result.move;
}

// Function to get a random valid move (for easy mode)
export function getRandomMove(board: BoardState): number {
  const availableMoves = getAvailableMoves(board);
  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  return availableMoves[randomIndex];
}

// Function to get a move based on difficulty
export function getAIMove(board: BoardState, difficulty: 'easy' | 'medium' | 'unbeatable'): number {
  if (difficulty === 'easy') {
    return getRandomMove(board);
  }
  
  if (difficulty === 'medium') {
    // 50% chance of making the best move, 50% chance of making a random move
    return Math.random() < 0.5 ? getBestMove(board) : getRandomMove(board);
  }
  
  // Unbeatable mode - always use minimax
  return getBestMove(board);
} 