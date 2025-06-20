"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home, Share2, Trophy, Clock } from "lucide-react";
import Link from "next/link";

const WORDS = [
  "react", "memory", "puzzle", "orange", "permit", "student", "pattern", "number", "scramble", "focus", "logic", "speed", "math", "color", "brain", "game", "sequence", "newsletter", "event", "newsletter"
];

function shuffleWord(word: string) {
  const arr = word.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join("");
}

export default function WordScramblePage() {
  const [currentWord, setCurrentWord] = useState("");
  const [scrambled, setScrambled] = useState("");
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [playerName, setPlayerName] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

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
    nextWord();
  };

  const nextWord = () => {
    const word = WORDS[Math.floor(Math.random() * WORDS.length)];
    setCurrentWord(word);
    setScrambled(shuffleWord(word));
    setUserInput("");
  };

  const checkAnswer = () => {
    if (userInput.trim().toLowerCase() === currentWord) {
      setScore((s) => s + 1);
      nextWord();
    } else {
      setUserInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      checkAnswer();
    }
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
            Word Scramble
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
                    // Auto-start game when Enter is pressed
                  }
                }}
              />
              {playerName.trim() && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => startGame()}
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
              <div className="mb-6 text-3xl font-bold text-gray-800 tracking-widest">
                {scrambled}
              </div>
              <Input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Unscramble the word"
                className="text-xl text-center py-4 mb-6 max-w-xs mx-auto"
                autoFocus
              />
              <Button
                onClick={checkAnswer}
                className="px-8 py-3 text-lg bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                Submit
              </Button>
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
