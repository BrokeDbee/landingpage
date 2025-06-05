'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaRedo, FaTrophy } from 'react-icons/fa';

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

export default function MemoryGame() {
  const [gameCards, setGameCards] = useState<typeof cards>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [bestMoves, setBestMoves] = useState<number | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && !gameComplete) {
      timer = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, gameComplete]);

  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setGameCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setGameComplete(false);
    setTime(0);
    setIsPlaying(true);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  const handleCardClick = (index: number) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || gameCards[index].matched) return;

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      const [first, second] = newFlippedCards;
      
      if (gameCards[first].emoji === gameCards[second].emoji) {
        setGameCards(prev => 
          prev.map((card, idx) => 
            idx === first || idx === second ? { ...card, matched: true } : card
          )
        );
        setFlippedCards([]);
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  useEffect(() => {
    if (gameCards.length > 0 && gameCards.every(card => card.matched)) {
      setGameComplete(true);
      setIsPlaying(false);
      if (!bestTime || time < bestTime) setBestTime(time);
      if (!bestMoves || moves < bestMoves) setBestMoves(moves);
    }
  }, [gameCards, bestTime, bestMoves, time, moves]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-8">Memory Game</h2>
          <p className="text-gray-600 text-center mb-8">
            Test your memory by matching pairs of cards. Try to complete the game in the fewest moves and shortest time!
          </p>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-8">
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <FaClock className="text-primary" />
                  <span className="font-semibold">Time: {formatTime(time)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaTrophy className="text-primary" />
                  <span className="font-semibold">Moves: {moves}</span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={shuffleCards}
                className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors"
              >
                <FaRedo />
                Reset Game
              </motion.button>
            </div>

            <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
              {gameCards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleCardClick(index)}
                  className={`aspect-square cursor-pointer rounded-lg flex items-center justify-center text-3xl bg-white shadow-lg transition-all duration-300 ${
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
                className="mt-8 text-center"
              >
                <h3 className="text-2xl font-bold text-primary mb-4">Congratulations! 🎉</h3>
                <p className="text-gray-600 mb-4">
                  You completed the game in {moves} moves and {formatTime(time)}!
                </p>
                {bestTime && (
                  <p className="text-gray-600">
                    Best Time: {formatTime(bestTime)} | Best Moves: {bestMoves}
                  </p>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 