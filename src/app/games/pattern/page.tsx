"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home, Share2, Trophy, Clock } from "lucide-react";
import Link from "next/link";

// Generates a random pattern of colored squares
const COLORS = [
  "bg-blue-500",
  "bg-red-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
];

type Difficulty = "easy" | "medium" | "hard";

const DIFFICULTY_SETTINGS = {
  easy: { length: 4, time: 2 },
  medium: { length: 6, time: 2.5 },
  hard: { length: 8, time: 3 },
};

function generatePattern(length: number) {
  return Array.from({ length }, () =>
    Math.floor(Math.random() * COLORS.length)
  );
}

export default function PatternMemoryPage() {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [pattern, setPattern] = useState<number[]>([]);
  const [userInput, setUserInput] = useState<number[]>([]);
  const [step, setStep] = useState<"start" | "show" | "input" | "result">(
    "start"
  );
  const [result, setResult] = useState<null | boolean>(null);
  const [playerName, setPlayerName] = useState("");
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);

  useEffect(() => {
    if (step === "show") {
      setTimeout(() => {
        setStep("input");
      }, DIFFICULTY_SETTINGS[difficulty].time * 1000);
    }
  }, [step, difficulty]);

  const startGame = () => {
    setPattern(generatePattern(DIFFICULTY_SETTINGS[difficulty].length));
    setUserInput([]);
    setStep("show");
    setResult(null);
  };

  const handleColorClick = (colorIdx: number) => {
    if (step !== "input") return;
    const nextInput = [...userInput, colorIdx];
    setUserInput(nextInput);
    if (nextInput.length === pattern.length) {
      const correct = nextInput.every((v, i) => v === pattern[i]);
      setResult(correct);
      setStep("result");
      if (correct) setScore((s) => s + 1);
    }
  };

  const nextRound = () => {
    setRound((r) => r + 1);
    setPattern(generatePattern(DIFFICULTY_SETTINGS[difficulty].length));
    setUserInput([]);
    setStep("show");
    setResult(null);
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
            Pattern Memory
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

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as Difficulty)}
              className="px-4 py-2 border border-gray-200 rounded-lg"
              disabled={step === "show" || step === "input"}
            >
              <option value="easy">Easy (4 colors)</option>
              <option value="medium">Medium (6 colors)</option>
              <option value="hard">Hard (8 colors)</option>
            </select>
            <Button
              onClick={startGame}
              disabled={
                !playerName.trim() || step === "show" || step === "input"
              }
              className="bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700"
            >
              {step === "start" ? "Start Game" : "Restart"}
            </Button>
          </div>

          {/* Pattern Display */}
          {step === "show" && (
            <div className="flex flex-col items-center mb-8">
              <div className="mb-4 text-lg font-semibold text-gray-700">
                Memorize the pattern!
              </div>
              <div className="flex gap-2">
                {pattern.map((colorIdx, i) => (
                  <div
                    key={i}
                    className={`w-12 h-12 rounded-lg ${COLORS[colorIdx]} border-2 border-gray-200`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* User Input */}
          {step === "input" && (
            <div className="flex flex-col items-center mb-8">
              <div className="mb-4 text-lg font-semibold text-gray-700">
                Repeat the pattern:
              </div>
              <div className="flex gap-2 mb-4">
                {userInput.map((colorIdx, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded-lg ${COLORS[colorIdx]} border-2 border-gray-200`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                {COLORS.map((color, idx) => (
                  <Button
                    key={color}
                    className={`w-10 h-10 p-0 rounded-lg ${color}`}
                    onClick={() => handleColorClick(idx)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Result */}
          {step === "result" && (
            <div className="flex flex-col items-center mb-8">
              <div className="mb-4 text-2xl font-bold">
                {result ? "✅ Correct!" : "❌ Incorrect!"}
              </div>
              <div className="flex gap-2 mb-4">
                {pattern.map((colorIdx, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded-lg ${COLORS[colorIdx]} border-2 border-gray-200`}
                  />
                ))}
              </div>
              <Button
                onClick={nextRound}
                className="bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700"
              >
                Next Round
              </Button>
            </div>
          )}

          {/* Score */}
          <div className="flex justify-between mt-8">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold">Score: {score}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <span className="font-semibold">Round: {round}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
