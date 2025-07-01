'use client';

import { useState } from 'react';
import Square from './Square';

type Player = 'X' | 'O';
type BoardState = (Player | null)[];

function calculateWinner(squares: BoardState): { winner: Player | null; winningLine: number[] | null } {
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

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winningLine: lines[i] };
    }
  }
  return { winner: null, winningLine: null };
}

interface GameBoardProps {
  onGameEnd: (winner: Player | null, isDraw: boolean) => void;
}

export default function GameBoard({ onGameEnd }: GameBoardProps) {
  const [squares, setSquares] = useState<BoardState>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const { winner, winningLine } = calculateWinner(squares);
  const isDraw = !winner && squares.every(square => square !== null);

  if ((winner || isDraw) && !gameOver) {
    setGameOver(true);
    onGameEnd(winner, isDraw);
  }

  function handleClick(i: number) {
    if (squares[i] || winner) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = isXNext ? 'X' : 'O';
    setSquares(nextSquares);
    setIsXNext(!isXNext);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setGameOver(false);
  }

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${isXNext ? 'X' : 'O'}`;
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="text-2xl font-bold text-white mb-4 neon-text">
        {status}
      </div>
      
      <div className="grid grid-cols-3 gap-2 p-4 border-2 border-cyan-400 rounded-lg bg-gray-800/50 backdrop-blur-sm">
        {squares.map((square, i) => (
          <Square
            key={i}
            value={square}
            onSquareClick={() => handleClick(i)}
            winningSquare={winningLine?.includes(i)}
          />
        ))}
      </div>

      {(winner || isDraw) && (
        <button
          onClick={resetGame}
          className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg
                     transition-all duration-300 ease-in-out
                     hover:shadow-lg hover:shadow-cyan-400/50
                     focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50"
        >
          Play Again
        </button>
      )}
    </div>
  );
} 