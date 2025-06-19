"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home, Share2, Trophy, Clock, Shuffle } from "lucide-react";
import Link from "next/link";

type PuzzleSize = 3 | 4 | 5;

export default function SlidingPuzzlePage() {
  const [size, setSize] = useState<PuzzleSize>(3);
  const [tiles, setTiles] = useState<number[]>([]);
  const [emptyIndex, setEmptyIndex] = useState(0);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [bestScore, setBestScore] = useState<{
    moves: number;
    time: number;
  } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(`puzzle-best-${size}x${size}`);
    if (saved) setBestScore(JSON.parse(saved));
  }, [size]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && !isComplete) {
      timer = setInterval(() => setTime((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, isComplete]);

  const initializePuzzle = () => {
    const totalTiles = size * size;
    const newTiles = Array.from({ length: totalTiles - 1 }, (_, i) => i + 1);
    newTiles.push(0); // Empty space

    // Shuffle until solvable
    do {
      for (let i = newTiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newTiles[i], newTiles[j]] = [newTiles[j], newTiles[i]];
      }
    } while (!isSolvable(newTiles));

    setTiles(newTiles);
    setEmptyIndex(newTiles.indexOf(0));
    setMoves(0);
    setTime(0);
    setIsPlaying(true);
    setIsComplete(false);
  };

  const isSolvable = (puzzle: number[]) => {
    let inversions = 0;
    const filtered = puzzle.filter((tile) => tile !== 0);

    for (let i = 0; i < filtered.length - 1; i++) {
      for (let j = i + 1; j < filtered.length; j++) {
        if (filtered[i] > filtered[j]) inversions++;
      }
    }

    if (size % 2 === 1) {
      return inversions % 2 === 0;
    } else {
      const emptyRow = Math.floor(puzzle.indexOf(0) / size);
      return (inversions + emptyRow) % 2 === 1;
    }
  };

  const canMove = (index: number) => {
    const row = Math.floor(index / size);
    const col = index % size;
    const emptyRow = Math.floor(emptyIndex / size);
    const emptyCol = emptyIndex % size;

    return (
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
      (Math.abs(col - emptyCol) === 1 && row === emptyRow)
    );
  };

  const moveTile = (index: number) => {
    if (!canMove(index) || isComplete) return;

    const newTiles = [...tiles];
    [newTiles[index], newTiles[emptyIndex]] = [
      newTiles[emptyIndex],
      newTiles[index],
    ];

    setTiles(newTiles);
    setEmptyIndex(index);
    setMoves((prev) => prev + 1);

    // Check if solved
    const solved = newTiles.every((tile, i) =>
      i === newTiles.length - 1 ? tile === 0 : tile === i + 1
    );

    if (solved) {
      setIsComplete(true);
      setIsPlaying(false);

      if (
        !bestScore ||
        moves + 1 < bestScore.moves ||
        (moves + 1 === bestScore.moves && time < bestScore.time)
      ) {
        const newBest = { moves: moves + 1, time };
        setBestScore(newBest);
        localStorage.setItem(
          `puzzle-best-${size}x${size}`,
          JSON.stringify(newBest)
        );
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container px-4 py-8 mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/games">
            <Button variant="outline" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Back to Games
            </Button>
          </Link>

          <h1 className="text-3xl font-bold text-transparent md:text-4xl bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text">
            Sliding Puzzle
          </h1>

          <Button variant="outline" className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Player Name Input */}
          {!playerName && (
            <div className="p-6 mb-8 bg-white rounded-2xl shadow-lg">
              <h3 className="mb-4 text-xl font-semibold text-center">
                Enter Your Name
              </h3>
              <Input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Your name"
                className="text-center"
              />
            </div>
          )}

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <select
                value={size}
                onChange={(e) =>
                  setSize(Number.parseInt(e.target.value) as PuzzleSize)
                }
                className="px-4 py-2 border border-gray-200 rounded-lg"
                disabled={isPlaying}
              >
                <option value={3}>3×3 (Easy)</option>
                <option value={4}>4×4 (Medium)</option>
                <option value={5}>5×5 (Hard)</option>
              </select>

              <Button
                onClick={initializePuzzle}
                disabled={!playerName.trim()}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700"
              >
                <Shuffle className="w-4 h-4" />
                New Game
              </Button>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow">
                <Trophy className="w-4 h-4 text-green-600" />
                <span className="font-semibold">{moves} moves</span>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="font-semibold">{formatTime(time)}</span>
              </div>
            </div>
          </div>

          {/* Best Score */}
          {bestScore && (
            <div className="p-4 mb-8 bg-yellow-50 border border-yellow-200 rounded-xl">
              <div className="text-center">
                <span className="text-yellow-800 font-semibold">
                  Best Score ({size}×{size}): {bestScore.moves} moves in{" "}
                  {formatTime(bestScore.time)}
                </span>
              </div>
            </div>
          )}

          {/* Puzzle Grid */}
          <div className="p-8 bg-white rounded-3xl shadow-2xl">
            <div
              className={`grid gap-2 mx-auto max-w-md`}
              style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
            >
              {tiles.map((tile, index) => (
                <motion.div
                  key={`${tile}-${index}`}
                  whileHover={canMove(index) ? { scale: 1.05 } : {}}
                  whileTap={canMove(index) ? { scale: 0.95 } : {}}
                  onClick={() => moveTile(index)}
                  className={`
                    aspect-square flex items-center justify-center text-2xl font-bold rounded-xl transition-all duration-200
                    ${
                      tile === 0
                        ? "bg-transparent"
                        : canMove(index)
                        ? "bg-gradient-to-br from-blue-500 to-orange-500 text-white cursor-pointer hover:from-blue-600 hover:to-orange-600 shadow-lg"
                        : "bg-gradient-to-br from-gray-400 to-gray-500 text-white shadow-lg"
                    }
                  `}
                >
                  {tile !== 0 && tile}
                </motion.div>
              ))}
            </div>

            {/* Game Complete */}
            {isComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 text-center"
              >
                <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-200">
                  <div className="text-4xl mb-4">🎉</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Puzzle Solved!
                  </h3>
                  <p className="text-lg text-gray-600 mb-4">
                    Completed in {moves} moves and {formatTime(time)}
                  </p>
                  <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
                    <Button
                      onClick={initializePuzzle}
                      className="bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700"
                    >
                      Play Again
                    </Button>
                    <Link href="/games">
                      <Button variant="outline">Try Other Games</Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Instructions */}
          <div className="p-6 mt-8 bg-white rounded-2xl shadow-lg">
            <h3 className="mb-4 text-xl font-semibold">How to Play</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Click on tiles adjacent to the empty space to move them</li>
              <li>
                • Arrange the numbers in order from 1 to {size * size - 1}
              </li>
              <li>• The empty space should be in the bottom-right corner</li>
              <li>• Try to solve it in the fewest moves and shortest time!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
