"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Users, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

const actionItems = [
  {
    icon: MessageCircle,
    title: "Share Your Ideas",
    description:
      "Have suggestions for improving student life? We want to hear from you!",
    action: "Submit Idea",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Users,
    title: "Join a Committee",
    description:
      "Get involved in decision-making and help shape university policies.",
    action: "Join Now",
    color: "from-green-500 to-green-600",
  },
  {
    icon: Lightbulb,
    title: "Volunteer",
    description:
      "Make a difference by volunteering for events and community initiatives.",
    action: "Volunteer",
    color: "from-orange-500 to-orange-600",
  },
];

export default function CallToActionSection() {
  return (
    <section className="relative py-20 overflow-hidden text-white bg-gradient-to-br from-blue-600 via-orange-600 to-indigo-700">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute w-32 h-32 rounded-full top-10 left-10 bg-white/5"
        />
        <motion.div
          animate={{
            scale: [1.3, 1, 1.3],
            rotate: [360, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute w-48 h-48 rounded-full bottom-10 right-10 bg-white/5"
        />
      </div>

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white/30"
          animate={{
            y: [0, -50, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      <div className="container relative z-10 px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold md:text-6xl">
            Get Involved Today
          </h2>
          <p className="max-w-4xl mx-auto mb-8 text-xl text-blue-100 md:text-2xl">
            Join us in making a difference. Whether you want to participate in
            events, join committees, or share your ideas, there&apos;s a place
            for you in the SRC.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 mb-16 md:grid-cols-3">
          {actionItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group"
            >
              <div className="p-8 transition-all duration-300 border bg-white/10 backdrop-blur-lg rounded-2xl border-white/20 hover:border-white/40">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                >
                  <item.icon className="w-8 h-8 text-white" />
                </motion.div>

                <h3 className="mb-4 text-2xl font-bold text-center">
                  {item.title}
                </h3>
                <p className="mb-6 leading-relaxed text-center text-blue-100">
                  {item.description}
                </p>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-center"
                >
                  <Button
                    variant="outline"
                    className="px-6 py-3 text-white transition-all border-2 rounded-full border-white/30 hover:bg-white/10 backdrop-blur-sm group-hover:border-white/50 bg-gradient-to-br from-white/10 to-white/20 hover:shadow-lg"
                    onClick={() => alert(`Action: ${item.action}`)}
                    aria-label={`Action: ${item.action}`}
                  >
                    {item.action}
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <Button
            size="lg"
            className="px-12 py-4 font-bold text-blue-600 transition-all duration-300 bg-white rounded-full shadow-2xl hover:bg-gray-100 hover:shadow-white/25 group"
          >
            Start Your Journey
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
