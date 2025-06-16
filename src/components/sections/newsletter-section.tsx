"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { subscribeToNewsletter } from "@/lib/api/services/newsletter";

export default function NewsletterSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    studentId: "",
    consent: false,
  });

  const [status, setStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message: string;
  }>({
    type: "idle",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Subscribing..." });

    try {
      const res = await subscribeToNewsletter(
        formData.email,
        formData.fullName,
        formData.studentId
      );

      if (!res.success || !res.data) {
        throw new Error(res.error || "Subscription failed");
      }

      setStatus({
        type: "success",
        message:
          "Thank you for subscribing! Please check your email to confirm your subscription.",
      });

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        studentId: "",
        consent: false,
      });
    } catch (error) {
      console.error("Subscription error:", error);
      setStatus({
        type: "error",
        message: "Failed to subscribe. Please try again.",
      });
    }
  };

  return (
    <section className="relative py-20 overflow-hidden text-white bg-gradient-to-br from-blue-600 via-orange-600 to-indigo-700">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className={`absolute inset-0 bg-[url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")]`}
        />
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center w-20 h-20 mx-auto mb-8 rounded-full bg-white/20"
          >
            <Mail className="w-10 h-10" />
          </motion.div>

          <h2 className="mb-6 text-4xl font-bold md:text-5xl">Stay Updated</h2>
          <p className="max-w-3xl mx-auto mb-12 text-xl text-blue-100 md:text-2xl">
            Subscribe to our newsletter to receive important updates, upcoming
            events, and latest news directly in your inbox.
          </p>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <motion.div
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="w-full h-full px-6 py-4 text-white border rounded-xl bg-white/10 border-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
                />
              </motion.div>

              <motion.div
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  className="w-full h-full  px-6 py-4 text-white border rounded-xl bg-white/10 border-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
                />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <motion.div
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  placeholder="Student ID"
                  required
                  className="w-full h-full  px-6 py-4 text-white border rounded-xl bg-white/10 border-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
                />
              </motion.div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-center gap-3 text-sm"
            >
              <Checkbox
                id="consent"
                checked={formData.consent}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    consent: checked as boolean,
                  }))
                }
                required
                className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-blue-600"
              />
              <label htmlFor="consent" className="text-blue-100 cursor-pointer">
                I agree to receive newsletters and updates from Knutsford
                University SRC
              </label>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="submit"
                disabled={status.type === "loading"}
                className="w-full px-8 py-4 font-bold text-blue-600 transition duration-300 bg-white shadow-lg hover:bg-gray-100 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl"
              >
                {status.type === "loading" ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  "Subscribe Now"
                )}
              </Button>
            </motion.div>
          </motion.form>

          {status.type !== "idle" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-6 p-6 rounded-xl backdrop-blur-sm ${
                status.type === "success"
                  ? "bg-green-500/20 border border-green-400/30"
                  : status.type === "error"
                  ? "bg-red-500/20 border border-red-400/30"
                  : "bg-white/20 border border-white/30"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                {status.type === "success" && (
                  <CheckCircle className="w-5 h-5 text-green-300" />
                )}
                {status.type === "error" && (
                  <AlertCircle className="w-5 h-5 text-red-300" />
                )}
                {status.type === "loading" && (
                  <Loader2 className="w-5 h-5 animate-spin" />
                )}
                <span>{status.message}</span>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-sm text-blue-100"
          >
            <p className="mb-4">
              By subscribing, you&apos;ll receive updates about:
            </p>
            <div className="grid max-w-2xl grid-cols-1 gap-2 mx-auto md:grid-cols-2">
              {[
                "Important announcements and news",
                "Upcoming events and activities",
                "Student welfare initiatives",
                "Academic updates and opportunities",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="flex-shrink-0 w-4 h-4 text-green-300" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
