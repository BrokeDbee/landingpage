'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaRedo, FaTrophy, FaMedal, FaStar, FaCrown, FaBolt, FaEye, FaUndo, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

type Difficulty = 'easy' | 'medium' | 'hard';
type LeaderboardEntry = {
  name: string;
  time: number;
  moves: number;
  difficulty: Difficulty;
  date: string;
  score?: number;
};

type PowerUp = {
  id: string;
  name: string;
  icon: JSX.Element;
  description: string;
  cost: number;
  used: boolean;
};

type Achievement = {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  icon: JSX.Element;
};

const cards = [
  { emoji: '🎓', matched: false },
  { emoji: '📚', matched: false },
  { emoji: '🎯', matched: false },
  { emoji: '🏆', matched: false },
  { emoji: '🎨', matched: false },
  { emoji: '🎮', matched: false },
  { emoji: '🎵', matched: false },
  { emoji: '🎭', matched: false },
  { emoji: '⚽', matched: false },
  { emoji: '🎪', matched: false },
  { emoji: '🎲', matched: false },
  { emoji: '🎪', matched: false },
  { emoji: '🎯', matched: false },
  { emoji: '🎓', matched: false },
  { emoji: '📚', matched: false },
  { emoji: '🏆', matched: false },
  { emoji: '🎨', matched: false },
  { emoji: '🎮', matched: false },
  { emoji: '🎵', matched: false },
  { emoji: '🎭', matched: false },
  { emoji: '⚽', matched: false },
  { emoji: '🎲', matched: false }
];

const DIFFICULTY_SETTINGS = {
  easy: { pairs: 6, timeLimit: 120 },
  medium: { pairs: 12, timeLimit: 180 },
  hard: { pairs: 18, timeLimit: 240 }
};

const POWER_UPS: PowerUp[] = [
  {
    id: 'peek',
    name: 'Peek',
    icon: <FaEye className="text-blue-500" />,
    description: 'Reveal all cards for 2 seconds',
    cost: 30,
    used: false
  },
  {
    id: 'undo',
    name: 'Undo',
    icon: <FaUndo className="text-green-500" />,
    description: 'Undo your last move',
    cost: 20,
    used: false
  },
  {
    id: 'freeze',
    name: 'Freeze Time',
    icon: <FaBolt className="text-yellow-500" />,
    description: 'Freeze the timer for 10 seconds',
    cost: 25,
    used: false
  }
];

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'speedster',
    name: 'Speedster',
    description: 'Complete a game in under 1 minute',
    unlocked: false,
    icon: <FaBolt className="text-yellow-500" />
  },
  {
    id: 'perfect',
    name: 'Perfect Match',
    description: 'Complete a game with no mismatches',
    unlocked: false,
    icon: <FaStar className="text-yellow-500" />
  },
  {
    id: 'master',
    name: 'Memory Master',
    description: 'Complete hard difficulty in under 2 minutes',
    unlocked: false,
    icon: <FaCrown className="text-yellow-500" />
  }
];

export default function MemoryGame() {
  const [gameCards, setGameCards] = useState<typeof cards>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [bestMoves, setBestMoves] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [playerName, setPlayerName] = useState('');
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [streak, setStreak] = useState(0);
  const [consecutiveMatches, setConsecutiveMatches] = useState(0);
  const [score, setScore] = useState(0);
  const [powerUps, setPowerUps] = useState(POWER_UPS);
  const [achievements, setAchievements] = useState(ACHIEVEMENTS);
  const [showAchievements, setShowAchievements] = useState(false);
  const [isTimeFrozen, setIsTimeFrozen] = useState(false);
  const [lastMove, setLastMove] = useState<{first: number, second: number} | null>(null);
  const [lastMoveResult, setLastMoveResult] = useState<'match' | 'mismatch' | null>(null);
  const [mismatches, setMismatches] = useState(0);

  useEffect(() => {
    const savedLeaderboard = localStorage.getItem('memoryGameLeaderboard');
    if (savedLeaderboard) {
      setLeaderboard(JSON.parse(savedLeaderboard));
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && !gameComplete && gameStarted && !isTimeFrozen) {
      timer = setInterval(() => {
        setTime(prev => {
          if (prev >= DIFFICULTY_SETTINGS[difficulty].timeLimit) {
            handleGameOver();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, gameComplete, gameStarted, difficulty, isTimeFrozen]);

  const handleGameOver = () => {
    setIsPlaying(false);
    setGameComplete(true);
    const finalScore = calculateScore(time, moves, difficulty);
    setScore(finalScore);
    checkAchievements();

    if (playerName) {
      const newEntry = {
        name: playerName,
        time,
        moves,
        difficulty,
        date: new Date().toLocaleDateString(),
        score: finalScore
      };
      const newLeaderboard = [...leaderboard, newEntry]
        .sort((a, b) => (b.score || 0) - (a.score || 0))
        .slice(0, 10);
      setLeaderboard(newLeaderboard);
      localStorage.setItem('memoryGameLeaderboard', JSON.stringify(newLeaderboard));
    }
  };

  const shuffleCards = () => {
    const numPairs = DIFFICULTY_SETTINGS[difficulty].pairs;
    // Create pairs of cards
    const pairs = cards.slice(0, numPairs).map(card => [card, { ...card }]);
    // Flatten and shuffle
    const shuffled = pairs
      .flat()
      .sort(() => Math.random() - 0.5);
    
    setGameCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setGameComplete(false);
    setTime(0);
    setIsPlaying(true);
    setGameStarted(false);
    setConsecutiveMatches(0);
    setScore(30);
    setPowerUps(POWER_UPS.map(p => ({ ...p, used: false })));
    setIsTimeFrozen(false);
    setLastMove(null);
    setLastMoveResult(null);
    setMismatches(0);
  };

  useEffect(() => {
    shuffleCards();
  }, [difficulty]);

  const calculateScore = (time: number, moves: number, difficulty: Difficulty) => {
    const baseScore = 1000;
    const timeBonus = Math.max(0, DIFFICULTY_SETTINGS[difficulty].timeLimit - time) * 10;
    const movePenalty = moves * 5;
    const difficultyMultiplier = {
      easy: 1,
      medium: 1.5,
      hard: 2
    }[difficulty];
    
    return Math.floor((baseScore + timeBonus - movePenalty) * difficultyMultiplier);
  };

  const usePowerUp = (powerUp: PowerUp) => {
    if (score < powerUp.cost || powerUp.used) return;

    setScore(prev => prev - powerUp.cost);
    setPowerUps(prev => prev.map(p => p.id === powerUp.id ? { ...p, used: true } : p));

    switch (powerUp.id) {
      case 'peek':
        const allCards = gameCards.map((_, i) => i);
        setFlippedCards(allCards);
        setTimeout(() => setFlippedCards([]), 2000);
        break;
      case 'undo':
        if (lastMove && lastMoveResult === 'mismatch') {
          setGameCards(prev => 
            prev.map((card, idx) => 
              idx === lastMove.first || idx === lastMove.second ? { ...card, matched: false } : card
            )
          );
          setMoves(prev => prev - 1);
          setFlippedCards([]);
          setLastMoveResult(null);
        }
        break;
      case 'freeze':
        setIsTimeFrozen(true);
        setTimeout(() => setIsTimeFrozen(false), 10000);
        break;
    }
  };

  const checkAchievements = () => {
    const newAchievements = [...achievements];
    
    if (time < 60) {
      newAchievements.find(a => a.id === 'speedster')!.unlocked = true;
    }
    if (mismatches === 0) {
      newAchievements.find(a => a.id === 'perfect')!.unlocked = true;
    }
    if (difficulty === 'hard' && time < 120) {
      newAchievements.find(a => a.id === 'master')!.unlocked = true;
    }
    
    setAchievements(newAchievements);
  };

  const handleCardClick = (index: number) => {
    if (!playerName.trim()) {
      alert('Please enter your name before playing!');
      return;
    }
    if (flippedCards.length === 2 || flippedCards.includes(index) || gameCards[index].matched) return;

    if (!gameStarted) {
      setGameStarted(true);
    }

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      const [first, second] = newFlippedCards;
      setLastMove({ first, second });
      
      if (gameCards[first].emoji === gameCards[second].emoji) {
        setGameCards(prev => 
          prev.map((card, idx) => 
            idx === first || idx === second ? { ...card, matched: true } : card
          )
        );
        setFlippedCards([]);
        setConsecutiveMatches(prev => prev + 1);
        if (consecutiveMatches + 1 > streak) {
          setStreak(consecutiveMatches + 1);
        }
        setScore(prev => prev + 10);
        setLastMoveResult('match');
      } else {
        setMismatches(prev => prev + 1);
        setTimeout(() => setFlippedCards([]), 1000);
        setConsecutiveMatches(0);
        setLastMoveResult('mismatch');
      }
    }
  };

  useEffect(() => {
    if (gameCards.length > 0 && gameCards.every(card => card.matched)) {
      handleGameOver();
      if (!bestTime || time < bestTime) setBestTime(time);
      if (!bestMoves || moves < bestMoves) setBestMoves(moves);
    }
  }, [gameCards, bestTime, bestMoves, time, moves]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (diff: Difficulty) => {
    switch (diff) {
      case 'easy': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'hard': return 'text-red-500';
    }
  };

  return (
    <section className="py-4 md:py-6 bg-gray-50">
      <div className="container mx-auto px-2 md:px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-xl md:text-2xl font-bold text-center mb-2">Memory Game</h2>
          <p className="text-gray-600 text-center mb-3 text-xs md:text-sm">
            Test your memory by matching pairs of cards. Try to complete the game in the fewest moves and shortest time!
          </p>

          <div className="flex justify-center mb-2">
            <button
              onClick={() => setShowLeaderboard(!showLeaderboard)}
              className="bg-primary text-white px-3 py-1 rounded-lg text-xs hover:bg-primary/90 transition-colors"
            >
              {showLeaderboard ? 'Hide' : 'Show'} Leaderboard
            </button>
          </div>

          {showLeaderboard && (
            <div className="bg-white rounded-xl shadow p-2 mb-3 max-w-2xl mx-auto">
              <h3 className="text-base font-bold text-center mb-2">Leaderboard</h3>
              {leaderboard.length === 0 ? (
                <p className="text-xs text-center text-gray-500">No scores yet. Play a game to get on the board!</p>
              ) : (
                <table className="w-full text-xs md:text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-1">#</th>
                      <th className="py-1">Name</th>
                      <th className="py-1">Score</th>
                      <th className="py-1">Moves</th>
                      <th className="py-1">Time</th>
                      <th className="py-1">Difficulty</th>
                      <th className="py-1">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((entry, idx) => (
                      <tr key={idx} className="text-center border-b last:border-0">
                        <td className="py-1 font-bold">{idx + 1}</td>
                        <td className="py-1">{entry.name}</td>
                        <td className="py-1">{entry.score}</td>
                        <td className="py-1">{entry.moves}</td>
                        <td className="py-1">{formatTime(entry.time)}</td>
                        <td className="py-1 capitalize">{entry.difficulty}</td>
                        <td className="py-1">{entry.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          <div className="bg-white rounded-xl shadow-lg p-2">
            <div className="flex flex-wrap justify-between items-center gap-1 mb-2">
              <div className="flex flex-wrap gap-1">
                <div className="flex items-center gap-1 text-xs">
                  <FaClock className="text-primary" />
                  <span className="font-semibold">{formatTime(time)}</span>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <FaTrophy className="text-primary" />
                  <span className="font-semibold">{moves}</span>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <FaStar className="text-yellow-500" />
                  <span className="font-semibold">{streak}</span>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <FaMedal className="text-primary" />
                  <span className="font-semibold">{score}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAchievements(!showAchievements)}
                  className="bg-gray-100 p-1 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <FaMedal className="text-xs" />
                </motion.button>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                  className="bg-gray-100 px-1.5 py-1 rounded-lg text-xs"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={shuffleCards}
                  className="bg-primary text-white px-2 py-1 rounded-lg flex items-center gap-1 hover:bg-primary/90 transition-colors text-xs"
                >
                  <FaRedo className="text-xs" />
                  Reset
                </motion.button>
              </div>
            </div>

            {!gameStarted && !gameComplete && (
              <div className="mb-2 text-center">
                <div className="flex flex-col items-center gap-1">
                  <div className="flex flex-col md:flex-row items-center gap-1 w-full md:w-auto">
                    <input
                      type="text"
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      placeholder="Enter your name"
                      className="px-2 py-1 border rounded-lg w-full md:w-40 text-xs"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (!playerName.trim()) {
                          alert('Please enter your name to play!');
                          return;
                        }
                        shuffleCards();
                      }}
                      className="bg-primary text-white px-2 py-1 rounded-lg hover:bg-primary/90 transition-colors w-full md:w-auto text-xs"
                    >
                      Start Game
                    </motion.button>
                  </div>
                  {!playerName.trim() && (
                    <p className="text-red-500 text-xs">Please enter your name to start playing!</p>
                  )}
                  <p className="text-xs text-gray-500">
                    Time: {formatTime(DIFFICULTY_SETTINGS[difficulty].timeLimit)} | 
                    Pairs: {DIFFICULTY_SETTINGS[difficulty].pairs}
                  </p>
                </div>
              </div>
            )}

            {showAchievements && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 md:mb-8"
              >
                <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Achievements</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-3 md:p-4 rounded-lg border ${
                        achievement.unlocked
                          ? 'bg-green-50 border-green-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1 md:mb-2">
                        {achievement.icon}
                        <span className="font-semibold text-sm md:text-base">{achievement.name}</span>
                      </div>
                      <p className="text-xs md:text-sm text-gray-600">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {gameStarted && !gameComplete && (
              <div className="mt-2">
                <h3 className="text-xs font-semibold mb-1">Power-ups</h3>
                <div className="grid grid-cols-3 gap-1">
                  {powerUps.map((powerUp) => (
                    <motion.button
                      key={powerUp.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => usePowerUp(powerUp)}
                      disabled={score < powerUp.cost || powerUp.used}
                      className={`p-1.5 rounded-lg border flex items-center justify-between ${
                        score >= powerUp.cost && !powerUp.used
                          ? 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                          : 'bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        {powerUp.icon}
                        <div>
                          <div className="font-semibold text-xs">{powerUp.name}</div>
                          <div className="text-[10px] text-gray-600">{powerUp.description}</div>
                        </div>
                      </div>
                      <div className="text-xs font-semibold">{powerUp.cost} pts</div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            <div className={`grid grid-cols-4 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-9 gap-1 ${!playerName.trim() ? 'opacity-50 pointer-events-none' : ''}`}>
              {gameCards.map((card, index) => (
                <motion.div
                  key={`${card.emoji}-${index}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleCardClick(index)}
                  className={`aspect-square cursor-pointer rounded-lg flex items-center justify-center text-base sm:text-lg md:text-xl bg-white shadow-lg transition-all duration-300 ${
                    flippedCards.includes(index) || card.matched
                      ? 'transform rotate-y-180 bg-primary/10'
                      : 'bg-primary hover:bg-primary/90'
                  }`}
                >
                  {(flippedCards.includes(index) || card.matched) && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {card.emoji}
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </div>

            {gameComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-center"
              >
                <h3 className="text-base font-bold text-primary mb-1">
                  {time >= DIFFICULTY_SETTINGS[difficulty].timeLimit ? 'Time\'s Up! ⏰' : 'Congratulations! 🎉'}
                </h3>
                <p className="text-xs text-gray-600 mb-1">
                  {time >= DIFFICULTY_SETTINGS[difficulty].timeLimit
                    ? 'You ran out of time! Try again?'
                    : `You completed the game in ${moves} moves and ${formatTime(time)}!`}
                </p>
                {bestTime && (
                  <p className="text-xs text-gray-600 mb-2">
                    Best Time: {formatTime(bestTime)} | Best Moves: {bestMoves}
                  </p>
                )}
                <div className="mt-1">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={shuffleCards}
                    className="bg-primary text-white px-2 py-1 rounded-lg hover:bg-primary/90 transition-colors text-xs"
                  >
                    Play Again
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 