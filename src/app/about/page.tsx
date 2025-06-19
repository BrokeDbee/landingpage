"use client";

import { motion } from "framer-motion";
import {
  Target,
  Award,
  Heart,
  Shield,
  Lightbulb,
  Calendar,
  Users,
} from "lucide-react";

export default function AboutPage() {
  const stats = [
    { icon: Users, value: "5000+", label: "Students Represented" },
    { icon: Calendar, value: "50+", label: "Events Organized" },
    { icon: Award, value: "15+", label: "Years of Service" },
    { icon: Heart, value: "100%", label: "Student Focused" },
  ];

  const values = [
    {
      icon: Shield,
      title: "Student-Centeredness",
      description: "Always putting student needs, welfare, and voice first.",
    },
    {
      icon: Target,
      title: "Integrity",
      description:
        " Upholding transparency, accountability, and ethical conduct.",
    },
    {
      icon: Users,
      title: "Inclusivity",
      description:
        "Celebrating diversity and ensuring every student feels represented.",
    },

    {
      icon: Heart,
      title: "Collaboration",
      description:
        "Building strong partnerships with university stakeholders and student organizations.",
    },
    {
      icon: Lightbulb,
      title: "Empowerment",
      description: "Encouraging student leadership and personal growth.",
    },
  ];
  const timeline = [
    {
      year: "2007",
      title: "Foundation",
      description:
        "Knutsford University College was launched in East Legon, Accra—established to deliver high-quality, affordable higher education in Ghana.",
    },
    {
      year: "2010–2015",
      title: "Campus Expansion",
      description:
        "A Kumasi campus was opened to accommodate growing demand from students in the Ashanti region.",
    },
    {
      year: "2012",
      title: "Formation",
      description:
        "Formation of the SRC as an elected body to foster student representation and participation in governance.",
    },
    {
      year: "2015–2019",
      title: "Expanded Reach",
      description:
        "The SRC expanded its reach by launching campus-wide events: academic symposia, cultural fests, community outreach, and recreational tours, in partnership with the Office of Student Services.",
    },
    {
      year: "2020–2021",
      title: "Hybrid Engagement",
      description:
        "Despite pandemic-related challenges, the SRC adapted to hybrid student engagement—facilitating online forums, virtual events, and wellness initiatives.",
    },
    {
      year: "2022",
      title: "Environmental Campaign",
      description:
        "SRC-led environmental and sanitation campaigns earned university-wide praise, contributing to Knutsford’s recognition at the Ghana Environmental & Sanitation Awards.",
    },
    {
      year: "2025",
      title: "SRC Week",
      description:
        "SRC Week has become a hallmark of the academic calendar—featuring student showcases, competitions, forums, and social events across both Accra and Kumasi campuses.",
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
              About KNUST SRC
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto">
              The Knutsford University Student Representative Council (SRC) is
              the official voice of the student body at Knutsford University,
              championing student interests and driving campus life. Through
              collaboration with university leadership, faculty, and student
              organizations, the SRC is committed to enhancing the academic,
              cultural, and social experience of every student.
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
              • To represent and advocate for student welfare, rights, and
              interests within the university framework.
              <br />• To facilitate vibrant student engagement by supporting
              clubs, events, and educational initiatives.
              <br />• To foster leadership, civic responsibility, and community
              involvement among the student body.
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
              To cultivate an empowered, inclusive, and dynamic student
              community—where every Knutsford University student is inspired to
              lead, innovate, and positively impact Ghana and beyond.
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
              <div className="text-3xl font-bold text-gray-800 mb-2">
                {stat.value}
              </div>
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
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {value.title}
                </h3>
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
                  <div
                    className={`w-1/2 ${
                      index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"
                    }`}
                  >
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <div className="text-2xl font-bold text-blue-600 mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {item.title}
                      </h3>
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
            Looking Ahead
          </h2>
          <div className="prose prose-lg text-gray-600 max-w-none">
            <p className="mb-6">
              In the coming years, the Knutsford University SRC will continue
              to:
            </p>
            <p className="mb-6">
              • Amplify student voices in policy and campus decision-making.
            </p>
            <p className="mb-6">
              • Enhance support systems for student wellness, academic success,
              and career readiness.
            </p>
            <p>
              • Grow community outreach, entrepreneurial incubation, and
              leadership development programs.
            </p>
            <p>
              {" "}
              • Foster a unified university culture across campuses—promoting
              inclusion, innovation, and student excellence.
            </p>
          </div>
        </motion.div>

        <div className="mt-8">
          <p>
            Join us in shaping a campus community that represents, empowers, and
            celebrates every Knutsford University student—today, and for
            generations to come.
          </p>
        </div>
      </div>
    </div>
  );
}
