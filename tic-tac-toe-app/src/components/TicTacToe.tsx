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
    <div className="h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4">
      {/* Title Section */}
      <div className="text-center mb-4">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-2 neon-title">
          Tic-Tac-Toe
        </h1>
      </div>

      {/* Main Game Area - Flex Container */}
      <div className="h-[calc(100vh-120px)] max-w-[1400px] mx-auto flex flex-col lg:flex-row justify-center items-start gap-4 lg:gap-8">
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
        <div className="flex-1 w-full lg:w-auto flex flex-col gap-4">
          {/* Game Mode Selection */}
          <div className="p-4 border-2 border-purple-400 rounded-lg bg-gray-800/50 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-3 text-center neon-text">
              Game Mode
            </h2>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setGameMode('pvp')}
                className={`px-4 py-2 rounded-lg font-bold text-base transition-all duration-300
                  ${gameMode === 'pvp'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-400/50'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
              >
                Player vs Player
              </button>
              <button
                onClick={() => setGameMode('ai')}
                className={`px-4 py-2 rounded-lg font-bold text-base transition-all duration-300
                  ${gameMode === 'ai'
                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-400/50'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
              >
                Player vs AI
              </button>
            </div>

            {/* AI Difficulty Selection */}
            {gameMode === 'ai' && (
              <div className="mt-3">
                <h3 className="text-lg font-bold text-white mb-2">AI Difficulty</h3>
                <div className="grid grid-cols-3 gap-2">
                  {(['easy', 'medium', 'unbeatable'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setDifficulty(level)}
                      className={`px-2 py-1 rounded-lg font-bold transition-all duration-300 text-sm
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

          {/* Score Board with Help Icon */}
          <div className="p-4 border-2 border-purple-400 rounded-lg bg-gray-800/50 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-2xl font-bold text-white text-center neon-text">
                Score Board
              </h2>
              <div className="group relative">
                <button className="w-6 h-6 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 
                                 flex items-center justify-center text-sm font-bold
                                 transition-all duration-300 hover:text-white
                                 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50">
                  ?
                </button>
                {/* Tooltip */}
                <div className="absolute right-0 w-64 p-4 mt-2 bg-gray-900/95 backdrop-blur-sm
                               border-2 border-cyan-400 rounded-lg shadow-xl
                               invisible group-hover:visible opacity-0 group-hover:opacity-100
                               transition-all duration-300 z-50
                               text-sm text-gray-300">
                  <div className="space-y-2">
                    <p>• Player X starts first</p>
                    <p>• Click any empty square to move</p>
                    <p>• Get three in a row to win</p>
                    {gameMode === 'ai' && (
                      <div className="mt-2 pt-2 border-t border-gray-700">
                        <p className="font-semibold text-cyan-400">AI Modes:</p>
                        <p>• Easy: Random moves</p>
                        <p>• Medium: Smart & random</p>
                        <p>• Unbeatable: Perfect AI</p>
                      </div>
                    )}
                  </div>
                  {/* Tooltip Arrow */}
                  <div className="absolute -top-2 right-2 w-4 h-4 bg-gray-900/95 border-t-2 border-l-2 
                                 border-cyan-400 transform rotate-45"></div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 border-2 border-red-400/30 rounded-lg bg-gray-900/50">
                <div className="text-2xl font-bold text-red-400 mb-1">{score.X}</div>
                <div className="text-xs text-red-300">Player X</div>
              </div>
              <div className="p-3 border-2 border-gray-400/30 rounded-lg bg-gray-900/50">
                <div className="text-2xl font-bold text-gray-400 mb-1">{score.draws}</div>
                <div className="text-xs text-gray-300">Draws</div>
              </div>
              <div className="p-3 border-2 border-blue-400/30 rounded-lg bg-gray-900/50">
                <div className="text-2xl font-bold text-blue-400 mb-1">{score.O}</div>
                <div className="text-xs text-blue-300">
                  {gameMode === 'ai' ? 'AI' : 'Player O'}
                </div>
              </div>
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={resetScore}
            className="w-full px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 
                     hover:from-purple-500 hover:to-pink-500 
                     text-white font-bold rounded-lg text-base
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
      </div>
    </div>
  );
} 