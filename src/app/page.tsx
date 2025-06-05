import Image from 'next/image';
import { FaNewspaper, FaCalendarAlt, FaUsers, FaBullhorn, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaHome, FaBook, FaGraduationCap, FaQuestionCircle, FaFileAlt, FaClipboardList, FaComments, FaBars } from 'react-icons/fa';
import TopBar from './components/TopBar';

export default function Home() {
  return (
    <main className="min-h-screen">
      <TopBar />

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-primary">Knutsford University SRC</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#news" className="text-gray-600 hover:text-primary transition duration-300">News</a>
              <a href="#events" className="text-gray-600 hover:text-primary transition duration-300">Events</a>
              <a href="#executives" className="text-gray-600 hover:text-primary transition duration-300">Executives</a>
              <a href="#resources" className="text-gray-600 hover:text-primary transition duration-300">Resources</a>
              <a href="#contact" className="text-gray-600 hover:text-primary transition duration-300">Contact</a>
            </div>
            <button className="md:hidden">
              <FaBars className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </nav>

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
        <div className="container mx-auto px-4 z-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Knutsford University SRC
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Your Voice, Our Priority
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-accent hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition duration-300">
              Latest News
            </button>
            <button className="bg-white hover:bg-gray-100 text-primary font-bold py-3 px-8 rounded-full transition duration-300">
              Upcoming Events
            </button>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold">Latest News</h2>
            <button className="text-primary hover:text-secondary font-semibold flex items-center gap-2">
              View All News <FaNewspaper />
            </button>
          </div>
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
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <span className="text-sm text-gray-500">{news.date}</span>
                <h3 className="text-xl font-bold mt-2 mb-3">{news.title}</h3>
                <p className="text-gray-600 mb-4">{news.excerpt}</p>
                <button className="text-primary font-semibold hover:text-secondary transition duration-300">
                  Read More →
                </button>
              </div>
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
              },
              {
                title: "Academic Excellence Awards",
                date: "April 25, 2024",
                time: "6:00 PM - 9:00 PM",
                location: "Grand Hall"
              },
              {
                title: "Entrepreneurship Workshop",
                date: "May 2, 2024",
                time: "1:00 PM - 5:00 PM",
                location: "Business School"
              },
              {
                title: "Health and Wellness Day",
                date: "May 10, 2024",
                time: "9:00 AM - 3:00 PM",
                location: "Campus Health Center"
              },
              {
                title: "Graduation Ceremony",
                date: "May 15, 2024",
                time: "10:00 AM - 2:00 PM",
                location: "Main Campus"
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
                  description: "Overseeing student welfare and academic affairs"
                },
                {
                  name: "Mike Johnson",
                  position: "SRC Secretary",
                  image: "/placeholder.jpg",
                  description: "Managing SRC communications and documentation"
                }
              ].map((executive, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300">
                  <div className="w-48 h-48 mx-auto mb-4 rounded-full bg-gray-200 relative overflow-hidden">
                    {/* Add actual images later */}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{executive.name}</h3>
                  <p className="text-primary font-semibold mb-3">{executive.position}</p>
                  <p className="text-gray-600 mb-4">{executive.description}</p>
                  <div className="flex justify-center gap-4">
                    <a href="#" className="text-gray-400 hover:text-primary transition duration-300">
                      <FaFacebook size={20} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-primary transition duration-300">
                      <FaTwitter size={20} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-primary transition duration-300">
                      <FaInstagram size={20} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Deputy Secretary and PRO Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Secretariat and Public Relations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  name: "Mike Johnson",
                  position: "SRC Secretary",
                  image: "/placeholder.jpg",
                  description: "Managing SRC communications and documentation"
                },
                {
                  name: "Sarah Wilson",
                  position: "Deputy Secretary",
                  image: "/placeholder.jpg",
                  description: "Assisting in administrative duties and record keeping"
                },
                {
                  name: "David Brown",
                  position: "SRC PRO",
                  image: "/placeholder.jpg",
                  description: "Managing public relations and media communications"
                },
                {
                  name: "Emma Davis",
                  position: "Deputy PRO",
                  image: "/placeholder.jpg",
                  description: "Supporting public relations and student communications"
                }
              ].map((executive, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300">
                  <div className="w-48 h-48 mx-auto mb-4 rounded-full bg-gray-200 relative overflow-hidden">
                    {/* Add actual images later */}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{executive.name}</h3>
                  <p className="text-primary font-semibold mb-3">{executive.position}</p>
                  <p className="text-gray-600 mb-4">{executive.description}</p>
                  <div className="flex justify-center gap-4">
                    <a href="#" className="text-gray-400 hover:text-primary transition duration-300">
                      <FaFacebook size={20} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-primary transition duration-300">
                      <FaTwitter size={20} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-primary transition duration-300">
                      <FaInstagram size={20} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Organizer and WOCOM Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Organizing and Women's Affairs</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "James Wilson",
                  position: "SRC Organizer",
                  image: "/placeholder.jpg",
                  description: "Coordinating student events and activities"
                },
                {
                  name: "Lisa Anderson",
                  position: "Deputy Organizer",
                  image: "/placeholder.jpg",
                  description: "Supporting event planning and execution"
                },
                {
                  name: "Maria Garcia",
                  position: "Women's Commissioner (WOCOM)",
                  image: "/placeholder.jpg",
                  description: "Advocating for women's rights and welfare"
                }
              ].map((executive, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300">
                  <div className="w-48 h-48 mx-auto mb-4 rounded-full bg-gray-200 relative overflow-hidden">
                    {/* Add actual images later */}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{executive.name}</h3>
                  <p className="text-primary font-semibold mb-3">{executive.position}</p>
                  <p className="text-gray-600 mb-4">{executive.description}</p>
                  <div className="flex justify-center gap-4">
                    <a href="#" className="text-gray-400 hover:text-primary transition duration-300">
                      <FaFacebook size={20} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-primary transition duration-300">
                      <FaTwitter size={20} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-primary transition duration-300">
                      <FaInstagram size={20} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hall Presidents Section */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center">Hall Presidents</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Robert Taylor",
                  position: "White Hall President",
                  image: "/placeholder.jpg",
                  description: "Managing White Hall affairs and student welfare"
                },
                {
                  name: "Patricia Moore",
                  position: "Knutsford Hall President",
                  image: "/placeholder.jpg",
                  description: "Overseeing Knutsford Hall operations and activities"
                },
                {
                  name: "Kwame Mensah",
                  position: "Asantewaa Hall President",
                  image: "/placeholder.jpg",
                  description: "Leading Asantewaa Hall initiatives and student support"
                }
              ].map((executive, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300">
                  <div className="w-48 h-48 mx-auto mb-4 rounded-full bg-gray-200 relative overflow-hidden">
                    {/* Add actual images later */}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{executive.name}</h3>
                  <p className="text-primary font-semibold mb-3">{executive.position}</p>
                  <p className="text-gray-600 mb-4">{executive.description}</p>
                  <div className="flex justify-center gap-4">
                    <a href="#" className="text-gray-400 hover:text-primary transition duration-300">
                      <FaFacebook size={20} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-primary transition duration-300">
                      <FaTwitter size={20} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-primary transition duration-300">
                      <FaInstagram size={20} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Student Resources Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Student Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Academic Support",
                description: "Access study materials, past papers, and academic guidelines",
                icon: <FaGraduationCap className="w-12 h-12 text-primary" />
              },
              {
                title: "Student Services",
                description: "Information about counseling, health services, and career guidance",
                icon: <FaUsers className="w-12 h-12 text-primary" />
              },
              {
                title: "Campus Life",
                description: "Details about clubs, sports, and extracurricular activities",
                icon: <FaBullhorn className="w-12 h-12 text-primary" />
              }
            ].map((resource, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <div className="mb-4">{resource.icon}</div>
                <h3 className="text-xl font-bold mb-3">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <button className="text-primary font-semibold hover:text-secondary transition duration-300">
                  Learn More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feedback Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Share Your Feedback</h2>
          <div className="max-w-2xl mx-auto">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Your email"
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  id="category"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">Select a category</option>
                  <option value="academic">Academic</option>
                  <option value="welfare">Student Welfare</option>
                  <option value="events">Events</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Your message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-lg transition duration-300"
              >
                Submit Feedback
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl mb-8">Subscribe to our newsletter to receive important updates, upcoming events, and latest news directly in your inbox.</p>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Student ID"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <select
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <option value="">Select Your Program</option>
                  <option value="undergraduate">Undergraduate</option>
                  <option value="graduate">Graduate</option>
                  <option value="phd">PhD</option>
                </select>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm">
                <input
                  type="checkbox"
                  id="consent"
                  className="rounded border-white/20 bg-white/10"
                />
                <label htmlFor="consent">
                  I agree to receive newsletters and updates from Knutsford University SRC
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-white text-primary hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition duration-300"
              >
                Subscribe Now
              </button>
            </form>
            <p className="text-sm mt-4 text-white/70">
              By subscribing, you'll receive updates about:
              <ul className="list-disc list-inside mt-2">
                <li>Important announcements and news</li>
                <li>Upcoming events and activities</li>
                <li>Student welfare initiatives</li>
                <li>Academic updates and opportunities</li>
              </ul>
            </p>
          </div>
        </div>
      </section>

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