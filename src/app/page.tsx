import HeroSection from "@/components/sections/hero-section";
import QuickLinksSection from "@/components/sections/quick-links-section";
import VisionMissionSection from "@/components/sections/vision-mission-section";
import NewsSection from "@/components/sections/news-section";
import EventsSection from "@/components/sections/events-section";
import ExecutivesSection from "@/components/sections/executives-section";
import CallToActionSection from "@/components/sections/call-to-action-section";
import NewsletterSection from "@/components/sections/newsletter-section";
import MemoryGameSection from "@/components/sections/memory-game-section";
import QuickPermitCard from "@/components/sections/quick-permit-card";
import QueryProvider from "@/providers/query-provider";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <div className="container py-12 mx-auto">
        <QuickPermitCard />
      </div>
      <QuickLinksSection />
      <VisionMissionSection />
      <QueryProvider>
        <NewsSection />
      </QueryProvider>
      <QueryProvider>
        <EventsSection />
      </QueryProvider>
      <ExecutivesSection />
      <CallToActionSection />
      <MemoryGameSection />
      <NewsletterSection />
    </div>
  );
}
