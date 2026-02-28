import "@/styles/v2.css";
import NavbarV2 from "@/components/landing-v2/NavbarV2";
import HeroV2 from "@/components/landing-v2/HeroV2";
import HowItWorksV2 from "@/components/landing-v2/HowItWorksV2";
import CategoryCardsV2 from "@/components/landing-v2/CategoryCardsV2";
import TrustSectionV2 from "@/components/landing-v2/TrustSectionV2";
import FinalCTAV2 from "@/components/landing-v2/FinalCTAV2";
import FooterV2 from "@/components/landing-v2/FooterV2";

type IndexV2Props = {
  skipAnimations?: boolean;
};

const IndexV2 = ({ skipAnimations = false }: IndexV2Props) => {
  return (
    <div
      className={`v2-root${skipAnimations ? " v2-skip-animations" : ""}`}
      data-landing-animations={skipAnimations ? "off" : "on"}
    >
      <NavbarV2 />
      <HeroV2 />
      <HowItWorksV2 />
      <CategoryCardsV2 />
      <TrustSectionV2 />
      <FinalCTAV2 />
      <FooterV2 />
    </div>
  );
};

export default IndexV2;
