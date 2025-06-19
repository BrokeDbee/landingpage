"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home, Share2, RotateCcw, Zap, Trophy } from "lucide-react";
import Link from "next/link";

type GameState = "waiting" | "ready" | "go" | "clicked" | "too-early";

export default function ReactionGamePage() {
  const [gameState, setGameState] = useState<GameState>("waiting");
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [playerName, setPlayerName] = useState("");
  const [scores, setScores] = useState<number[]>([]);
  const startTimeRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("reactionBestTime");
    if (saved) setBestTime(Number.parseInt(saved));
  }, []);

  const startGame = () => {
    if (!playerName.trim()) {
      alert("Please enter your name first!");
      return;
    }

    setGameState("ready");
    setReactionTime(null);

    // Random delay between 2-5 seconds
    const delay = Math.random() * 3000 + 2000;

    timeoutRef.current = setTimeout(() => {
      setGameState("go");
      startTimeRef.current = Date.now();
    }, delay);
  };

  const handleClick = () => {
    if (gameState === "ready") {
      setGameState("too-early");
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      return;
    }

    if (gameState === "go") {
      const endTime = Date.now();
      const reaction = endTime - startTimeRef.current;
      setReactionTime(reaction);
      setGameState("clicked");
      setAttempts((prev) => prev + 1);
      setScores((prev) => [...prev, reaction]);

      if (!bestTime || reaction < bestTime) {
        setBestTime(reaction);
        localStorage.setItem("reactionBestTime", reaction.toString());
      }
    }
  };

  const reset = () => {
    setGameState("waiting");
    setReactionTime(null);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const getAverageTime = () => {
    if (scores.length === 0) return 0;
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  };

  const getStateMessage = () => {
    switch (gameState) {
      case "waiting":
        return "Click 'Start' when you're ready";
      case "ready":
        return "Wait for green...";
      case "go":
        return "CLICK NOW!";
      case "clicked":
        return `${reactionTime}ms - ${getReactionRating(reactionTime!)}`;
      case "too-early":
        return "Too early! Wait for green.";
      default:
        return "";
    }
  };

  const getReactionRating = (time: number) => {
    if (time < 200) return "Lightning fast! ⚡";
    if (time < 250) return "Excellent! 🎯";
    if (time < 300) return "Good! 👍";
    if (time < 400) return "Average 👌";
    return "Could be better 🐌";
  };

  const getBackgroundColor = () => {
    switch (gameState) {
      case "ready":
        return "bg-red-500";
      case "go":
        return "bg-green-500";
      case "too-early":
        return "bg-yellow-500";
      default:
        return "bg-blue-500";
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
            Reaction Time Test
          </h1>

          <Button variant="outline" className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-4">
          <div className="p-4 bg-white rounded-xl shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold">Best Time</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {bestTime ? `${bestTime}ms` : "—"}
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-orange-500" />
              <span className="font-semibold">Last Time</span>
            </div>
            <div className="text-2xl font-bold text-green-600">
              {reactionTime ? `${reactionTime}ms` : "—"}
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold">Average</span>
            </div>
            <div className="text-2xl font-bold text-purple-600">
              {scores.length > 0 ? `${getAverageTime()}ms` : "—"}
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold">Attempts</span>
            </div>
            <div className="text-2xl font-bold text-gray-600">{attempts}</div>
          </div>
        </div>

        {/* Game Area */}
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
                className="mb-4 text-center"
              />
            </div>
          )}

          {/* Game Button */}
          <motion.div
            whileHover={{ scale: gameState === "go" ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleClick}
            className={`relative h-96 rounded-3xl shadow-2xl cursor-pointer transition-all duration-300 flex items-center justify-center ${getBackgroundColor()}`}
          >
            <div className="text-center text-white">
              <div className="mb-4 text-4xl md:text-6xl font-bold">
                {gameState === "go"
                  ? "CLICK!"
                  : gameState === "ready"
                  ? "WAIT..."
                  : "READY?"}
              </div>
              <div className="text-xl md:text-2xl">{getStateMessage()}</div>
            </div>
          </motion.div>

          {/* Controls */}
          <div className="flex flex-col gap-4 mt-8 sm:flex-row sm:justify-center">
            <Button
              onClick={startGame}
              disabled={
                gameState === "ready" ||
                gameState === "go" ||
                !playerName.trim()
              }
              className="px-8 py-3 text-lg bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700"
            >
              {gameState === "waiting" ? "Start Test" : "Start Again"}
            </Button>

            <Button
              onClick={reset}
              variant="outline"
              className="flex items-center gap-2 px-8 py-3 text-lg"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>

          {/* Instructions */}
          <div className="p-6 mt-8 bg-white rounded-2xl shadow-lg">
            <h3 className="mb-4 text-xl font-semibold">How to Play</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Click &quot;Start Test&quot; to begin</li>
              <li>• Wait for the screen to turn green</li>
              <li>• Click as fast as possible when you see green</li>
              <li>
                • Don&apos;t click too early or you&apos;ll have to restart
              </li>
              <li>• Try to beat your best time!</li>
            </ul>
          </div>

          {/* Recent Scores */}
          {scores.length > 0 && (
            <div className="p-6 mt-8 bg-white rounded-2xl shadow-lg">
              <h3 className="mb-4 text-xl font-semibold">Recent Attempts</h3>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                {scores.slice(-8).map((score, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg text-center font-semibold ${
                      score === bestTime
                        ? "bg-yellow-100 text-yellow-800 border-2 border-yellow-300"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {score}ms
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
