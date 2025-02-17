import { motion } from "framer-motion";
import MainLogo from "./MainLogo";
import ButtonGr from "./ButtonGr";
import { useNavigate } from "react-router-dom";
function HeroNav() {
  const navigate = useNavigate();
  return (
    <nav className="container mx-auto px-6 py-6">
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2"
        >
          <MainLogo />
        </motion.div>
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ButtonGr size="md" onClick={() => navigate("/signup")}>
            Get Started
          </ButtonGr>
        </motion.button>
      </div>
    </nav>
  );
}

export default HeroNav;
