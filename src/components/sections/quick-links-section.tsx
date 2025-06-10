"use client";

import { motion } from "framer-motion";
import { Book, Users, MessageCircle, ArrowRight, Sparkles } from "lucide-react";

const quickLinks = [
  {
    icon: Book,
    text: "Academic Calendar",
    description: "Plan your semester",
    href: "#calendar",
    color: "from-violet-500 via-orange-500 to-indigo-600",
    bgGlow: "violet",
  },

  {
    icon: Users,
    text: "Student Handbook",
    description: "Your guide to success",
    href: "#handbook",
    color: "from-rose-500 via-pink-500 to-fuchsia-600",
    bgGlow: "rose",
  },
  {
    icon: MessageCircle,
    text: "Student Forum",
    description: "Connect & discuss",
    href: "#forum",
    color: "from-orange-500 via-amber-500 to-yellow-600",
    bgGlow: "orange",
  },
];

export default function QuickLinksSection() {
  return (
    <section className="relative min-h-screen py-24 overflow-hidden bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000" />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 px-6 mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-3 mb-6 text-sm font-medium text-orange-200 border border-orange-400/30 rounded-full bg-orange-500/10 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4" />
            Quick Access Hub
          </motion.div>

          <h2 className="mb-6 text-6xl font-bold text-transparent bg-gradient-to-r from-white via-orange-200 to-blue-200 bg-clip-text">
            Your Gateway to
            <br />
            <span className="text-transparent bg-gradient-to-r from-orange-400 via-pink-400 to-blue-400 bg-clip-text">
              Academic Excellence
            </span>
          </h2>

          <p className="max-w-3xl mx-auto text-xl text-slate-300 leading-relaxed">
            Access everything you need in one beautiful, intuitive interface.
            Your academic journey starts here.
          </p>
        </motion.div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((link, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100, rotateX: -30 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              className="group perspective-1000"
            >
              <motion.a
                href={link.href}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  z: 50,
                }}
                whileTap={{ scale: 0.95 }}
                className="relative block h-full"
              >
                <div className="relative h-full p-8 overflow-hidden transition-all duration-500 border bg-white/5 backdrop-blur-lg rounded-3xl border-white/10 group-hover:border-white/20 group-hover:bg-white/10">
                  {/* Glow effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl blur-xl`}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.8, type: "spring" }}
                      className={`w-20 h-20 bg-gradient-to-br ${link.color} rounded-2xl flex items-center justify-center mb-6 shadow-2xl group-hover:shadow-3xl transition-shadow duration-300`}
                      style={{
                        boxShadow: `0 20px 40px -12px ${
                          link.bgGlow === "violet"
                            ? "#8b5cf6"
                            : link.bgGlow === "emerald"
                            ? "#10b981"
                            : link.bgGlow === "rose"
                            ? "#f43f5e"
                            : link.bgGlow === "orange"
                            ? "#f97316"
                            : link.bgGlow === "blue"
                            ? "#3b82f6"
                            : link.bgGlow === "yellow"
                            ? "#eab308"
                            : link.bgGlow === "indigo"
                            ? "#6366f1"
                            : "#14b8a6"
                        }40`,
                      }}
                    >
                      <link.icon className="w-10 h-10 text-white" />
                    </motion.div>

                    {/* Text */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-200 group-hover:bg-clip-text transition-all duration-300">
                        {link.text}
                      </h3>

                      <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                        {link.description}
                      </p>
                    </div>

                    {/* Arrow indicator */}
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      whileHover={{ x: 0, opacity: 1 }}
                      className="flex items-center gap-2 mt-6 text-sm font-medium text-transparent bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text"
                    >
                      Explore
                      <ArrowRight className="w-4 h-4 text-orange-400" />
                    </motion.div>
                  </div>

                  {/* Shine effect */}
                  <motion.div
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                  />
                </div>
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
