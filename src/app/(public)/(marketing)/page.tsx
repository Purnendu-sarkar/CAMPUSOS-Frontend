import AiCareerSection from "@/components/modules/homepage/ai-career-section";
import CtaSection from "@/components/modules/homepage/cta-section";
import EcosystemSection from "@/components/modules/homepage/ecosystem-section";
import FeaturesGridSection from "@/components/modules/homepage/features-grid-section";
import HeroSection from "@/components/modules/homepage/hero-section";
import OnboardingStepsSection from "@/components/modules/homepage/onboarding-steps-section";
import PerspectivesSection from "@/components/modules/homepage/perspectives-section";
import SolutionsSection from "@/components/modules/homepage/solutions-section";
import TrustMetricsSection from "@/components/modules/homepage/trust-metrics-section";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <TrustMetricsSection />
      <FeaturesGridSection />
      <EcosystemSection />
      <SolutionsSection />
      <AiCareerSection />
      <OnboardingStepsSection />
      <PerspectivesSection />
      <CtaSection />
    </div>
  );
}
