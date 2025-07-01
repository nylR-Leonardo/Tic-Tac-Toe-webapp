'use client';

import { useState } from 'react';
import GameBoard from './GameBoard';

type Player = 'X' | 'O';
type GameMode = 'pvp' | 'ai';
type Difficulty = 'easy' | 'medium' | 'unbeatable';

interface Score {
  X: number;
  O: number;
  draws: number;
}

export default function TicTacToe() {
  const [score, setScore] = useState<Score>({ X: 0, O: 0, draws: 0 });
  const [gameKey, setGameKey] = useState(0);
  const [gameMode, setGameMode] = useState<GameMode>('pvp');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-8">
      {/* Title Section */}
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-4 neon-title">
          Tic-Tac-Toe
        </h1>
        <p className="text-gray-300 text-lg">
          A futuristic neon-styled Tic-Tac-Toe game
        </p>
      </div>

      {/* Main Game Area - Flex Container */}
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row justify-center items-start gap-8 lg:gap-16">
        {/* Left Side - Game Board */}
        <div className="flex-[1.5] w-full lg:w-auto flex justify-center">
          <GameBoard 
            key={gameKey} 
            onGameEnd={handleGameEnd} 
            gameMode={gameMode}
            difficulty={difficulty}
          />
        </div>

        {/* Right Side - Score and Controls */}
        <div className="flex-1 w-full lg:w-auto flex flex-col gap-8">
          {/* Game Mode Selection */}
          <div className="p-8 border-2 border-purple-400 rounded-lg bg-gray-800/50 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-white mb-6 text-center neon-text">
              Game Mode
            </h2>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => setGameMode('pvp')}
                className={`px-6 py-3 rounded-lg font-bold text-lg transition-all duration-300
                  ${gameMode === 'pvp'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-400/50'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
              >
                Player vs Player
              </button>
              <button
                onClick={() => setGameMode('ai')}
                className={`px-6 py-3 rounded-lg font-bold text-lg transition-all duration-300
                  ${gameMode === 'ai'
                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-400/50'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
              >
                Player vs AI
              </button>
            </div>

            {/* AI Difficulty Selection */}
            {gameMode === 'ai' && (
              <div className="mt-6">
                <h3 className="text-xl font-bold text-white mb-4">AI Difficulty</h3>
                <div className="grid grid-cols-3 gap-3">
                  {(['easy', 'medium', 'unbeatable'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setDifficulty(level)}
                      className={`px-4 py-2 rounded-lg font-bold transition-all duration-300 text-sm
                        ${difficulty === level
                          ? 'bg-pink-600 text-white shadow-lg shadow-pink-400/50'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Score Board */}
          <div className="p-8 border-2 border-purple-400 rounded-lg bg-gray-800/50 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-white mb-6 text-center neon-text">
              Score Board
            </h2>
            <div className="grid grid-cols-3 gap-8 text-center">
              <div className="p-4 border-2 border-red-400/30 rounded-lg bg-gray-900/50">
                <div className="text-3xl font-bold text-red-400 mb-2">{score.X}</div>
                <div className="text-sm text-red-300">Player X</div>
              </div>
              <div className="p-4 border-2 border-gray-400/30 rounded-lg bg-gray-900/50">
                <div className="text-3xl font-bold text-gray-400 mb-2">{score.draws}</div>
                <div className="text-sm text-gray-300">Draws</div>
              </div>
              <div className="p-4 border-2 border-blue-400/30 rounded-lg bg-gray-900/50">
                <div className="text-3xl font-bold text-blue-400 mb-2">{score.O}</div>
                <div className="text-sm text-blue-300">
                  {gameMode === 'ai' ? 'AI' : 'Player O'}
                </div>
              </div>
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={resetScore}
            className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 
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

          {/* Game Instructions */}
          <div className="p-6 border-2 border-cyan-400/30 rounded-lg bg-gray-800/50 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-4 neon-text">How to Play</h3>
            <ul className="text-gray-300 space-y-2">
              <li>• Player X starts first</li>
              <li>• Click any empty square to make your move</li>
              <li>• Get three in a row to win</li>
              {gameMode === 'ai' && (
                <>
                  <li>• Play against AI with different difficulties:</li>
                  <li className="pl-4">- Easy: Makes random moves</li>
                  <li className="pl-4">- Medium: Mix of random and smart moves</li>
                  <li className="pl-4">- Unbeatable: Perfect AI using Minimax</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 