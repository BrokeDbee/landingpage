"use client";

import { motion } from "framer-motion";
import { Play, Users, Star, BookOpen, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const floatingCards = [
  {
    icon: BookOpen,
    title: "Academic Support",
    color: "bg-blue-500",
    position: "top-4 right-4",
  },
  {
    icon: Users,
    title: "Student Community",
    color: "bg-orange-500",
    position: "top-20 left-8",
  },
  {
    icon: Award,
    title: "Leadership",
    color: "bg-green-500",
    position: "bottom-16 right-8",
  },
  {
    icon: Star,
    title: "Excellence",
    color: "bg-orange-500",
    position: "bottom-4 left-4",
  },
];

export default function HeroSection() {
  return (
    <section className="flex items-center justify-center   " id="home">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full overflow-hidden bg-white min-h-screen "
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          {/* Left Content */}
          <div className="flex flex-col justify-center p-8 lg:p-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 lg:text-6xl">
                Get where you&apos;re{" "}
                <span className="text-gray-900">going faster with</span>{" "}
                <span className="text-red-500">Knutsford SRC.</span>
              </h1>

              <p className="mb-8 text-xl leading-relaxed text-gray-600">
                Expand your university experience through leadership, community
                engagement, and student advocacy.
              </p>

              <div className="flex flex-col gap-4 mb-12 sm:flex-row">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="px-8 py-4 text-lg font-semibold text-white bg-red-500 rounded-full shadow-lg hover:bg-red-600"
                  >
                    Get Involved
                  </Button>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 text-lg font-semibold text-gray-700 transition-colors hover:text-gray-900"
                >
                  <div className="flex items-center justify-center w-12 h-12 transition-colors bg-gray-100 rounded-full hover:bg-gray-200">
                    <Play className="w-5 h-5 ml-1" />
                  </div>
                  Watch Video
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Image and Floating Elements */}
          <div className="relative flex items-center justify-center p-8 lg:p-16">
            {/* Background Shapes */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="absolute w-64 h-64 bg-pink-300 rounded-full top-1/4 left-1/4 opacity-60"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 25,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="absolute w-48 h-48 bg-orange-400 rounded-full opacity-50 bottom-1/4 right-1/4"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 30,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="absolute w-32 h-32 bg-teal-400 rounded-full top-1/2 right-1/3 opacity-40"
              />
            </div>

            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative z-10"
            >
              <Image
                src="/images/hero-image.jpg"
                alt="Student representative"
                className="object-cover rounded-full shadow-2xl w-80 h-80"
                priority
                width={320}
                height={320}
              />
            </motion.div>

            {/* Floating Cards */}
            {floatingCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className={`absolute ${card.position} z-20`}
              >
                <div className="p-4 bg-white border border-gray-100 shadow-lg rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 ${card.color} rounded-xl flex items-center justify-center`}
                    >
                      <card.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-gray-800">
                      {card.title}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute z-20 bottom-8 left-8"
            >
              <div className="p-4 bg-white border border-gray-100 shadow-lg rounded-2xl">
                <div className="flex items-center gap-3">
                  <Image
                    src="https://avatar.iran.liara.run/public/boy"
                    alt="SRC President"
                    className="object-cover w-10 h-10 rounded-full"
                    width={40}
                    height={40}
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      John Doe
                    </p>
                    <p className="text-xs text-gray-600">SRC President</p>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Team Members Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="absolute z-20 top-8 right-8"
            >
              <div className="p-4 bg-white border border-gray-100 shadow-lg rounded-2xl">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <Image
                        key={i}
                        src={`https://avatar.iran.liara.run/public/${i + 1}`}
                        width={32}
                        height={32}
                        alt={`Team member ${i + 1}`}
                        className="object-cover w-8 h-8 border-2 border-white rounded-full"
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full">
                    <span className="text-xs font-semibold text-gray-600">
                      +
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-6 h-10 border-2 border-orange-500/50 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="w-1 h-3 bg-orange-500 rounded-full mt-1"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
