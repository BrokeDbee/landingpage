"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Puzzle,
  Target,
  Clock,
  Zap,
  Calculator,
  Eye,
  Shuffle,
} from "lucide-react";
import Link from "next/link";

const games = [
  {
    id: "memory",
    title: "Memory Match",
    description:
      "Test your memory by matching pairs of cards. Multiple difficulty levels available.",
    icon: Brain,
    color: "from-blue-500 to-purple-500",
    href: "/games/memory",
    difficulty: "Easy to Hard",
    players: "1,234",
    category: "Memory",
  },
  {
    id: "puzzle",
    title: "Sliding Puzzle",
    description:
      "Arrange numbered tiles in the correct order as quickly as possible.",
    icon: Puzzle,
    color: "from-green-500 to-teal-500",
    href: "/games/puzzle",
    difficulty: "Medium",
    players: "892",
    category: "Logic",
  },
  {
    id: "reaction",
    title: "Reaction Time",
    description:
      "Test how fast your reflexes really are with this simple but addictive game.",
    icon: Target,
    color: "from-red-500 to-pink-500",
    href: "/games/reaction",
    difficulty: "Easy",
    players: "2,156",
    category: "Speed",
  },
  {
    id: "speed-math",
    title: "Speed Math",
    description:
      "Solve math problems as quickly as possible to improve your mental arithmetic.",
    icon: Calculator,
    color: "from-orange-500 to-yellow-500",
    href: "/games/speed-math",
    difficulty: "Easy to Hard",
    players: "1,567",
    category: "Math",
  },
  {
    id: "pattern",
    title: "Pattern Memory",
    description: "Remember and reproduce increasingly complex visual patterns.",
    icon: Eye,
    color: "from-purple-500 to-pink-500",
    href: "/games/pattern",
    difficulty: "Medium to Hard",
    players: "743",
    category: "Memory",
  },
  {
    id: "word-scramble",
    title: "Word Scramble",
    description: "Unscramble letters to form words as quickly as possible.",
    icon: Shuffle,
    color: "from-indigo-500 to-blue-500",
    href: "/games/word-scramble",
    difficulty: "Easy to Hard",
    players: "1,089",
    category: "Language",
  },
  {
    id: "color-match",
    title: "Color Match",
    description:
      "Match colors while fighting against interference - a true test of focus.",
    icon: Zap,
    color: "from-pink-500 to-red-500",
    href: "/games/color-match",
    difficulty: "Medium",
    players: "654",
    category: "Attention",
  },
  {
    id: "number-sequence",
    title: "Number Sequence",
    description: "Remember and repeat increasingly long sequences of numbers.",
    icon: Clock,
    color: "from-teal-500 to-green-500",
    href: "/games/number-sequence",
    difficulty: "Easy to Hard",
    players: "987",
    category: "Memory",
  },
];

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container px-4 py-20 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h1 className="mb-4 text-5xl font-bold text-transparent md:text-6xl bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text">
            All Games
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Choose from our collection of brain training games. Each game
            targets different cognitive skills.
          </p>
        </motion.div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="p-6 bg-white border border-gray-100 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300"
            >
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${game.color} flex items-center justify-center`}
              >
                <game.icon className="w-8 h-8 text-white" />
              </div>

              <div className="mb-2 text-center">
                <span className="px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">
                  {game.category}
                </span>
              </div>

              <h3 className="mb-2 text-xl font-semibold text-center text-gray-800">
                {game.title}
              </h3>

              <p className="mb-4 text-sm text-center text-gray-600">
                {game.description}
              </p>

              <div className="mb-4 space-y-2 text-xs text-gray-500">
                <div className="flex justify-between">
                  <span>Difficulty:</span>
                  <span className="font-semibold">{game.difficulty}</span>
                </div>
                <div className="flex justify-between">
                  <span>Players:</span>
                  <span className="font-semibold">{game.players}</span>
                </div>
              </div>

              <Link href={game.href} className="block">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700">
                  Play Now
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
