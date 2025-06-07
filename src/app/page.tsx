"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/layout/navigation";
import HeroSection from "@/components/sections/hero-section";
import QuickLinksSection from "@/components/sections/quick-links-section";
import VisionMissionSection from "@/components/sections/vision-mission-section";
import NewsSection from "@/components/sections/news-section";
import EventsSection from "@/components/sections/events-section";
import ExecutivesSection from "@/components/sections/executives-section";
import CallToActionSection from "@/components/sections/call-to-action-section";
import NewsletterSection from "@/components/sections/newsletter-section";
import MemoryGameSection from "@/components/sections/memory-game-section";
import PermitRequestSection from "@/components/sections/permit-request-section";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
    >
      <Navigation />
      <HeroSection />
      <QuickLinksSection />
      <VisionMissionSection />
      <NewsSection />
      <EventsSection />
      <ExecutivesSection />
      <CallToActionSection />
      <NewsletterSection />
      <MemoryGameSection />
      <PermitRequestSection />
      <Footer />
    </motion.main>
  );
}
