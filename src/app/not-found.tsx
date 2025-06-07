"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();
  const [positions, setPositions] = useState<
    { x: number; y: number; duration: number }[]
  >([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pos = [...Array(20)].map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        duration: Math.random() * 10 + 10,
      }));
      setPositions(pos);
    }
  }, []);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const numberVariants = {
    hidden: { scale: 0, rotate: -45 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const glowVariants = {
    glow: {
      boxShadow: [
        "0 0 20px rgba(147, 51, 234, 0.3)",
        "0 0 40px rgba(147, 51, 234, 0.6)",
        "0 0 20px rgba(147, 51, 234, 0.3)",
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-orange-900 to-blue-900 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {positions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-orange-400 rounded-full opacity-20"
            initial={{ x: pos.x, y: pos.y }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: pos.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </div>

      <motion.div
        className="text-center z-10 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Large 404 Numbers */}
        <motion.div
          className="flex justify-center items-center space-x-4 mb-8"
          variants={numberVariants}
        >
          <motion.span
            className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600"
            variants={glowVariants}
            animate="glow"
          >
            4
          </motion.span>
          <motion.div
            className="relative"
            variants={floatingVariants}
            animate="float"
          >
            <span className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-orange-400">
              0
            </span>
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-orange-500 opacity-30"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
          <motion.span
            className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600"
            variants={glowVariants}
            animate="glow"
          >
            4
          </motion.span>
        </motion.div>

        {/* Main Content Card */}
        <motion.div variants={itemVariants}>
          <Card className="bg-black/20 backdrop-blur-lg border-orange-500/20 shadow-2xl">
            <CardContent className="p-8">
              <motion.div
                className="flex justify-center mb-6"
                variants={itemVariants}
              >
                <motion.div
                  className="p-4 rounded-full bg-orange-600/20 border border-orange-500/30"
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <Zap className="w-8 h-8 text-orange-400" />
                </motion.div>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl font-bold text-white mb-4"
                variants={itemVariants}
              >
                Oops! Page Not Found
              </motion.h1>

              <motion.p
                className="text-xl text-orange-200 mb-8 max-w-2xl mx-auto leading-relaxed"
                variants={itemVariants}
              >
                The page you&apos;re looking for seems to have vanished into the
                digital void. Don&apos;t worry though – we&apos;ll help you find
                your way back to familiar territory.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                variants={itemVariants}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 text-white border-none shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
                    asChild
                  >
                    <Link href="/">
                      <Home className="w-5 h-5 mr-2" />
                      Go Home
                    </Link>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-orange-300 hover:bg-orange-600/20 hover:text-white transition-all duration-300"
                    onClick={() => router.back()}
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Go Back
                  </Button>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
