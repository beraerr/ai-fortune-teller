import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ServicesSection from "@/components/ServicesSection";
import WorkshopSection from "@/components/WorkshopSection";
import QuoteSection from "@/components/QuoteSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-0">
        <HeroSection />
        <TestimonialsSection />
        <ServicesSection />
        <WorkshopSection />
        <QuoteSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
