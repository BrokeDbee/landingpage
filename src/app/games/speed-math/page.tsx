"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home, Share2, Calculator, Clock, Trophy, Target } from "lucide-react";
import Link from "next/link";

type Difficulty = "easy" | "medium" | "hard";
type Operation = "+" | "-" | "×" | "÷";

interface Problem {
  num1: number;
  num2: number;
  operation: Operation;
  answer: number;
}

export default function SpeedMathPage() {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [streak, setStreak] = useState(0);
  const [bestScore, setBestScore] = useState<number>(0);
  const [totalProblems, setTotalProblems] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem(`speedmath-best-${difficulty}`);
    if (saved) setBestScore(Number.parseInt(saved));
  }, [difficulty]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, timeLeft]);

  const generateProblem = (): Problem => {
    let num1: number, num2: number, answer: number;

    const operations: Operation[] = ["+", "-", "×", "÷"];
    const operation: Operation =
      operations[Math.floor(Math.random() * operations.length)];

    switch (difficulty) {
      case "easy":
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        break;
      case "medium":
        num1 = Math.floor(Math.random() * 50) + 1;
        num2 = Math.floor(Math.random() * 20) + 1;
        break;
      case "hard":
        num1 = Math.floor(Math.random() * 100) + 1;
        num2 = Math.floor(Math.random() * 50) + 1;
        break;
    }

    // Ensure division results in whole numbers
    if (operation === "÷") {
      answer = Math.floor(Math.random() * 20) + 1;
      num1 = answer * num2;
    } else {
      switch (operation) {
        case "+":
          answer = num1 + num2;
          break;
        case "-":
          if (num1 < num2) [num1, num2] = [num2, num1]; // Ensure positive result
          answer = num1 - num2;
          break;
        case "×":
          answer = num1 * num2;
          break;
        default:
          answer = num1 + num2;
      }
    }

    return { num1, num2, operation, answer };
  };

  const startGame = () => {
    if (!playerName.trim()) {
      alert("Please enter your name first!");
      return;
    }

    setScore(0);
    setTimeLeft(60);
    setIsPlaying(true);
    setIsComplete(false);
    setStreak(0);
    setTotalProblems(0);
    setCurrentProblem(generateProblem());
    setUserAnswer("");
  };

  const endGame = () => {
    setIsPlaying(false);
    setIsComplete(true);

    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem(`speedmath-best-${difficulty}`, score.toString());
    }
  };

  const checkAnswer = () => {
    if (!currentProblem || !userAnswer.trim()) return;

    const userNum = Number.parseInt(userAnswer);
    setTotalProblems((prev) => prev + 1);

    if (userNum === currentProblem.answer) {
      const points =
        difficulty === "easy" ? 1 : difficulty === "medium" ? 2 : 3;
      setScore((prev) => prev + points + Math.floor(streak / 3)); // Bonus for streaks
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }

    setCurrentProblem(generateProblem());
    setUserAnswer("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      checkAnswer();
    }
  };

  const getAccuracy = () => {
    if (totalProblems === 0) return 0;
    return Math.round(
      (score /
        (difficulty === "easy" ? 1 : difficulty === "medium" ? 2 : 3) /
        totalProblems) *
        100
    );
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
            Speed Math
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

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8 md:grid-cols-4">
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

            <div className="p-4 bg-white rounded-xl shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-green-500" />
                <span className="font-semibold">Streak</span>
              </div>
              <div className="text-2xl font-bold text-green-600">{streak}</div>
            </div>

            <div className="p-4 bg-white rounded-xl shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="w-5 h-5 text-purple-500" />
                <span className="font-semibold">Best</span>
              </div>
              <div className="text-2xl font-bold text-purple-600">
                {bestScore}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as Difficulty)}
              className="px-4 py-2 border border-gray-200 rounded-lg"
              disabled={isPlaying}
            >
              <option value="easy">Easy (1-10)</option>
              <option value="medium">Medium (1-50)</option>
              <option value="hard">Hard (1-100)</option>
            </select>

            <Button
              onClick={startGame}
              disabled={!playerName.trim() || isPlaying}
              className="bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700"
            >
              {isPlaying ? "Playing..." : "Start Game"}
            </Button>
          </div>

          {/* Game Area */}
          <div className="p-8 bg-white rounded-3xl shadow-2xl">
            {!isPlaying && !isComplete && (
              <div className="text-center py-12">
                <Calculator className="w-16 h-16 mx-auto mb-4 text-blue-500" />
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Ready to Test Your Math Skills?
                </h3>
                <p className="text-gray-600">
                  Solve as many problems as you can in 60 seconds!
                </p>
              </div>
            )}

            {isPlaying && currentProblem && (
              <div className="text-center">
                <div className="text-6xl font-bold text-gray-800 mb-8">
                  {currentProblem.num1} {currentProblem.operation}{" "}
                  {currentProblem.num2} = ?
                </div>

                <Input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Your answer"
                  className="text-3xl text-center py-4 mb-6 max-w-xs mx-auto"
                  autoFocus
                />

                <Button
                  onClick={checkAnswer}
                  className="px-8 py-3 text-lg bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  Submit Answer
                </Button>

                {streak > 0 && (
                  <div className="mt-4 text-lg font-semibold text-orange-600">
                    🔥 {streak} in a row!
                  </div>
                )}
              </div>
            )}

            {isComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="text-4xl mb-4">
                  {score > bestScore
                    ? "🏆"
                    : score >= bestScore * 0.8
                    ? "🎉"
                    : "💪"}
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  {score > bestScore ? "New Best Score!" : "Game Complete!"}
                </h3>
                <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">
                      {score}
                    </div>
                    <div className="text-sm text-blue-800">Final Score</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">
                      {getAccuracy()}%
                    </div>
                    <div className="text-sm text-green-800">Accuracy</div>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-xl">
                    <div className="text-2xl font-bold text-orange-600">
                      {totalProblems}
                    </div>
                    <div className="text-sm text-orange-800">
                      Problems Attempted
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
                  <Button
                    onClick={startGame}
                    className="bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700"
                  >
                    Play Again
                  </Button>
                  <Link href="/games">
                    <Button variant="outline">Try Other Games</Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </div>

          {/* Instructions */}
          <div className="p-6 mt-8 bg-white rounded-2xl shadow-lg">
            <h3 className="mb-4 text-xl font-semibold">How to Play</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Solve math problems as quickly as possible</li>
              <li>• You have 60 seconds to get the highest score</li>
              <li>• Correct answers in a row give bonus points</li>
              <li>
                • Higher difficulty levels give more points per correct answer
              </li>
              <li>• Press Enter or click Submit to answer</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
