'use client';

interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
  winningSquare?: boolean;
  disabled?: boolean;
}

export default function Square({ value, onSquareClick, winningSquare, disabled }: SquareProps) {
  return (
    <button
      className={`
        w-20 h-20 sm:w-24 sm:h-24 border-4 border-cyan-400 bg-gray-900 
        text-4xl sm:text-5xl font-bold text-white
        transition-all duration-300 ease-in-out
        hover:bg-gray-800 hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-400/50
        active:scale-95 game-square
        ${winningSquare ? 'victory-square bg-emerald-800 border-emerald-400' : ''}
        ${value === 'X' ? 'text-red-400 shadow-red-400/30' : value === 'O' ? 'text-blue-400 shadow-blue-400/30' : ''}
        ${disabled ? 'cursor-not-allowed opacity-70' : ''}
        focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50
        relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-cyan-400/20 before:to-transparent
        before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700
      `}
      onClick={onSquareClick}
      disabled={value !== null || disabled}
    >
      <span className={`relative z-10 ${value ? 'drop-shadow-lg' : ''}`}>
        {value}
      </span>
    </button>
  );
} 