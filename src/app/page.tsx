'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaNewspaper, FaCalendarAlt, FaUsers, FaBullhorn, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaHome, FaBook, FaGraduationCap, FaQuestionCircle, FaFileAlt, FaClipboardList, FaComments, FaBars, FaLightbulb, FaHandshake, FaChartLine } from 'react-icons/fa';
import TopBar from './components/TopBar';
import Navigation from './components/Navigation';
import NewsletterForm from './components/NewsletterForm';
import MemoryGame from './components/MemoryGame';

// Placeholder Image Component
const PlaceholderImage = ({ title }: { title: string }) => (
  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
    <span className="text-primary font-semibold text-center px-4">{title}</span>
  </div>
);

export default function Home() {
  return (
    <main className="min-h-screen">
      <TopBar />
      <Navigation />

      {/* Quick Links Section */}
      <section className="pt-24 pb-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <FaBook className="w-6 h-6" />, text: "Academic Calendar" },
              { icon: <FaFileAlt className="w-6 h-6" />, text: "Forms & Documents" },
              { icon: <FaClipboardList className="w-6 h-6" />, text: "Student Handbook" },
              { icon: <FaComments className="w-6 h-6" />, text: "Student Forum" }
            ].map((link, index) => (
              <a key={index} href="#" className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex items-center justify-center gap-2 text-gray-700 hover:text-primary">
                {link.icon}
                <span>{link.text}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-primary to-secondary text-white">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 z-20 text-center"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Knutsford University SRC
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8"
          >
            Your Voice, Our Priority
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex gap-4 justify-center"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-accent hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition duration-300"
            >
              Latest News
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white hover:bg-gray-100 text-primary font-bold py-3 px-8 rounded-full transition duration-300"
            >
              Upcoming Events
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Vision and Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            {/* Vision */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-primary/10 to-secondary/10 p-8 rounded-2xl"
            >
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold mb-6 text-primary"
              >
                Our Vision
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-700 text-lg leading-relaxed"
              >
                To be the leading voice of student welfare and development, fostering an inclusive and dynamic campus environment where every student can thrive academically, socially, and personally.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6 flex items-center gap-4"
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center"
                >
                  <FaLightbulb className="text-primary text-xl" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-gray-800">Empowering Students</h3>
                  <p className="text-gray-600">Creating opportunities for growth and leadership</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Mission */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-secondary/10 to-primary/10 p-8 rounded-2xl"
            >
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold mb-6 text-secondary"
              >
                Our Mission
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-700 text-lg leading-relaxed"
              >
                To represent and advocate for student interests, promote academic excellence, and enhance the overall student experience through effective leadership, transparent communication, and meaningful engagement.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6 flex items-center gap-4"
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center"
                >
                  <FaHandshake className="text-secondary text-xl" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-gray-800">Building Community</h3>
                  <p className="text-gray-600">Fostering unity and collaboration among students</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Core Values */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <FaUsers className="text-primary text-2xl" />,
                title: "Inclusivity",
                description: "Embracing diversity and ensuring equal opportunities for all students"
              },
              {
                icon: <FaChartLine className="text-secondary text-2xl" />,
                title: "Excellence",
                description: "Striving for the highest standards in all our endeavors"
              },
              {
                icon: <FaHandshake className="text-accent text-2xl" />,
                title: "Integrity",
                description: "Maintaining transparency and ethical conduct in all operations"
              }
            ].map((value, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4"
                >
                  {value.icon}
                </motion.div>
                <motion.h3 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl font-bold mb-3"
                >
                  {value.title}
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-600"
                >
                  {value.description}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-12"
          >
            <h2 className="text-4xl font-bold">Latest News</h2>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-primary hover:text-secondary font-semibold flex items-center gap-2"
            >
              View All News <FaNewspaper />
            </motion.button>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "New Student Welfare Initiatives",
                date: "March 15, 2024",
                excerpt: "Introducing new mental health support programs and student counseling services..."
              },
              {
                title: "Campus Infrastructure Updates",
                date: "March 12, 2024",
                excerpt: "Major renovations planned for the library and student center..."
              },
              {
                title: "Academic Policy Changes",
                date: "March 10, 2024",
                excerpt: "Important updates to examination policies and grading systems..."
              }
            ].map((news, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
              >
                <motion.span 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-sm text-gray-500"
                >
                  {news.date}
                </motion.span>
                <motion.h3 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl font-bold mt-2 mb-3"
                >
                  {news.title}
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-600 mb-4"
                >
                  {news.excerpt}
                </motion.p>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-primary font-semibold hover:text-secondary transition duration-300"
                >
                  Read More →
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold">Upcoming Events</h2>
            <button className="text-primary hover:text-secondary font-semibold flex items-center gap-2">
              View All Events <FaCalendarAlt />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Student Leadership Summit",
                date: "March 25, 2024",
                time: "10:00 AM - 4:00 PM",
                location: "Main Auditorium"
              },
              {
                title: "Cultural Festival",
                date: "April 5, 2024",
                time: "2:00 PM - 8:00 PM",
                location: "University Grounds"
              },
              {
                title: "Career Fair",
                date: "April 15, 2024",
                time: "9:00 AM - 5:00 PM",
                location: "Student Center"
              },
              {
                title: "Sports Tournament",
                date: "April 20, 2024",
                time: "All Day",
                location: "Sports Complex"
              }
            ].map((event, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-primary hover:shadow-xl transition duration-300">
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <div className="space-y-2 text-gray-600">
                  <p className="flex items-center gap-2">
                    <FaCalendarAlt className="text-primary" />
                    {event.date}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaBullhorn className="text-primary" />
                    {event.time}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaUsers className="text-primary" />
                    {event.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Get Involved Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join us in making a difference. Whether you want to participate in events, join committees, or share your ideas, there's a place for you in the SRC.
          </p>
          <div className="flex justify-center">
            <button className="bg-accent hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition duration-300">
              Share Your Ideas
            </button>
          </div>
        </div>
      </section>

      {/* SRC Executives Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Meet Your SRC Executives</h2>
          
          {/* Main Executive Positions */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Main Executive Committee</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "John Doe",
                  position: "SRC President",
                  image: "/placeholder.jpg",
                  description: "Leading student initiatives and representing student interests"
                },
                {
                  name: "Jane Smith",
                  position: "SRC Vice President",
                  image: "/placeholder.jpg",
                  description: "Supporting the president and overseeing student affairs"
                },
                {
                  name: "Mike Johnson",
                  position: "SRC Secretary",
                  image: "/placeholder.jpg",
                  description: "Managing SRC communications and documentation"
                }
              ].map((executive, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300">
                  <div className="w-64 h-64 mx-auto mb-4 rounded-full bg-gray-200 relative overflow-hidden">
                    {/* Add actual images later */}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{executive.name}</h3>
                  <p className="text-primary font-semibold mb-3">{executive.position}</p>
                  <p className="text-gray-600">{executive.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Other Executive Positions */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center">Other Executive Positions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Wilson",
                  position: "Deputy Secretary",
                  image: "/placeholder.jpg",
                  description: "Assisting the Secretary in managing SRC communications and documentation"
                },
                {
                  name: "Emily Davis",
                  position: "Women's Commissioner (WOCOM)",
                  image: "/placeholder.jpg",
                  description: "Advocating for women's rights and organizing women-focused initiatives"
                },
                {
                  name: "David Brown",
                  position: "Public Relations Officer (PRO)",
                  image: "/placeholder.jpg",
                  description: "Managing SRC's public image and external communications"
                },
                {
                  name: "Lisa Anderson",
                  position: "Deputy PRO",
                  image: "/placeholder.jpg",
                  description: "Supporting the PRO in media relations and event publicity"
                },
                {
                  name: "James Miller",
                  position: "Organizer",
                  image: "/placeholder.jpg",
                  description: "Planning and coordinating SRC events and activities"
                },
                {
                  name: "Robert Taylor",
                  position: "Deputy Organizer",
                  image: "/placeholder.jpg",
                  description: "Assisting in event planning and student engagement activities"
                },
                {
                  name: "Thomas White",
                  position: "IT Consultant",
                  image: "/placeholder.jpg",
                  description: "Managing SRC's digital presence and technical infrastructure"
                }
              ].map((executive, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300">
                  <div className="w-56 h-56 mx-auto mb-4 rounded-full bg-gray-200 relative overflow-hidden">
                    {/* Add actual images later */}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{executive.name}</h3>
                  <p className="text-primary font-semibold mb-3">{executive.position}</p>
                  <p className="text-gray-600">{executive.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hall Presidents */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Hall Presidents</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Maria Garcia",
                  position: "White Hall President",
                  image: "/placeholder.jpg"
                },
                {
                  name: "Peter Chen",
                  position: "Knutsford Hall President",
                  image: "/placeholder.jpg"
                },
                {
                  name: "Aisha Osei",
                  position: "Asantewaa Hall President",
                  image: "/placeholder.jpg"
                }
              ].map((president, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300">
                  <div className="w-56 h-56 mx-auto mb-4 rounded-full bg-gray-200 relative overflow-hidden">
                    {/* Add actual images later */}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{president.name}</h3>
                  <p className="text-primary font-semibold">{president.position}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Form */}
      <NewsletterForm />

      {/* Memory Game Section */}
      <MemoryGame />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Knutsford University SRC</h3>
              <p className="text-gray-400">Your voice matters. Together we make a difference.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">News</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Events</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: src@knutsford.edu</li>
                <li>Phone: +233 XX XXX XXXX</li>
                <li>Location: Main Campus</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  <FaFacebook size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  <FaTwitter size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  <FaInstagram size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Broke Dbee Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
} 