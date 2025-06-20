"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home, Share2, Trophy, Clock } from "lucide-react";
import Link from "next/link";

function generateSequence(length: number) {
  return Array.from({ length }, () => Math.floor(Math.random() * 10));
}

type Difficulty = "easy" | "medium" | "hard";

const DIFFICULTY_SETTINGS = {
  easy: { length: 4, time: 2 },
  medium: { length: 6, time: 2.5 },
  hard: { length: 8, time: 3 },
};

export default function NumberSequencePage() {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [sequence, setSequence] = useState<number[]>([]);
  const [userInput, setUserInput] = useState("");
  const [step, setStep] = useState<"start" | "show" | "input" | "result">("start");
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
    setSequence(generateSequence(DIFFICULTY_SETTINGS[difficulty].length));
    setUserInput("");
    setStep("show");
    setResult(null);
  };

  const checkAnswer = () => {
    if (userInput.length !== sequence.length) return;
    const correct =
      userInput.split("").map(Number).join("") === sequence.join("");
    setResult(correct);
    setStep("result");
    if (correct) setScore((s) => s + 1);
  };

  const nextRound = () => {
    setRound((r) => r + 1);
    setSequence(generateSequence(DIFFICULTY_SETTINGS[difficulty].length));
    setUserInput("");
    setStep("show");
    setResult(null);
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
            Number Sequence
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

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as Difficulty)}
              className="px-4 py-2 border border-gray-200 rounded-lg"
              disabled={step === "show" || step === "input"}
            >
              <option value="easy">Easy (4 digits)</option>
              <option value="medium">Medium (6 digits)</option>
              <option value="hard">Hard (8 digits)</option>
            </select>
            <Button
              onClick={startGame}
              disabled={!playerName.trim() || step === "show" || step === "input"}
              className="bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700"
            >
              {step === "start" ? "Start Game" : "Restart"}
            </Button>
          </div>

          {/* Sequence Display */}
          {step === "show" && (
            <div className="flex flex-col items-center mb-8">
              <div className="mb-4 text-lg font-semibold text-gray-700">
                Memorize the sequence!
              </div>
              <div className="flex gap-2 text-2xl font-bold">
                {sequence.map((num, i) => (
                  <div key={i} className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-lg border-2 border-gray-200">
                    {num}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* User Input */}
          {step === "input" && (
            <div className="flex flex-col items-center mb-8">
              <div className="mb-4 text-lg font-semibold text-gray-700">
                Enter the sequence:
              </div>
              <Input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value.replace(/[^0-9]/g, ""))}
                onKeyPress={handleKeyPress}
                placeholder="Type the numbers in order"
                className="text-xl text-center py-4 mb-6 max-w-xs mx-auto"
                autoFocus
                maxLength={sequence.length}
              />
              <Button
                onClick={checkAnswer}
                className="px-8 py-3 text-lg bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                Submit
              </Button>
            </div>
          )}

          {/* Result */}
          {step === "result" && (
            <div className="flex flex-col items-center mb-8">
              <div className="mb-4 text-2xl font-bold">
                {result ? "✅ Correct!" : "❌ Incorrect!"}
              </div>
              <div className="flex gap-2 mb-4 text-2xl font-bold">
                {sequence.map((num, i) => (
                  <div key={i} className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-lg border-2 border-gray-200">
                    {num}
                  </div>
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
