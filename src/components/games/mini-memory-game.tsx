"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RotateCcw, Trophy } from "lucide-react";
import Link from "next/link";

const miniCards = [
  { emoji: "🎓", matched: false },
  { emoji: "📚", matched: false },
  { emoji: "🎯", matched: false },
  { emoji: "🏆", matched: false },
];

export function MiniMemoryGame() {
  const [gameCards, setGameCards] = useState<typeof miniCards>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    shuffleCards();
  }, []);

  const shuffleCards = () => {
    const pairs = miniCards.map((card) => [card, { ...card }]);
    const shuffled = pairs.flat().sort(() => Math.random() - 0.5);
    setGameCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setGameComplete(false);
  };

  const handleCardClick = (index: number) => {
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(index) ||
      gameCards[index].matched
    )
      return;

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
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  useEffect(() => {
    if (gameCards.length > 0 && gameCards.every((card) => card.matched)) {
      setGameComplete(true);
    }
  }, [gameCards]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-orange-50 rounded-3xl"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Try Memory Match
        </h3>
        <p className="text-gray-600">A quick demo of our most popular game</p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full">
          <Trophy className="w-4 h-4 text-blue-600" />
          <span className="font-semibold text-blue-800">{moves} moves</span>
        </div>

        <Button
          onClick={shuffleCards}
          size="sm"
          variant="outline"
          className="flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        {gameCards.map((card, index) => (
          <motion.div
            key={`${card.emoji}-${index}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCardClick(index)}
            className={`aspect-square cursor-pointer rounded-xl flex items-center justify-center text-2xl shadow-md transition-all duration-300 ${
              flippedCards.includes(index) || card.matched
                ? "bg-gradient-to-br from-blue-400 to-orange-400 text-white"
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

      {gameComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-4 bg-white rounded-xl"
        >
          <div className="text-3xl mb-2">🎉</div>
          <p className="text-lg font-semibold text-gray-800 mb-4">
            Completed in {moves} moves!
          </p>
          <Link href="/games/memory">
            <Button className="bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700">
              Play Full Version
            </Button>
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
}
