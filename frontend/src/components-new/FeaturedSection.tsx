import { BookmarkPlus, Share2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";

function FeaturedSection() {
  const FeaturedMap = [
    {
      icon: <BookmarkPlus />,
      title: "Save Links",
      description: "Store all your important links in one secure place",
    },
    {
      icon: <Share2 />,
      title: "Share Easily",
      description: "Share your curated collections with anyone, anywhere",
    },
    {
      icon: <Sparkles />,
      title: "Stay Organized",
      description: "Keep your digital life clean and organized",
    },
  ];
  return (
    <>
      {/* grid */}
      <motion.div
        className="grid md:grid-cols-3 gap-8 mb-20"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {FeaturedMap.map((item, index) => {
          return (
            <FeatureCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
            ></FeatureCard>
          );
        })}
      </motion.div>
    </>
  );
}

export default FeaturedSection;
