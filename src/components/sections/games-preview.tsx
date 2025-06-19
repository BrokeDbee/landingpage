"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Brain, Puzzle, Target, Clock } from "lucide-react";
import Link from "next/link";
import { MiniMemoryGame } from "@/components/games/mini-memory-game";

const games = [
  {
    id: "memory",
    title: "Memory Match",
    description: "Test your memory by matching pairs of cards",
    icon: Brain,
    color: "from-blue-500 to-purple-500",
    href: "/games/memory",
  },
  {
    id: "puzzle",
    title: "Sliding Puzzle",
    description: "Arrange numbered tiles in the correct order",
    icon: Puzzle,
    color: "from-green-500 to-teal-500",
    href: "/games/puzzle",
  },
  {
    id: "reaction",
    title: "Reaction Time",
    description: "Test how fast your reflexes really are",
    icon: Target,
    color: "from-red-500 to-pink-500",
    href: "/games/reaction",
  },
  {
    id: "speed",
    title: "Speed Math",
    description: "Solve math problems as quickly as possible",
    icon: Clock,
    color: "from-orange-500 to-yellow-500",
    href: "/games/speed-math",
  },
];

export function GamesPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl">
            Featured Games
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Try our most popular brain training games. Each one is designed to
            challenge different cognitive skills.
          </p>
        </motion.div>

        {/* Mini Memory Game Demo */}
        <div className="mb-16">
          <MiniMemoryGame />
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="p-6 bg-white border border-gray-100 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300"
            >
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${game.color} flex items-center justify-center`}
              >
                <game.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="mb-2 text-xl font-semibold text-center text-gray-800">
                {game.title}
              </h3>

              <p className="mb-6 text-center text-gray-600">
                {game.description}
              </p>

              <Link href={game.href} className="block">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700">
                  Play Now
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link href="/games">
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-4 text-lg border-2"
            >
              View All Games
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
