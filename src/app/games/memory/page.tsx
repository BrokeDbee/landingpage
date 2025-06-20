"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  RotateCcw,
  Trophy,
  Medal,
  Star,
  Crown,
  Zap,
  Volume2,
  VolumeX,
  Home,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

type Difficulty = "easy" | "medium" | "hard";
type LeaderboardEntry = {
  name: string;
  time: number;
  moves: number;
  difficulty: Difficulty;
  date: string;
  score?: number;
};

const cards = [
  { emoji: "🎓", matched: false },
  { emoji: "📚", matched: false },
  { emoji: "🎯", matched: false },
  { emoji: "🏆", matched: false },
  { emoji: "🎨", matched: false },
  { emoji: "🎮", matched: false },
  { emoji: "🎵", matched: false },
  { emoji: "🎭", matched: false },
  { emoji: "⚽", matched: false },
  { emoji: "🎪", matched: false },
  { emoji: "🎲", matched: false },
  { emoji: "🌟", matched: false },
  { emoji: "🚀", matched: false },
  { emoji: "🎸", matched: false },
  { emoji: "🏀", matched: false },
  { emoji: "🎊", matched: false },
];

const DIFFICULTY_SETTINGS = {
  easy: { pairs: 6, timeLimit: 120 },
  medium: { pairs: 8, timeLimit: 180 },
  hard: { pairs: 12, timeLimit: 240 },
};

export default function MemoryGamePage() {
  const [gameCards, setGameCards] = useState<typeof cards>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [playerName, setPlayerName] = useState("");
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [score, setScore] = useState(100);
  const [isTimeFrozen, setIsTimeFrozen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const savedLeaderboard = localStorage.getItem("memoryGameLeaderboard");
    if (savedLeaderboard) {
      setLeaderboard(JSON.parse(savedLeaderboard));
    }
  }, []);

  useEffect(() => {
    shuffleCards();
  }, [difficulty]);

  useEffect(() => {
    if (gameStarted && !isPlaying) {
      setIsPlaying(true);
    }
  }, [gameStarted, isPlaying]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && !gameComplete && gameStarted && !isTimeFrozen) {
      timer = setInterval(() => {
        setTime((prev) => {
          if (prev >= DIFFICULTY_SETTINGS[difficulty].timeLimit) {
            handleGameOver();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, gameComplete, gameStarted, difficulty, isTimeFrozen]);

  const shuffleCards = () => {
    const numPairs = DIFFICULTY_SETTINGS[difficulty].pairs;
    const pairs = cards.slice(0, numPairs).map((card) => [card, { ...card }]);
    const shuffled = pairs.flat().sort(() => Math.random() - 0.5);

    setGameCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setGameComplete(false);
    setTime(0);
    setIsPlaying(true);
    setGameStarted(false);
    setScore(100);
    setIsTimeFrozen(false);
  };

  const handleGameOver = () => {
    setIsPlaying(false);
    setGameComplete(true);
    const finalScore = calculateScore(time, moves, difficulty);
    setScore(finalScore);

    if (playerName && gameCards.every((card) => card.matched)) {
      const newEntry = {
        name: playerName,
        time,
        moves,
        difficulty,
        date: new Date().toLocaleDateString(),
        score: finalScore,
      };
      const newLeaderboard = [...leaderboard, newEntry]
        .sort((a, b) => (b.score || 0) - (a.score || 0))
        .slice(0, 10);
      setLeaderboard(newLeaderboard);
      localStorage.setItem(
        "memoryGameLeaderboard",
        JSON.stringify(newLeaderboard)
      );
    }
  };

  const calculateScore = (
    time: number,
    moves: number,
    difficulty: Difficulty
  ) => {
    const baseScore = 1000;
    const timeBonus =
      Math.max(0, DIFFICULTY_SETTINGS[difficulty].timeLimit - time) * 10;
    const movePenalty = moves * 5;
    const difficultyMultiplier = {
      easy: 1,
      medium: 1.5,
      hard: 2,
    }[difficulty];

    return Math.floor(
      (baseScore + timeBonus - movePenalty) * difficultyMultiplier
    );
  };

  const handleCardClick = (index: number) => {
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(index) ||
      gameCards[index].matched
    )
      return;

    if (!gameStarted) {
      setGameStarted(true);
    }

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves((prev) => prev + 1);
      const [first, second] = newFlippedCards;

      if (gameCards[first].emoji === gameCards[second].emoji) {
        setGameCards((prev) =>
          prev.map((card, idx) =>
            idx === first || idx === second ? { ...card, matched: true } : card
          )
        );
        setFlippedCards([]);
        setScore((prev) => prev + 10);
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  useEffect(() => {
    if (gameCards.length > 0 && gameCards.every((card) => card.matched)) {
      handleGameOver();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameCards]);

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
            Memory Match
          </h1>

          <Button variant="outline" className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>

        {/* Leaderboard Toggle */}
        <div className="flex justify-center mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowLeaderboard(!showLeaderboard)}
            className="px-6 py-3 text-white transition-all duration-300 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700"
          >
            {showLeaderboard ? "Hide" : "Show"} Leaderboard
          </motion.button>
        </div>

        {/* Leaderboard */}
        <AnimatePresence>
          {showLeaderboard && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="p-6 mb-8 overflow-hidden bg-white shadow-lg rounded-2xl"
            >
              <h3 className="mb-6 text-2xl font-bold text-center text-gray-800">
                🏆 Leaderboard
              </h3>
              {leaderboard.length === 0 ? (
                <p className="text-center text-gray-500">
                  No scores yet. Be the first to play!
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="py-3 text-left">#</th>
                        <th className="py-3 text-left">Name</th>
                        <th className="py-3 text-left">Score</th>
                        <th className="py-3 text-left">Moves</th>
                        <th className="py-3 text-left">Time</th>
                        <th className="py-3 text-left">Difficulty</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboard.map((entry, idx) => (
                        <motion.tr
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="py-3 font-bold">
                            {idx === 0 && (
                              <Crown className="inline w-5 h-5 mr-1 text-yellow-500" />
                            )}
                            {idx === 1 && (
                              <Medal className="inline w-5 h-5 mr-1 text-gray-400" />
                            )}
                            {idx === 2 && (
                              <Medal className="inline w-5 h-5 mr-1 text-orange-500" />
                            )}
                            {idx + 1}
                          </td>
                          <td className="py-3">{entry.name}</td>
                          <td className="py-3 font-semibold">{entry.score}</td>
                          <td className="py-3">{entry.moves}</td>
                          <td className="py-3">{formatTime(entry.time)}</td>
                          <td className="py-3 capitalize">
                            {entry.difficulty}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Game Board */}
        <div className="p-8 bg-white border border-gray-100 shadow-2xl rounded-3xl">
          {/* Game Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50"
              >
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-800">
                  {formatTime(time)}
                </span>
                {isTimeFrozen && <Zap className="w-4 h-4 text-yellow-500" />}
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-50"
              >
                <Trophy className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800">
                  {moves} moves
                </span>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50"
              >
                <Star className="w-5 h-5 text-orange-600" />
                <span className="font-semibold text-orange-800">
                  {score} pts
                </span>
              </motion.div>
            </div>

            <div className="flex flex-wrap gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                {soundEnabled ? (
                  <Volume2 className="w-5 h-5" />
                ) : (
                  <VolumeX className="w-5 h-5" />
                )}
              </motion.button>

              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="easy">Easy (6 pairs)</option>
                <option value="medium">Medium (8 pairs)</option>
                <option value="hard">Hard (12 pairs)</option>
              </select>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={shuffleCards}
                className="flex items-center gap-2 px-6 py-2 text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700"
              >
                <RotateCcw className="w-4 h-4" />
                New Game
              </motion.button>
            </div>
          </div>

          {/* Player Name Input */}
          {!gameStarted && !gameComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 text-center"
            >
              <div className="max-w-md mx-auto">
                <h3 className="mb-4 text-xl font-semibold text-gray-700">
                  Enter Your Name to Start
                </h3>
                <Input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Enter your name to start playing"
                  className="py-3 mb-4 text-lg text-center"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && playerName.trim()) {
                      setGameStarted(true);
                    }
                  }}
                />
                {playerName.trim() && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setGameStarted(true)}
                    className="px-8 py-3 text-lg text-white transition-all duration-300 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700"
                  >
                    🎮 Start Playing!
                  </motion.button>
                )}
                {!playerName.trim() && (
                  <p className="text-sm text-gray-500">
                    Please enter your name to start playing!
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* Game Grid */}
          <div
            className={`grid gap-3 ${
              difficulty === "easy"
                ? "grid-cols-4"
                : difficulty === "medium"
                ? "grid-cols-4"
                : "grid-cols-6"
            } ${!gameStarted ? "opacity-50 pointer-events-none" : ""}`}
          >
            {gameCards.map((card, index) => (
              <motion.div
                key={`${card.emoji}-${index}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCardClick(index)}
                className={`aspect-square cursor-pointer rounded-2xl flex items-center justify-center text-2xl md:text-3xl shadow-lg transition-all duration-300 ${
                  flippedCards.includes(index) || card.matched
                    ? "bg-gradient-to-br from-blue-400 to-orange-400 text-white transform rotate-y-180"
                    : "bg-gradient-to-br from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700"
                }`}
              >
                {(flippedCards.includes(index) || card.matched) && (
                  <motion.span
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {card.emoji}
                  </motion.span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Game Complete */}
          {gameComplete && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-center"
            >
              <div className="p-8 border border-green-200 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                  className="mb-4 text-6xl"
                >
                  {time >= DIFFICULTY_SETTINGS[difficulty].timeLimit
                    ? "⏰"
                    : "🎉"}
                </motion.div>

                <h3 className="mb-4 text-3xl font-bold text-gray-800">
                  {time >= DIFFICULTY_SETTINGS[difficulty].timeLimit
                    ? "Time's Up!"
                    : "Congratulations!"}
                </h3>

                <p className="mb-6 text-lg text-gray-600">
                  {time >= DIFFICULTY_SETTINGS[difficulty].timeLimit
                    ? "You ran out of time! Try again?"
                    : `You completed the game in ${moves} moves and ${formatTime(
                        time
                      )}!`}
                </p>

                {gameCards.every((card) => card.matched) && (
                  <div className="inline-block p-4 mb-6 bg-white rounded-xl">
                    <div className="mb-2 text-2xl font-bold text-blue-600">
                      Final Score
                    </div>
                    <div className="text-4xl font-bold text-gray-800">
                      {score}
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Button
                    onClick={shuffleCards}
                    className="px-8 py-3 text-lg text-white rounded-full bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700"
                  >
                    Play Again
                  </Button>
                  <Link href="/games">
                    <Button variant="outline" className="px-8 py-3 text-lg">
                      Try Other Games
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
