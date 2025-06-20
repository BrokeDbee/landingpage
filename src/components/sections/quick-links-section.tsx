"use client";

import { motion } from "framer-motion";
import { FileText, ArrowRight, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { getDocuments } from "@/lib/api/services/documents";
import { DocumentWithRelations } from "@/lib/api/services/documents";
import Link from "next/link";

export default function QuickLinksSection() {
  const [mounted, setMounted] = useState(false);
  const [documents, setDocuments] = useState<DocumentWithRelations[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    const fetchDocuments = async () => {
      try {
        const response = await getDocuments({ limit: 4 });
        console.log(response);
        if (response.success && response.data) {
          setDocuments(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const getRandomGradient = (index: number) => {
    const gradients = [
      "from-violet-500 via-orange-500 to-indigo-600",
      "from-blue-500 via-cyan-500 to-teal-600",
      "from-rose-500 via-pink-500 to-fuchsia-600",
      "from-orange-500 via-amber-500 to-yellow-600",
    ];
    return gradients[index % gradients.length];
  };

  const getRandomGlow = (index: number) => {
    const glows = ["violet", "blue", "rose", "orange"];
    return glows[index % glows.length];
  };

  return (
    <section className="relative min-h-screen py-24 overflow-hidden bg-gradient-to-br from-slate-900 via-z-900 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000" />

        {mounted &&
          [...Array(20)].map((_, i) => (
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
            Featured Documents
          </motion.div>

          <h2 className="mb-6 text-6xl font-bold text-transparent bg-gradient-to-r from-white via-orange-200 to-blue-200 bg-clip-text">
            Important Resources
            <br />
            <span className="text-transparent bg-gradient-to-r from-orange-400 via-pink-400 to-blue-400 bg-clip-text">
              At Your Fingertips
            </span>
          </h2>

          <p className="max-w-3xl mx-auto text-xl text-slate-300 leading-relaxed">
            Access key documents and resources to support your academic journey
          </p>
        </motion.div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {loading
            ? // Loading skeletons
              [...Array(4)].map((_, index) => (
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
                  <div className="relative block h-full p-8 overflow-hidden transition-all duration-500 border bg-white/5 backdrop-blur-lg rounded-3xl border-white/10">
                    <div className="animate-pulse space-y-4">
                      <div className="h-12 w-12 bg-slate-700 rounded-xl" />
                      <div className="h-4 bg-slate-700 rounded w-3/4" />
                      <div className="h-4 bg-slate-700 rounded w-1/2" />
                    </div>
                  </div>
                </motion.div>
              ))
            : documents.map((doc, index) => (
                <motion.div
                  key={doc.id}
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
                  <Link href={`/documents/${doc.id}`}>
                    <motion.div
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
                          className={`absolute inset-0 bg-gradient-to-br ${getRandomGradient(
                            index
                          )} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl blur-xl`}
                        />

                        {/* Content */}
                        <div className="relative z-10">
                          {/* Icon */}
                          <motion.div
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.8, type: "spring" }}
                            className={`w-20 h-20 bg-gradient-to-br ${getRandomGradient(
                              index
                            )} rounded-2xl flex items-center justify-center mb-6 shadow-2xl group-hover:shadow-3xl transition-shadow duration-300`}
                            style={{
                              boxShadow: `0 20px 40px -12px ${
                                getRandomGlow(index) === "violet"
                                  ? "#8b5cf6"
                                  : getRandomGlow(index) === "blue"
                                  ? "#3b82f6"
                                  : getRandomGlow(index) === "rose"
                                  ? "#f43f5e"
                                  : "#f97316"
                              }40`,
                            }}
                          >
                            <FileText className="w-10 h-10 text-white" />
                          </motion.div>

                          {/* Text */}
                          <div className="space-y-3">
                            <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-200 group-hover:bg-clip-text transition-all duration-300">
                              {doc.title}
                            </h3>

                            <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                              {doc.description || "No description available"}
                            </p>
                          </div>

                          {/* Arrow indicator */}
                          <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            whileHover={{ x: 0, opacity: 1 }}
                            className="flex items-center gap-2 mt-6 text-sm font-medium text-transparent bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text"
                          >
                            View Document
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
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-slate-400">
            Need more resources?{" "}
            <Link href="/documents" className="text-orange-400 hover:underline">
              Browse all documents
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
