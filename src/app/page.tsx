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

export default function Home() {
  return (
    <div>
      <HeroSection />
      <QuickLinksSection />
      <VisionMissionSection />
      <NewsSection />
      <EventsSection />
      <ExecutivesSection />
      <CallToActionSection />
      <MemoryGameSection />
      <NewsletterSection />
      <PermitRequestSection />
    </div>
  );
}
