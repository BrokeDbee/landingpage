"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FileText,
  Users,
  MessageCircle,
  BookOpen,
  HeartPulse,
  DollarSign,
  GraduationCap,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: FileText,
    title: "Exam Permits",
    description:
      "Request and download your exam permits for the current semester.",
    href: "/services/permits/request",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: HeartPulse,
    title: "Student Welfare",
    description:
      "Access counseling services, health support, and welfare initiatives.",
    href: "/services/welfare",
    color: "from-green-500 to-green-600",
  },
  {
    icon: MessageCircle,
    title: "Grievance Portal",
    description: "Submit complaints, suggestions, and feedback to the SRC.",
    href: "/services/grievance",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: BookOpen,
    title: "Academic Support",
    description:
      "Get help with academic challenges, appeals, and representation.",
    href: "/services/academic",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: DollarSign,
    title: "Financial Assistance",
    description:
      "Apply for scholarships, bursaries, and emergency financial aid.",
    href: "/services/financial-aid",
    color: "from-red-500 to-red-600",
  },
  {
    icon: GraduationCap,
    title: "Career Services",
    description:
      "Access career counseling, job listings, and internship opportunities.",
    href: "/services/career",
    color: "from-yellow-500 to-yellow-600",
  },
  {
    icon: Users,
    title: "Clubs & Societies",
    description: "Join or create student clubs and societies on campus.",
    href: "/services/clubs",
    color: "from-indigo-500 to-indigo-600",
  },
  {
    icon: HelpCircle,
    title: "Help Center",
    description: "Find answers to common questions and get assistance.",
    href: "/services/help",
    color: "from-pink-500 to-pink-600",
  },
];

export default function ServicesPage() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div
          className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><g fill="#000000" fillOpacity=".1"><path d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/></g></g></svg>')]`}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
            Student Services
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Access a wide range of services provided by the Student
            Representative Council to enhance your university experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                bounce: 0.4,
              }}
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative"
            >
              <Link href={service.href} className="block h-full">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:border-gray-200 relative overflow-hidden h-full flex flex-col">
                  {/* Gradient background on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  />

                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-900 transition-colors mb-3">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 mb-6 flex-grow">
                    {service.description}
                  </p>

                  <Button
                    variant="outline"
                    className="w-full mt-auto border-2 group-hover:border-blue-300 group-hover:bg-blue-50 transition-colors"
                  >
                    Access Service
                  </Button>

                  {/* Hover effect overlay */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Need Help?
            </h3>
            <p className="text-gray-600 mb-6">
              Can&apos;t find what you&apos;re looking for? Our support team is
              here to help you navigate our services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 text-white">
                Contact Support
              </Button>
              <Button variant="outline" className="border-2">
                View FAQ
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
