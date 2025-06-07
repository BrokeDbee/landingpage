"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Linkedin } from "lucide-react";
import Image from "next/image";

const mainExecutives = [
  {
    name: "John Doe",
    position: "SRC President",
    image: "https://avatar.iran.liara.run/public/boy",
    description:
      "Leading student initiatives and representing student interests with passion and dedication.",
    email: "president@src.knutsford.edu",
    phone: "+233 XX XXX XXXX",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Jane Smith",
    position: "SRC Vice President",
    image: "https://avatar.iran.liara.run/public/girl",
    description:
      "Supporting the president and overseeing student affairs to ensure smooth operations.",
    email: "vicepresident@src.knutsford.edu",
    phone: "+233 XX XXX XXXX",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Mike Johnson",
    position: "SRC Secretary",
    image: "https://avatar.iran.liara.run/public/boy",
    description:
      "Managing SRC communications and documentation with meticulous attention to detail.",
    email: "secretary@src.knutsford.edu",
    phone: "+233 XX XXX XXXX",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
];

const otherExecutives = [
  {
    name: "Sarah Wilson",
    position: "Deputy Secretary",
    image: "https://avatar.iran.liara.run/public/girl",
    description:
      "Assisting the Secretary in managing SRC communications and documentation",
  },
  {
    name: "Emily Davis",
    position: "Women's Commissioner (WOCOM)",
    image: "https://avatar.iran.liara.run/public/girl",
    description:
      "Advocating for women's rights and organizing women-focused initiatives",
  },
  {
    name: "David Brown",
    position: "Public Relations Officer (PRO)",
    image: "https://avatar.iran.liara.run/public/boy",
    description: "Managing SRC's public image and external communications",
  },
  {
    name: "Lisa Anderson",
    position: "Deputy PRO",
    image: "https://avatar.iran.liara.run/public/girl",
    description: "Supporting the PRO in media relations and event publicity",
  },
  {
    name: "James Miller",
    position: "Organizer",
    image: "https://avatar.iran.liara.run/public/boy",
    description: "Planning and coordinating SRC events and activities",
  },
  {
    name: "Robert Taylor",
    position: "Deputy Organizer",
    image: "https://avatar.iran.liara.run/public/boy",
    description:
      "Assisting in event planning and student engagement activities",
  },
];

const hallPresidents = [
  {
    name: "Maria Garcia",
    position: "White Hall President",
    image: "https://avatar.iran.liara.run/public/girl",
    hall: "White Hall",
  },
  {
    name: "Peter Chen",
    position: "Knutsford Hall President",
    image: "https://avatar.iran.liara.run/public/boy",
    hall: "Knutsford Hall",
  },
  {
    name: "Aisha Osei",
    position: "Asantewaa Hall President",
    image: "https://avatar.iran.liara.run/public/girl",
    hall: "Asantewaa Hall",
  },
];

export default function ExecutivesSection() {
  return (
    <section
      className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50"
      id="executives"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div
          className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\" fill=\"%23000000\" fillOpacity=\"0.1\" fillRule=\"evenodd\"/>%3C/svg%3E')]`}
        />
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-transparent md:text-5xl bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text">
            Meet Your SRC Executives
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            Dedicated leaders working tirelessly to represent your interests and
            improve student life
          </p>
        </motion.div>

        {/* Main Executive Committee */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-3xl font-bold text-center text-gray-800"
          >
            Main Executive Committee
          </motion.h3>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {mainExecutives.map((executive, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.02, y: -10 }}
                className="group"
              >
                <div className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-lg rounded-3xl hover:shadow-2xl h-full">
                  <div className="relative overflow-hidden">
                    <Image
                      src={executive.image || "/placeholder.svg"}
                      alt={executive.name}
                      width={600}
                      height={400}
                      className="object-cover w-full transition-transform duration-500 h-80 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/50 to-transparent group-hover:opacity-100" />

                    {/* Social links overlay */}
                    <div className="absolute flex justify-center gap-3 transition-opacity duration-300 opacity-0 bottom-4 left-4 right-4 group-hover:opacity-100">
                      <motion.a
                        whileHover={{ scale: 1.2 }}
                        href={`mailto:${executive.email}`}
                        className="flex items-center justify-center w-10 h-10 transition-colors rounded-full bg-white/90 hover:bg-white"
                      >
                        <Mail className="w-5 h-5 text-gray-700" />
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.2 }}
                        href={`tel:${executive.phone}`}
                        className="flex items-center justify-center w-10 h-10 transition-colors rounded-full bg-white/90 hover:bg-white"
                      >
                        <Phone className="w-5 h-5 text-gray-700" />
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.2 }}
                        href={executive.social.linkedin}
                        className="flex items-center justify-center w-10 h-10 transition-colors rounded-full bg-white/90 hover:bg-white"
                      >
                        <Linkedin className="w-5 h-5 text-gray-700" />
                      </motion.a>
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="mb-2 text-2xl font-bold text-gray-800 transition-colors group-hover:text-blue-600">
                      {executive.name}
                    </h3>
                    <p className="mb-4 text-lg font-semibold text-blue-600">
                      {executive.position}
                    </p>
                    <p className="leading-relaxed text-gray-600">
                      {executive.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Other Executive Positions */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-3xl font-bold text-center text-gray-800"
          >
            Other Executive Positions
          </motion.h3>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {otherExecutives.map((executive, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group"
              >
                <div className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-lg rounded-2xl hover:shadow-xl h-full">
                  <div className="relative overflow-hidden">
                    <Image
                      src={executive.image || "/placeholder.svg"}
                      alt={executive.name}
                      width={600}
                      height={400}
                      className="object-cover w-full h-64 transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/30 to-transparent group-hover:opacity-100" />
                  </div>

                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-bold text-gray-800 transition-colors group-hover:text-blue-600">
                      {executive.name}
                    </h3>
                    <p className="mb-3 font-semibold text-blue-600">
                      {executive.position}
                    </p>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {executive.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hall Presidents */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-3xl font-bold text-center text-gray-800"
          >
            Hall Presidents
          </motion.h3>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {hallPresidents.map((president, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.02, y: -10 }}
                className="group"
              >
                <div className="relative overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-lg rounded-2xl hover:shadow-xl h-full">
                  <div className="absolute z-10 top-4 left-4">
                    <span className="px-3 py-1 text-sm font-medium text-white rounded-full bg-gradient-to-r from-blue-600 to-orange-600">
                      {president.hall}
                    </span>
                  </div>

                  <div className="relative overflow-hidden">
                    <Image
                      src={president.image || "/placeholder.svg"}
                      alt={president.name}
                      width={600}
                      height={400}
                      className="object-cover w-full h-64 transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/30 to-transparent group-hover:opacity-100" />
                  </div>

                  <div className="p-6 text-center">
                    <h3 className="mb-2 text-xl font-bold text-gray-800 transition-colors group-hover:text-blue-600">
                      {president.name}
                    </h3>
                    <p className="font-semibold text-blue-600">
                      {president.position}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
