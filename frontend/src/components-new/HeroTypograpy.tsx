import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ButtonGr from "./ButtonGr";
function HeroTypograpy() {
    const navigate = useNavigate(); 
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Save and Share Your
          <span className="gradient-text"> Digital Universe</span>
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Organize your important links in one place and share them effortlessly
          with the world. Your digital life, simplified.
        </p>
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ButtonGr onClick={()=>navigate("/dashboard")} size="lg" className="flex items-center gap-2 group">
            Start Saving
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </ButtonGr>

          <ButtonGr onClick={()=>navigate("/dashboard")} variant="secondary" size="lg">
            Learn more
          </ButtonGr>
        </motion.div>
      </motion.div>
    </>
  );
}

export default HeroTypograpy;
