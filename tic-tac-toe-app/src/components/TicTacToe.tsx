'use client';

import { useState } from 'react';
import GameBoard from './GameBoard';

type Player = 'X' | 'O';

interface Score {
  X: number;
  O: number;
  draws: number;
}

export default function TicTacToe() {
  const [score, setScore] = useState<Score>({ X: 0, O: 0, draws: 0 });
  const [gameKey, setGameKey] = useState(0);

  function handleGameEnd(winner: Player | null, isDraw: boolean) {
    if (winner) {
      setScore(prev => ({ ...prev, [winner]: prev[winner] + 1 }));
    } else if (isDraw) {
      setScore(prev => ({ ...prev, draws: prev.draws + 1 }));
    }
  }

  function resetScore() {
    setScore({ X: 0, O: 0, draws: 0 });
    setGameKey(prev => prev + 1);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex flex-col items-center justify-center p-8">
      <div className="text-center mb-8">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-4 neon-title">
          Tic-Tac-Toe
        </h1>
        <p className="text-gray-300 text-lg">
          A futuristic neon-styled Tic-Tac-Toe game
        </p>
      </div>

      {/* Score Board */}
      <div className="mb-8 p-6 border-2 border-purple-400 rounded-lg bg-gray-800/50 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-white mb-4 text-center neon-text">
          Score Board
        </h2>
        <div className="flex gap-8 text-center">
          <div className="text-red-400">
            <div className="text-2xl font-bold">{score.X}</div>
            <div className="text-sm">Player X</div>
          </div>
          <div className="text-gray-400">
            <div className="text-2xl font-bold">{score.draws}</div>
            <div className="text-sm">Draws</div>
          </div>
          <div className="text-blue-400">
            <div className="text-2xl font-bold">{score.O}</div>
            <div className="text-sm">Player O</div>
          </div>
        </div>
      </div>

      {/* Game Board */}
      <GameBoard key={gameKey} onGameEnd={handleGameEnd} />

      {/* Reset Button */}
      <div className="mt-8">
        <button
          onClick={resetScore}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 
                     hover:from-purple-500 hover:to-pink-500 
                     text-white font-bold rounded-lg text-lg
                     transition-all duration-300 ease-in-out
                     hover:shadow-lg hover:shadow-purple-400/50
                     focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50
                     transform hover:scale-105 active:scale-95
                     border-2 border-purple-400 hover:border-pink-400
                     neon-glow"
        >
          Reset Score
        </button>
      </div>

      {/* Game Instructions */}
      <div className="mt-8 max-w-md text-center text-gray-400 text-sm">
        <p>
          Take turns placing X's and O's. Get three in a row to win!
        </p>
      </div>
    </div>
  );
} 