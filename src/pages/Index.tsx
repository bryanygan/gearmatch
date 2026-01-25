import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import CategoryCards from "@/components/landing/CategoryCards";
import TrustSection from "@/components/landing/TrustSection";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

type IndexProps = {
  skipAnimations?: boolean;
};

const Index = ({ skipAnimations = false }: IndexProps) => {
  return (
    <div
      className="min-h-screen bg-background"
      data-landing-animations={skipAnimations ? "off" : "on"}
    >
      <Navbar />
      <Hero />
      <HowItWorks />
      <CategoryCards />
      <TrustSection />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
