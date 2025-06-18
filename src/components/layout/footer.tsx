"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Heart } from "lucide-react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getPublicConfig } from "@/lib/api/services/config";
import TikTok from "../icons/tiktok";
import Facebook from "../icons/facebook";
import Twitter from "../icons/twitter";
import Instagram from "../icons/instagram";
import Linkedin from "../icons/linkdin";
import Youtube from "../icons/youtube";

const footerLinks = {
  quickLinks: [
    { name: "About Us", href: "/about" },
    { name: "News", href: "/news" },
    { name: "Events", href: "/events" },
    { name: "Contact", href: "/contact" },
  ],
  resources: [{ name: "Forms & Documents", href: "/documents" }],
  services: [{ name: "Exam Permits", href: "/services/permits" }],
};

// Social media icon mapping
const socialIcons = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  tiktok: TikTok,
};

const socialColors = {
  facebook: "hover:text-blue-600",
  twitter: "hover:text-blue-400",
  instagram: "hover:text-pink-600",
  linkedin: "hover:text-blue-700",
  youtube: "hover:text-red-600",
};

export default function Footer() {
  const { data: config } = useQuery({
    queryKey: ["public-config"],
    queryFn: getPublicConfig,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  console.log(config);

  // Generate social links from config
  const socialLinks = config?.data?.contactInfo?.socialLinks
    ? Object.entries(config.data?.contactInfo.socialLinks).map(
        ([platform, url]) => {
          const Icon = socialIcons[platform as keyof typeof socialIcons];
          const color = socialColors[platform as keyof typeof socialColors];
          return {
            icon: Icon,
            href: url,
            label: platform.charAt(0).toUpperCase() + platform.slice(1),
            color: color || "hover:text-gray-400",
          };
        }
      )
    : [];

  // Generate contact info from config
  const contactInfo = [];
  if (config?.data?.contactInfo?.email) {
    contactInfo.push({
      icon: Mail,
      text: config.data.contactInfo.email,
      href: `mailto:${config.data.contactInfo.email}`,
    });
  }
  if (config?.data?.contactInfo?.phone) {
    contactInfo.push({
      icon: Phone,
      text: config.data.contactInfo.phone,
      href: `tel:${config.data.contactInfo.phone}`,
    });
  }
  if (config?.data?.contactInfo?.address) {
    contactInfo.push({
      icon: MapPin,
      text: config.data.contactInfo.address,
      href: "#location",
    });
  }

  // Fallback contact info if no config data
  if (contactInfo.length === 0) {
    contactInfo.push(
      {
        icon: Mail,
        text: "src@knutsford.edu.gh",
        href: "mailto:src@knutsford.edu.gh",
      },
      { icon: Phone, text: "+233 XX XXX XXXX", href: "tel:+233XXXXXXXX" },
      {
        icon: MapPin,
        text: "Main Campus, Knutsford University",
        href: "#location",
      }
    );
  }

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-orange-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute bottom-10 right-10 w-48 h-48 bg-white/5 rounded-full"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Image
                    src={"/manifest/android-chrome-512x512.png"}
                    alt={"Knutsford University Logo"}
                    width={50}
                    height={50}
                    className=""
                  />
                  <div>
                    <h3 className="text-2xl font-bold">
                      {"Knutsford University SRC"}
                    </h3>
                    <p className="text-blue-200">
                      Student Representative Council
                    </p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Your voice matters. Together we make a difference. Empowering
                  students, building community, and creating positive change on
                  campus.
                </p>
              </motion.div>

              {/* Contact Info */}
              <div className="space-y-3">
                {contactInfo.map((contact, index) => (
                  <motion.a
                    key={index}
                    href={contact.href}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-3 text-gray-300 hover:text-white transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <contact.icon className="w-4 h-4" />
                    </div>
                    <span className="group-hover:underline">
                      {contact.text}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="text-xl font-semibold mb-6 text-blue-200">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {footerLinks.quickLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="text-xl font-semibold mb-6 text-blue-200">
                Resources
              </h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 className="text-xl font-semibold mb-6 text-blue-200">
                Services
              </h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Social Media & Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="border-t border-white/20 mt-12 pt-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <h4 className="text-lg font-semibold mb-4 text-center md:text-left">
                  Follow Us
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 ${social.color}`}
                      aria-label={social.label}
                    >
                      <social.icon
                        className="w-6 h-6"
                        aria-hidden="true"
                        style={{ color: "red" }}
                      />
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="text-center md:text-right">
                <h4 className="text-lg font-semibold mb-2">Stay Connected</h4>
                <p className="text-gray-300 text-sm">
                  Subscribe to our newsletter for updates
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="border-t border-white/20 py-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-gray-300 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Broke Dbee Inc. All rights
              reserved.
            </p>
            <motion.p
              whileHover={{ scale: 1.05 }}
              className="text-gray-300 text-sm flex items-center gap-2"
            >
              Made with <Heart className="w-4 h-4 text-red-400" /> for students
            </motion.p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
