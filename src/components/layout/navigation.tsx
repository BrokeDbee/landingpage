"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  ChevronDown,
  ChevronRight,
  Users,
  Calendar,
  FileText,
  Phone,
  Home,
  Newspaper,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;
type ItemType = {
  name: string;
  href?: string;
  icon: IconType;
  type?: "single" | "dropdown";
  items?: ItemType[];
};

const navItems: ItemType[] = [
  {
    name: "Home",
    href: "/",
    icon: Home,
    type: "single",
  },
  {
    name: "About",
    icon: Users,
    type: "single",
    href: "/about",
  },
  {
    name: "News",
    href: "/news",
    icon: Newspaper,
    type: "single",
  },
  {
    name: "Events",
    href: "/events",
    icon: Calendar,
    type: "single",
  },
  {
    name: "Services",
    href: "/services",
    icon: FileText,
    type: "dropdown",
    items: [{ name: "permits", href: "/services/permits", icon: BookOpen }],
  },
  {
    name: "Contact",
    icon: Phone,
    href: "/contact",
    type: "single",
  },
];

const DropdownMenu = ({
  item,
  setActiveItem,
  isActive,
}: {
  item: ItemType;
  setActiveItem: (name: ItemType) => void;
  isActive: (name: ItemType) => boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative bg-gradient-to-br from-slate-50 to-blue-50/30"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <motion.button
        whileHover={{ y: -2 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
          isActive(item) || isOpen
            ? "text-blue-600 bg-blue-50"
            : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
        }`}
      >
        {item.name}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
          >
            <div className="py-2">
              {item.items?.map((subItem, index) => {
                const IconComponent = subItem.icon;
                return (
                  <motion.a
                    key={subItem.name}
                    href={subItem.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{
                      x: 4,
                      backgroundColor: "rgba(59, 130, 246, 0.05)",
                    }}
                    onClick={() => {
                      setActiveItem(subItem);
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                  >
                    <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-orange-600 text-white">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="font-medium">{subItem.name}</span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Navigation() {
  const [activeItem, setActiveItem] = useState<ItemType>(navItems[0]);
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(
    null
  );

  const isActive = (item: ItemType) => {
    // if its / skip the check
    if (pathname === "/") {
      return item.name === "Home";
    }

    // Check if the pathname starts with the item's href
    if (
      item.href &&
      (pathname.startsWith(item.href) ||
        (item.name === "Home" && pathname === "/"))
    ) {
      return true;
    }
    // If the item has sub-links, return true if any of them match the current pathname start
    if (item.items) {
      return item.items.some(
        (subItem) =>
          subItem.href &&
          (pathname.startsWith(subItem.href) ||
            (subItem.name === "Home" && pathname === "/") ||
            (activeItem.href && activeItem.href === subItem.href))
      );
    }
    return false;
  };
  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500   from-slate-50 to-blue-50/30`}
    >
      <div className="container px-4 mx-auto border-b border-gray-200 backdrop-blur-md">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <Link
              className="flex items-center justify-center w-12 h-12 rounded-xl"
              href="/"
            >
              <Image
                src="/manifest/android-chrome-512x512.png"
                alt="Knutsford University Logo"
                width={40}
                height={40}
                className=""
              />
            </Link>
            <div className="hidden text-left xl:block">
              <h1 className="font-bold text-lg text-transparent bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text">
                Knutsford University
              </h1>
              <p className="text-sm text-gray-600">
                Student Representative Council
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="items-center hidden space-x-2 lg:flex">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                {item.type === "single" ? (
                  <motion.a
                    href={item.href}
                    whileHover={{ y: -2 }}
                    onClick={() => setActiveItem(item)}
                    className={`relative px-4 py-2 text-sm rounded-lg transition-all duration-300 ${
                      isActive(item)
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    {item.name}
                    {isActive(item) && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-blue-100 rounded-lg -z-10"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                  </motion.a>
                ) : (
                  <DropdownMenu
                    item={item}
                    setActiveItem={setActiveItem}
                    isActive={isActive}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="hidden lg:block"
          >
            <Button className="px-6 py-2 text-white transition-all duration-300 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 hover:shadow-xl hover:scale-105">
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
              <div className="relative p-6 bg-gradient-to-r from-blue-600 to-orange-600 overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative z-10"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 font-bold">KU</span>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">KU SRC</h2>
                      <p className="text-sm text-blue-100">Student Council</p>
                    </div>
                  </div>
                </motion.div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 translate-x-16 -translate-y-16 rounded-full bg-white/10"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 -translate-x-10 translate-y-10 rounded-full bg-orange-400/20"></div>
              </div>

              {/* Navigation Items */}
              <div className="px-6 py-8 overflow-auto max-h-[calc(100vh-200px)]">
                <div className="space-y-3">
                  {navItems.map((item, index) => {
                    const IconComponent = item.icon;

                    if (item.type === "single") {
                      return (
                        <motion.a
                          key={item.name}
                          href={item.href}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}
                          whileHover={{ x: 8, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setActiveItem(item);
                            setIsSheetOpen(false);
                          }}
                          className={`group flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                            isActive(item)
                              ? "bg-gradient-to-r from-blue-500 to-orange-500 text-white shadow-lg"
                              : "bg-white/60 backdrop-blur-sm text-gray-700 hover:bg-white/80 hover:shadow-md"
                          }`}
                        >
                          <div className="flex items-center space-x-4">
                            <div
                              className={`p-2 rounded-lg transition-all duration-300 ${
                                isActive(item)
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
                          <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </motion.a>
                      );
                    } else {
                      return (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="space-y-2"
                        >
                          <motion.button
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              setOpenMobileDropdown(
                                openMobileDropdown === item.name
                                  ? null
                                  : item.name
                              );
                            }}
                            className="group w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 bg-white/60 backdrop-blur-sm text-gray-700 hover:bg-white/80 hover:shadow-md"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-orange-500 text-white group-hover:scale-110 transition-transform">
                                <IconComponent className="w-5 h-5" />
                              </div>
                              <span className="text-lg font-medium">
                                {item.name}
                              </span>
                            </div>
                            <ChevronDown
                              className={`w-5 h-5 transition-transform ${
                                openMobileDropdown === item.name
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          </motion.button>

                          <AnimatePresence>
                            {openMobileDropdown === item.name && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="ml-4 space-y-2 overflow-hidden"
                              >
                                {item.items?.map((subItem, subIndex) => {
                                  const SubIconComponent = subItem.icon;
                                  return (
                                    <motion.a
                                      key={subItem.name}
                                      href={subItem.href}
                                      initial={{ opacity: 0, x: 20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: subIndex * 0.05 }}
                                      whileHover={{ x: 4 }}
                                      onClick={() => {
                                        setActiveItem(subItem);
                                        setIsSheetOpen(false);
                                      }}
                                      className="flex items-center space-x-3 p-3 rounded-lg bg-white/40 backdrop-blur-sm text-gray-600 hover:text-blue-600 hover:bg-white/60 transition-all duration-200"
                                    >
                                      <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-400 to-orange-500 text-white">
                                        <SubIconComponent className="w-4 h-4" />
                                      </div>
                                      <span className="font-medium">
                                        {subItem.name}
                                      </span>
                                    </motion.a>
                                  );
                                })}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    }
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
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
