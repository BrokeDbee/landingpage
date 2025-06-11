"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
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
import { cn } from "@/lib/utils";

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

interface NavItem {
  name: string;
  href?: string;
  icon: IconType;
  type: "single" | "dropdown";
  items?: NavItem[];
}

const navItems: NavItem[] = [
  {
    name: "Home",
    href: "/",
    icon: Home,
    type: "single",
  },
  {
    name: "About",
    href: "/about",
    icon: Users,
    type: "single",
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
    items: [
      {
        name: "Permits",
        href: "/services/permits",
        icon: BookOpen,
        type: "single",
      },
    ],
  },
  {
    name: "Contact",
    href: "/contact",
    icon: Phone,
    type: "single",
  },
];

interface DesktopDropdownProps {
  item: NavItem;
  isActive: boolean;
}

const DesktopDropdown = ({ item, isActive }: DesktopDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isSubItemActive = (subItem: NavItem) => {
    if (!subItem.href) return false;
    if (pathname === "/" && subItem.href === "/") return true;
    return pathname.startsWith(subItem.href) && subItem.href !== "/";
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <motion.button
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300",
          isActive
            ? "text-blue-600 bg-blue-50/80 shadow-sm"
            : "text-gray-700 hover:text-blue-600 hover:bg-blue-50/50"
        )}
      >
        {item.name}
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            isOpen ? "rotate-180" : ""
          )}
        />
        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute inset-0 bg-gradient-to-r from-blue-100 to-orange-100 rounded-xl -z-10"
            transition={{
              type: "spring",
              bounce: 0.2,
              duration: 0.6,
            }}
          />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100/50 overflow-hidden z-50"
          >
            <div className="p-2">
              {item.items?.map((subItem, index) => {
                const IconComponent = subItem.icon;
                const isSubActive = isSubItemActive(subItem);

                return (
                  <motion.div
                    key={subItem.name}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={subItem.href || "#"}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group",
                        isSubActive
                          ? "bg-gradient-to-r from-blue-500 to-orange-500 text-white shadow-md"
                          : "text-gray-700 hover:text-blue-600 hover:bg-blue-50/80"
                      )}
                    >
                      <div
                        className={cn(
                          "p-2 rounded-lg transition-all duration-200",
                          isSubActive
                            ? "bg-white/20"
                            : "bg-gradient-to-br from-blue-500 to-orange-500 text-white group-hover:scale-110"
                        )}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <span className="font-medium">{subItem.name}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface MobileNavItemProps {
  item: NavItem;
  index: number;
  isActive: boolean;
  onItemClick: () => void;
}

const MobileNavItem = ({
  item,
  index,
  isActive,
  onItemClick,
}: MobileNavItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const IconComponent = item.icon;

  const isSubItemActive = (subItem: NavItem) => {
    if (!subItem.href) return false;
    if (pathname === "/" && subItem.href === "/") return true;
    return pathname.startsWith(subItem.href) && subItem.href !== "/";
  };

  if (item.type === "single") {
    return (
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 * index, type: "spring", stiffness: 100 }}
      >
        <Link
          href={item.href || "#"}
          onClick={onItemClick}
          className={cn(
            "group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300",
            isActive
              ? "bg-gradient-to-r from-blue-500 to-orange-500 text-white shadow-lg scale-[1.02]"
              : "bg-white/70 backdrop-blur-sm text-gray-700 hover:bg-white/90 hover:shadow-md active:scale-[0.98]"
          )}
        >
          <div
            className={cn(
              "p-3 rounded-xl transition-all duration-300",
              isActive
                ? "bg-white/20 shadow-inner"
                : "bg-gradient-to-br from-blue-500 to-orange-500 text-white group-hover:scale-110 group-active:scale-95"
            )}
          >
            <IconComponent className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <span className="text-lg font-semibold">{item.name}</span>
          </div>
          <ChevronRight
            className={cn(
              "w-5 h-5 transition-all duration-300",
              isActive
                ? "text-white/80"
                : "text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1"
            )}
          />
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 * index, type: "spring", stiffness: 100 }}
      className="space-y-3"
    >
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "group w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300",
          isActive
            ? "bg-gradient-to-r from-blue-500 to-orange-500 text-white shadow-lg"
            : "bg-white/70 backdrop-blur-sm text-gray-700 hover:bg-white/90 hover:shadow-md"
        )}
      >
        <div
          className={cn(
            "p-3 rounded-xl transition-all duration-300",
            isActive
              ? "bg-white/20 shadow-inner"
              : "bg-gradient-to-br from-blue-500 to-orange-500 text-white group-hover:scale-110"
          )}
        >
          <IconComponent className="w-5 h-5" />
        </div>
        <div className="flex-1 text-left">
          <span className="text-lg font-semibold">{item.name}</span>
        </div>
        <ChevronDown
          className={cn(
            "w-5 h-5 transition-all duration-300",
            isOpen ? "rotate-180" : "",
            isActive
              ? "text-white/80"
              : "text-gray-400 group-hover:text-blue-500"
          )}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="ml-6 space-y-2 overflow-hidden"
          >
            {item.items?.map((subItem, subIndex) => {
              const SubIconComponent = subItem.icon;
              const isSubActive = isSubItemActive(subItem);

              return (
                <motion.div
                  key={subItem.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: subIndex * 0.05 }}
                >
                  <Link
                    href={subItem.href || "#"}
                    onClick={onItemClick}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group",
                      isSubActive
                        ? "bg-gradient-to-r from-blue-400 to-orange-400 text-white shadow-md"
                        : "bg-white/50 backdrop-blur-sm text-gray-600 hover:text-blue-600 hover:bg-white/80"
                    )}
                  >
                    <div
                      className={cn(
                        "p-2 rounded-lg transition-all duration-200",
                        isSubActive
                          ? "bg-white/20"
                          : "bg-gradient-to-br from-blue-400 to-orange-400 text-white group-hover:scale-110"
                      )}
                    >
                      <SubIconComponent className="w-4 h-4" />
                    </div>
                    <span className="font-medium">{subItem.name}</span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (item: NavItem): boolean => {
    // Handle home page specifically
    if (pathname === "/") {
      return item.name === "Home";
    }

    // For single items, check direct path match
    if (item.type === "single" && item.href) {
      return pathname.startsWith(item.href) && item.href !== "/";
    }

    // For dropdown items, check if any sub-item is active
    if (item.type === "dropdown" && item.items) {
      return item.items.some((subItem) => {
        if (!subItem.href) return false;
        return pathname.startsWith(subItem.href) && subItem.href !== "/";
      });
    }

    return false;
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-500",
        isScrolled
          ? " bg-gradient-to-br from-slate-50 to-blue-50/30 backdrop-blur-md"
          : "bg-white/80 backdrop-blur-md"
      )}
    >
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-3"
          >
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-orange-500 rounded-xl blur opacity-20"></div>
                <div className="relative flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-lg">
                  <Image
                    src="/manifest/android-chrome-512x512.png"
                    alt="Knutsford University Logo"
                    width={32}
                    height={32}
                    className="rounded-lg"
                  />
                </div>
              </div>
              <div className="hidden text-left xl:block">
                <h1 className="font-bold text-lg bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
                  Knutsford University
                </h1>
                <p className="text-sm text-gray-600 font-medium">
                  Student Representative Council
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="items-center hidden space-x-1 lg:flex">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 * index,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                {item.type === "single" ? (
                  <Link href={item.href || "#"}>
                    <motion.div
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "relative px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300",
                        isActive(item)
                          ? "text-blue-600 bg-blue-50/80 shadow-sm"
                          : "text-gray-700 hover:text-blue-600 hover:bg-blue-50/50"
                      )}
                    >
                      {item.name}
                      {isActive(item) && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute inset-0 bg-gradient-to-r from-blue-100 to-orange-100 rounded-xl -z-10"
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}
                    </motion.div>
                  </Link>
                ) : (
                  <DesktopDropdown item={item} isActive={isActive(item)} />
                )}
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden relative p-2 rounded-xl hover:bg-blue-50/50 transition-colors"
              >
                <motion.div
                  animate={isSheetOpen ? "open" : "closed"}
                  className="w-6 h-6 flex flex-col justify-center items-center"
                >
                  <motion.span
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: 45, y: 6 },
                    }}
                    className="w-6 h-0.5 bg-gray-700 block absolute transition-all"
                  />
                  <motion.span
                    variants={{
                      closed: { opacity: 1 },
                      open: { opacity: 0 },
                    }}
                    className="w-6 h-0.5 bg-gray-700 block absolute transition-all"
                  />
                  <motion.span
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: -45, y: -6 },
                    }}
                    className="w-6 h-0.5 bg-gray-700 block absolute transition-all"
                  />
                </motion.div>
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-full p-0 sm:w-96 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 border-l border-gray-100/50"
            >
              {/* Mobile Header */}
              <div className="relative p-6 bg-gradient-to-br from-blue-600 via-blue-500 to-orange-500 overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="relative z-10"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-white/20 rounded-2xl blur"></div>
                      <div className="relative flex items-center justify-center w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl">
                        <Image
                          src="/manifest/android-chrome-512x512.png"
                          alt="KU Logo"
                          width={32}
                          height={32}
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">KU SRC</h2>
                      <p className="text-sm text-blue-100 font-medium">
                        Student Representative Council
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 translate-x-16 -translate-y-16 rounded-full bg-white/10"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 -translate-x-12 translate-y-12 rounded-full bg-orange-300/20"></div>
                <div className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-white/5"></div>
              </div>

              {/* Mobile Navigation Items */}
              <div className="px-6 py-8 overflow-auto max-h-[calc(100vh-200px)]">
                <div className="space-y-4">
                  {navItems.map((item, index) => (
                    <MobileNavItem
                      key={item.name}
                      item={item}
                      index={index}
                      isActive={isActive(item)}
                      onItemClick={() => setIsSheetOpen(false)}
                    />
                  ))}
                </div>

                {/* Mobile Footer */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-12 pt-8 border-t border-gray-200/50"
                >
                  <div className="text-center">
                    <p className="text-sm text-gray-500 font-medium">
                      © 2024 Knutsford University SRC
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Empowering Student Voices
                    </p>
                  </div>
                </motion.div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}
