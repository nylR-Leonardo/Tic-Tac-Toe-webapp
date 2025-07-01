'use client';

import { useState, useEffect } from 'react';
import Square from './Square';
import { getAIMove } from '../utils/minimax';

type Player = 'X' | 'O';
type BoardState = (Player | null)[];
type GameMode = 'pvp' | 'ai';
type Difficulty = 'easy' | 'medium' | 'unbeatable';

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
  gameMode: GameMode;
  difficulty: Difficulty;
}

export default function GameBoard({ onGameEnd, gameMode, difficulty }: GameBoardProps) {
  const [squares, setSquares] = useState<BoardState>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  const { winner, winningLine } = calculateWinner(squares);
  const isDraw = !winner && squares.every(square => square !== null);

  const makeMove = (i: number) => {
    if (squares[i] || winner || (gameMode === 'ai' && !isXNext && !isThinking)) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = isXNext ? 'X' : 'O';
    setSquares(nextSquares);
    setIsXNext(!isXNext);
  };

  useEffect(() => {
    if ((winner || isDraw) && !gameOver) {
      setGameOver(true);
      onGameEnd(winner, isDraw);
    }
  }, [winner, isDraw, gameOver, onGameEnd]);

  // AI move effect
  useEffect(() => {
    if (gameMode === 'ai' && !isXNext && !winner && !isDraw) {
      setIsThinking(true);
      // Add a small delay to make AI moves feel more natural
      const timeoutId = setTimeout(() => {
        const aiMove = getAIMove(squares, difficulty);
        makeMove(aiMove);
        setIsThinking(false);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [isXNext, gameMode, squares, winner, isDraw, difficulty, makeMove]);

  function resetGame() {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setGameOver(false);
    setIsThinking(false);
  }

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "It's a draw!";
  } else if (isThinking) {
    status = "AI is thinking...";
  } else {
    status = `Next player: ${isXNext ? 'X' : 'O'}`;
  }

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="text-3xl sm:text-4xl font-bold text-white mb-4 neon-text">
        {status}
      </div>
      
      <div className={`
        grid grid-cols-3 gap-3 sm:gap-4 p-6 sm:p-8 border-4 border-cyan-400 rounded-xl 
        bg-gray-800/50 backdrop-blur-sm transition-opacity duration-300
        ${isThinking ? 'opacity-70' : 'opacity-100'}
      `}>
        {squares.map((square, i) => (
          <Square
            key={i}
            value={square}
            onSquareClick={() => makeMove(i)}
            winningSquare={winningLine?.includes(i)}
            disabled={isThinking}
          />
        ))}
      </div>

      {(winner || isDraw) && (
        <button
          onClick={resetGame}
          className="px-12 py-4 text-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg
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