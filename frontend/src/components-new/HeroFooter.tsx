import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from 'lucide-react';
import MainLogo from './MainLogo';
import { Link } from "react-router-dom";

function HeroFooter() {
  return (
    <footer  className="  container mx-auto px-6 py-8 mt-32 ">
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <MainLogo/>
            <span className="text-sm text-gray-600">© 2025 Mind Notes. All rights reserved.</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="https://github.com/shubhasarkar53" target="_blank" className="text-gray-600 hover:text-purple-600 transition-colors">
              <Github className="w-5 h-5" />
            </Link>
            <Link to={"https://x.com/mesarkar01"} target="_blank" className="text-gray-600 hover:text-purple-600 transition-colors">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link to={"https://www.linkedin.com/in/shubha-sarkar-862588213/"} target="_blank" className="text-gray-600 hover:text-purple-600 transition-colors">
              <Linkedin className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </footer>
  )
}

export default HeroFooter;
