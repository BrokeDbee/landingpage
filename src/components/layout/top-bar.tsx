"use client";

import { motion } from "framer-motion";
import { Phone, Mail, Facebook, Twitter, Instagram } from "lucide-react";

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
];

const contactInfo = [
  { icon: Phone, text: "+233 12 345 6789", href: "tel:+233123456789" },
  {
    icon: Mail,
    text: "src@knutsford.edu.gh",
    href: "mailto:src@knutsford.edu.gh",
  },
];

export default function TopBar() {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative py-3 overflow-hidden text-white bg-gradient-to-r from-blue-600 to-orange-600"
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fillRule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fillOpacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center mb-2 space-x-6 md:mb-0"
          >
            {contactInfo.map((contact, index) => (
              <motion.a
                key={index}
                href={contact.href}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 transition-all duration-300 hover:text-yellow-300 group"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <contact.icon className="w-4 h-4" />
                </motion.div>
                <span className="text-sm group-hover:underline">
                  {contact.text}
                </span>
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center space-x-4"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center w-8 h-8 transition-all duration-300 rounded-full bg-white/20 hover:bg-white/30"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
