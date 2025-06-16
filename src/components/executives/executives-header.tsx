"use client";

import { motion } from "framer-motion";

export function ExecutivesHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center space-y-4"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
        Our Executive Team
      </h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Meet the dedicated leaders who drive our institution forward with
        vision, expertise, and unwavering commitment to student success.
      </p>
    </motion.div>
  );
}
