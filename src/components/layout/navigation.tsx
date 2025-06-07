"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  ChevronRight,
  Users,
  Calendar,
  FileText,
  Phone,
  Home,
  Newspaper,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";

const navItems = [
  { name: "Home", href: "#home", icon: Home },
  { name: "News", href: "#news", icon: Newspaper },
  { name: "Events", href: "#events", icon: Calendar },
  { name: "Executives", href: "#executives", icon: Users },
  { name: "Resources", href: "#resources", icon: FileText },
  { name: "Contact", href: "#contact", icon: Phone },
];

export default function Navigation() {
  const [activeItem, setActiveItem] = useState("Home");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 bg-white/95`}
    >
      <div className="container px-4 mx-auto border-b border-gray-200 backdrop-blur-md">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
              className="flex items-center justify-center w-12 h-12  rounded-xl"
            >
              <Image
                src="/manifest/android-chrome-512x512.png"
                alt="Knutsford University Logo"
                width={40}
                height={40}
                className=""
              />
            </motion.div>
            <div className="hidden text-left xl:block">
              <h1 className="font-bold text-transparent text-md bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text">
                Knutsford University
              </h1>
              <p className="text-xs text-gray-600">
                Student Representative Council
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="items-center hidden space-x-8 lg:flex">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -2 }}
                onClick={() => setActiveItem(item.name)}
                className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeItem === item.name
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                {item.name}
                {activeItem === item.name && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-blue-100 rounded-lg -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="hidden lg:block"
          >
            <Button className="px-6 py-2 text-white transition-all duration-300 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 hover:shadow-xl">
              Get Involved
            </Button>
          </motion.div>

          {/* Mobile Menu */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full p-0 sm:w-80 bg-gradient-to-br from-slate-50 to-blue-50/30"
            >
              {/* Header */}
              <div className="relative p-6 bg-gradient-to-r from-blue-600 to-orange-600">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl">
                      <span className="text-lg font-bold text-white">K</span>
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-white">
                        KU SRC
                      </h2>
                      <p className="text-sm text-blue-100">Student Council</p>
                    </div>
                  </div>
                </motion.div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 translate-x-16 -translate-y-16 rounded-full bg-white/10"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 -translate-x-10 translate-y-10 rounded-full bg-orange-400/20"></div>
              </div>

              {/* Navigation Items */}
              <div className="px-6 py-8 overflow-auto">
                <div className="space-y-2">
                  {navItems.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.1 * index,
                          type: "spring",
                          stiffness: 100,
                        }}
                        whileHover={{ x: 8, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setActiveItem(item.name);
                          setIsSheetOpen(false);
                        }}
                        className={`group flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                          activeItem === item.name
                            ? "bg-gradient-to-r from-blue-500 to-orange-500 text-white shadow-lg"
                            : "bg-white/60 backdrop-blur-sm text-gray-700 hover:bg-white/80 hover:shadow-md"
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`p-2 rounded-lg transition-colors ${
                              activeItem === item.name
                                ? "bg-white/20"
                                : "bg-gradient-to-br from-blue-500 to-orange-500 text-white group-hover:scale-110"
                            }`}
                          >
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <span className="text-lg font-medium">
                            {item.name}
                          </span>
                        </div>
                        <ChevronRight
                          className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${
                            activeItem === item.name
                              ? "text-white/80"
                              : "text-gray-400"
                          }`}
                        />
                      </motion.a>
                    );
                  })}
                </div>

                {/* CTA Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="p-6 mt-8 text-white bg-gradient-to-r from-blue-600 to-orange-600 rounded-2xl"
                >
                  <h3 className="mb-2 text-lg font-semibold">
                    Ready to Make a Difference?
                  </h3>
                  <p className="mb-4 text-sm text-blue-100">
                    Join our community and help shape the future of student life
                    at Knutsford University.
                  </p>
                  <Button
                    className="w-full font-semibold text-blue-600 transition-all duration-300 transform bg-white hover:bg-blue-50 hover:scale-105"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    Get Involved Today
                  </Button>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="grid grid-cols-3 gap-4 mt-6"
                >
                  <div className="p-3 text-center bg-white/60 backdrop-blur-sm rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">500+</div>
                    <div className="text-xs text-gray-600">Students</div>
                  </div>
                  <div className="p-3 text-center bg-white/60 backdrop-blur-sm rounded-xl">
                    <div className="text-2xl font-bold text-orange-600">
                      25+
                    </div>
                    <div className="text-xs text-gray-600">Events</div>
                  </div>
                  <div className="p-3 text-center bg-white/60 backdrop-blur-sm rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">12</div>
                    <div className="text-xs text-gray-600">Executives</div>
                  </div>
                </motion.div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
