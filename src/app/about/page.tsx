"use client";

import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getPublicConfig } from "@/lib/api/services/config";
import {
  Users,
  Target,
  Award,
  Heart,
  Shield,
  Lightbulb,
  Calendar,
} from "lucide-react";

export default function AboutPage() {
  const { data: config } = useQuery({
    queryKey: ["public-config"],
    queryFn: getPublicConfig,
    staleTime: 5 * 60 * 1000,
  });

  const stats = [
    { icon: Users, value: "5000+", label: "Students Represented" },
    { icon: Calendar, value: "50+", label: "Events Organized" },
    { icon: Award, value: "15+", label: "Years of Service" },
    { icon: Heart, value: "100%", label: "Student Focused" },
  ];

  const values = [
    {
      icon: Shield,
      title: "Integrity",
      description: "We uphold the highest standards of honesty and ethical behavior in all our actions.",
    },
    {
      icon: Users,
      title: "Inclusivity",
      description: "We ensure every student's voice is heard and represented regardless of background.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We embrace new ideas and creative solutions to address student needs.",
    },
    {
      icon: Heart,
      title: "Service",
      description: "We are committed to serving the student body with dedication and compassion.",
    },
  ];

  const timeline = [
    {
      year: "2008",
      title: "Foundation",
      description: "SRC was established to represent student interests and concerns.",
    },
    {
      year: "2015",
      title: "Digital Transformation",
      description: "Launched online platforms for better student engagement and communication.",
    },
    {
      year: "2020",
      title: "Expanded Services",
      description: "Introduced comprehensive permit system and enhanced student support services.",
    },
    {
      year: "2024",
      title: "Future Forward",
      description: "Continuing to innovate and serve students with modern solutions and approaches.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About {config?.data?.appName || "KNUST SRC"}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto">
              Empowering students, building community, and creating positive change
              on campus through dedicated leadership and innovative solutions.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Target className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              To serve as the primary voice of the student body, advocating for their
              rights, interests, and welfare while fostering a vibrant, inclusive,
              and supportive campus community that promotes academic excellence and
              personal growth.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Award className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-bold text-gray-800">Our Vision</h2>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              To be the leading student representative body that creates an
              environment where every student can thrive academically, socially,
              and personally, while building a legacy of excellence and positive
              impact for future generations.
            </p>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className="text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <stat.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
              >
                <value.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
            Our Journey
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-1 bg-blue-200"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.6 + index * 0.2 }}
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{item.year}</div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-md"></div>
                  
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Description Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="bg-white p-8 rounded-lg shadow-lg"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Who We Are
          </h2>
          <div className="prose prose-lg text-gray-600 max-w-none">
            <p className="mb-6">
              The Student Representative Council (SRC) is the official student government
              body that represents the interests and concerns of all students at
              {config?.data?.appName || "Knutsford University"}. We serve as the bridge
              between students and the university administration, ensuring that student
              voices are heard and their needs are addressed.
            </p>
            <p className="mb-6">
              Our organization is committed to fostering a positive campus environment
              where students can thrive academically, socially, and personally. We
              organize events, provide support services, and advocate for policies
              that benefit the entire student community.
            </p>
            <p>
              Through our dedicated team of elected representatives and appointed
              officials, we work tirelessly to improve student life, enhance campus
              facilities, and create opportunities for personal and professional
              development. Our commitment to excellence and student welfare drives
              everything we do.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 