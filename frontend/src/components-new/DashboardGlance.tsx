import { motion } from "framer-motion";
import fronted from "../assets/images/frontendMindnotes.png"
function DashboardGlance() {
  return (
    <>
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        
        <div className="relative bg-purple-200 p-10 rounded-3xl" >
          <img
            src={fronted}
            alt="Mind Notes Dashboard Preview"
            className="rounded-2xl shadow-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent rounded-2xl" />
        </div>
      </motion.div>
    </>
  );
}

export default DashboardGlance;
