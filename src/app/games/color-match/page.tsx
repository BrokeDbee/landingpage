"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home, Share2, Trophy, Clock } from "lucide-react";
import Link from "next/link";

const COLORS = [
  { name: "Red", class: "bg-red-500" },
  { name: "Blue", class: "bg-blue-500" },
  { name: "Green", class: "bg-green-500" },
  { name: "Yellow", class: "bg-yellow-500" },
  { name: "Purple", class: "bg-purple-500" },
  { name: "Pink", class: "bg-pink-500" },
];

function getRandomColorIdx() {
  return Math.floor(Math.random() * COLORS.length);
}

export default function ColorMatchPage() {
  const [score, setScore] = useState(0);
  const [playerName, setPlayerName] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [targetColorIdx, setTargetColorIdx] = useState(getRandomColorIdx());
  const [wordColorIdx, setWordColorIdx] = useState(getRandomColorIdx());

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isPlaying && timeLeft === 0) {
      setIsPlaying(false);
      setIsComplete(true);
    }
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
    setIsComplete(false);
    nextRound();
  };

  const nextRound = () => {
    setTargetColorIdx(getRandomColorIdx());
    setWordColorIdx(getRandomColorIdx());
  };

  const handleColorClick = (idx: number) => {
    if (!isPlaying) return;
    if (idx === targetColorIdx) {
      setScore((s) => s + 1);
    }
    nextRound();
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
            Color Match
          </h1>

          <Button variant="outline" className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>

        <div className="max-w-xl mx-auto">
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

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-white rounded-xl shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold">Score</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">{score}</div>
            </div>
            <div className="p-4 bg-white rounded-xl shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-red-500" />
                <span className="font-semibold">Time</span>
              </div>
              <div className="text-2xl font-bold text-red-600">{timeLeft}s</div>
            </div>
          </div>

          {/* Controls */}
          <Button
            onClick={startGame}
            disabled={!playerName.trim() || isPlaying}
            className="mb-8 bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700"
          >
            {isPlaying ? "Playing..." : "Start Game"}
          </Button>

          {/* Game Area */}
          {isPlaying && (
            <div className="p-8 bg-white rounded-3xl shadow-2xl text-center">
              <div className="mb-6 text-3xl font-bold text-gray-800">
                <span className={COLORS[wordColorIdx].class} style={{ WebkitTextStroke: "1px #333", color: "inherit" }}>
                  {COLORS[targetColorIdx].name}
                </span>
              </div>
              <div className="mb-4 text-gray-600">Pick the color that matches the <b>word</b>, not the color of the text!</div>
              <div className="flex flex-wrap justify-center gap-4">
                {COLORS.map((color, idx) => (
                  <Button
                    key={color.name}
                    className={`w-24 h-12 text-lg font-bold ${color.class}`}
                    onClick={() => handleColorClick(idx)}
                  >
                    {color.name}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Game Complete */}
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Game Over!
              </h3>
              <div className="p-4 bg-blue-50 rounded-xl mb-4">
                <div className="text-2xl font-bold text-blue-600">{score}</div>
                <div className="text-sm text-blue-800">Final Score</div>
              </div>
              <Button
                onClick={startGame}
                className="bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700"
              >
                Play Again
              </Button>
              <Link href="/games">
                <Button variant="outline" className="ml-2">
                  Try Other Games
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
