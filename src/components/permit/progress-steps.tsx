import React from "react";
import { motion } from "framer-motion";

interface ProgressStepsProps {
  step: number;
}

export function ProgressSteps({ step }: ProgressStepsProps) {
  return (
    <div className="flex justify-between mb-12">
      {[1, 2, 3, 4, 5].map((stepNumber) => {
        let displayStep = step;
        if (step === 1.1 || step === 1.5) displayStep = 1;

        return (
          <div
            key={stepNumber}
            className={`flex items-center ${stepNumber !== 5 ? "flex-1" : ""}`}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                displayStep >= stepNumber
                  ? "bg-gradient-to-r from-blue-600 to-orange-600 text-white shadow-lg"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {stepNumber}
            </motion.div>
            {stepNumber !== 5 && (
              <div
                className={`flex-1 h-2 mx-4 rounded-full transition-all duration-300 ${
                  displayStep > stepNumber
                    ? "bg-gradient-to-r from-blue-600 to-orange-600"
                    : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
