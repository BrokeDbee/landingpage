"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const getRandomEventImage = () => {
  return `/images/event-placeholder-${Math.floor(Math.random() * 3) + 1}.svg`;
};

const events = [
  {
    title: "Student Leadership Summit",
    date: "March 25, 2024",
    time: "10:00 AM - 4:00 PM",
    location: "Main Auditorium",
    attendees: 250,
    category: "Leadership",
    featured: true,
    description:
      "Join us for an inspiring day of leadership development, networking, and skill-building workshops.",
    image: getRandomEventImage(),
  },
  {
    title: "Cultural Festival",
    date: "April 5, 2024",
    time: "2:00 PM - 8:00 PM",
    location: "University Grounds",
    attendees: 500,
    category: "Cultural",
    description:
      "Celebrate diversity with performances, food, and cultural exhibitions from around the world.",
    image: getRandomEventImage(),
  },
  {
    title: "Career Fair",
    date: "April 15, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "Student Center",
    attendees: 300,
    category: "Career",
    description:
      "Connect with top employers and explore exciting career opportunities.",
    image: getRandomEventImage(),
  },
  {
    title: "Sports Tournament",
    date: "April 20, 2024",
    time: "All Day",
    location: "Sports Complex",
    attendees: 400,
    category: "Sports",
    description:
      "Inter-faculty sports competition featuring football, basketball, and athletics.",
    image: getRandomEventImage(),
  },
];

export default function EventsSection() {
  return (
    <section className="relative py-20 overflow-hidden bg-white" id="events">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute w-40 h-40 rounded-full top-20 right-20 bg-gradient-to-br from-blue-100 to-orange-100 opacity-20"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute rounded-full bottom-20 left-20 w-60 h-60 bg-gradient-to-br from-orange-100 to-pink-100 opacity-20"
        />
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h2 className="mb-4 text-4xl font-bold text-transparent md:text-5xl bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text">
              Upcoming Events
            </h2>
            <p className="text-lg text-gray-600">
              Don&apos;t miss out on these exciting opportunities
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              className="items-center hidden gap-2 border-2 md:flex hover:bg-blue-50"
            >
              View Calendar
              <Calendar className="w-4 h-4" />
            </Button>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`group ${event.featured ? "lg:col-span-2" : "h-full"}`}
            >
              <div
                className={`bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border h-full border-gray-100 ${
                  event.featured ? "border-l-4 border-l-blue-500" : ""
                }`}
              >
                {event.featured && (
                  <div className="flex items-center gap-2 px-6 py-2 text-white bg-gradient-to-r from-blue-600 to-orange-600">
                    <Star className="w-4 h-4" />
                    <span className="font-medium">Featured Event</span>
                  </div>
                )}

                <div className={`${event.featured ? "lg:flex" : ""}`}>
                  <div
                    className={`relative overflow-hidden ${
                      event.featured ? "lg:w-1/2" : ""
                    }`}
                  >
                    <Image
                      src={event.image || "/images/event-placeholder-1.svg"}
                      alt={event.title}
                      width={600}
                      height={400}
                      className={`w-full object-cover group-hover:scale-110 transition-transform duration-500 ${
                        event.featured ? "h-64 lg:h-full" : "h-48"
                      }`}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-sm font-medium text-gray-700 rounded-full bg-white/90">
                        {event.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/20 to-transparent group-hover:opacity-100" />
                  </div>

                  <div
                    className={`p-6 ${
                      event.featured
                        ? "lg:w-1/2 lg:flex lg:flex-col lg:justify-center"
                        : ""
                    }`}
                  >
                    <h3
                      className={`font-bold mb-4 text-gray-800 group-hover:text-blue-600 transition-colors ${
                        event.featured ? "text-2xl lg:text-3xl" : "text-xl"
                      }`}
                    >
                      {event.title}
                    </h3>

                    <p className="mb-6 leading-relaxed text-gray-600">
                      {event.description}
                    </p>

                    <div className="mb-6 space-y-3">
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-3 text-gray-600"
                      >
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                          <Calendar className="w-4 h-4 text-blue-600" />
                        </div>
                        <span>{event.date}</span>
                      </motion.div>

                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-3 text-gray-600"
                      >
                        <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg">
                          <Clock className="w-4 h-4 text-green-600" />
                        </div>
                        <span>{event.time}</span>
                      </motion.div>

                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-3 text-gray-600"
                      >
                        <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-lg">
                          <MapPin className="w-4 h-4 text-orange-600" />
                        </div>
                        <span>{event.location}</span>
                      </motion.div>

                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-3 text-gray-600"
                      >
                        <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-lg">
                          <Users className="w-4 h-4 text-orange-600" />
                        </div>
                        <span>{event.attendees} expected attendees</span>
                      </motion.div>
                    </div>

                    <motion.button
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2 font-semibold text-blue-600 transition-all group-hover:gap-3"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View Calendar Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center md:hidden"
        >
          <Button className="px-8 py-3 text-white rounded-full bg-gradient-to-r from-blue-600 to-orange-600">
            View Full Calendar
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
