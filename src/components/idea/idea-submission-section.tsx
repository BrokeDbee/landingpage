"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IdeaSubmissionDialog } from "@/components/idea/idea-submission-dialog";

export default function IdeaSubmissionSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <section className="relative py-20 overflow-hidden text-white bg-gradient-to-br from-blue-600 via-orange-600 to-indigo-700">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute w-32 h-32 rounded-full top-10 left-10 bg-orange-100/30"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute w-24 h-24 rounded-full bottom-10 right-10 bg-blue-100/30"
        />
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Share Your Ideas
          </h2>
          <p className="max-w-3xl mx-auto mb-12 text-xl  md:text-2xl">
            Have suggestions for improving student life? We want to hear from
            you! Your ideas can make a real difference in our community.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05, y: -10 }}
            className="max-w-md mx-auto"
          >
            <div className="p-8 transition-all duration-300 bg-white border border-gray-200 shadow-lg rounded-2xl hover:shadow-xl hover:border-orange-200">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg"
              >
                <MessageCircle className="w-8 h-8 text-white" />
              </motion.div>

              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                Submit Your Idea
              </h3>
              <p className="mb-8 leading-relaxed text-gray-600">
                Share your thoughts on how we can improve student life, campus
                facilities, or any other aspect of your university experience.
              </p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => setIsDialogOpen(true)}
                  className="w-full px-8 py-4 text-white transition-all bg-gradient-to-r from-orange-500 to-orange-600 rounded-full hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl group"
                >
                  Share Your Idea
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <IdeaSubmissionDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </section>
  );
}
