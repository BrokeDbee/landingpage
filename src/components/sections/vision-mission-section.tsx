"use client";

import { motion } from "framer-motion";
import { Eye, Target, Heart, Users, TrendingUp, Handshake } from "lucide-react";

const values = [
  {
    icon: Users,
    title: "Inclusivity",
    description:
      "Embracing diversity and ensuring equal opportunities for all students",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: TrendingUp,
    title: "Excellence",
    description: "Striving for the highest standards in all our endeavors",
    color: "from-green-500 to-green-600",
  },
  {
    icon: Handshake,
    title: "Integrity",
    description:
      "Maintaining transparency and ethical conduct in all operations",
    color: "from-orange-500 to-orange-600",
  },
];

export default function VisionMissionSection() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-10 right-10 w-32 h-32 bg-blue-300 rounded-full opacity-20"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute bottom-10 left-10 w-48 h-48 bg-orange-400 rounded-full opacity-20"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
            Our Vision & Mission
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Driving positive change and empowering students to reach their full
            potential
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="group h-full"
          >
            <div className="bg-gradient-to-br h-full from-blue-50 to-orange-50 p-8 rounded-3xl border border-blue-100 group-hover:border-blue-200 transition-all duration-300 relative overflow-hidden">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-20 h-20 bg-gradient-to-br from-blue-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
              >
                <Eye className="w-10 h-10 text-white" />
              </motion.div>

              <h3 className="text-3xl font-bold mb-6 text-gray-800">
                Our Vision
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                To be the leading voice of student welfare and development,
                fostering an inclusive and dynamic campus environment where
                every student can thrive academically, socially, and personally.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-4 p-4 bg-white/50 rounded-xl"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center"
                >
                  <Heart className="text-blue-600 text-xl" />
                </motion.div>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Empowering Students
                  </h4>
                  <p className="text-gray-600">
                    Creating opportunities for growth and leadership
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="group h-full"
          >
            <div className="bg-gradient-to-br h-full from-orange-50 to-pink-50 p-8 rounded-3xl border border-orange-100 group-hover:border-orange-200 transition-all duration-300 relative overflow-hidden">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-20 h-20 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
              >
                <Target className="w-10 h-10 text-white" />
              </motion.div>

              <h3 className="text-3xl font-bold mb-6 text-gray-800">
                Our Mission
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                To represent and advocate for student interests, promote
                academic excellence, and enhance the overall student experience
                through effective leadership, transparent communication, and
                meaningful engagement.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-4 p-4 bg-white/50 rounded-xl "
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center"
                >
                  <Users className="text-orange-600 text-xl" />
                </motion.div>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Building Community
                  </h4>
                  <p className="text-gray-600">
                    Fostering unity and collaboration among students
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold mb-4 text-gray-800">
            Our Core Values
          </h3>
          <p className="text-gray-600 text-lg">
            The principles that guide everything we do
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { duration: 0.2 },
              }}
              className="group h-full "
            >
              <div className="bg-white h-full  p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:border-gray-200 relative overflow-hidden">
                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                >
                  <value.icon className="w-10 h-10 text-white" />
                </motion.div>

                <h4 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-gray-900 transition-colors">
                  {value.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
