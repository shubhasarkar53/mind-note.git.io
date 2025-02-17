import DashboardGlance from "./DashboardGlance";
import FeaturedSection from "./FeaturedSection";
import HeroFooter from "./HeroFooter";
import HeroTypograpy from "./HeroTypograpy";

function HeroMain() {
  return (
    <main className=" flex flex-col justify-between container mx-auto px-6 pt-20 ">
      <div className="max-w-4xl mx-auto">
        {/* Typograpgy main */}
        <HeroTypograpy />
        <FeaturedSection />
        <DashboardGlance />
      </div>
      <HeroFooter/>
    </main>
  );
}

export default HeroMain;
