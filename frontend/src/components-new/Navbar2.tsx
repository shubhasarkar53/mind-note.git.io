import { LogOut, User } from "lucide-react";

import { motion } from "framer-motion";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../store/hooks/authHooks";
import { authAtom } from "../store/atoms/atoms";
import { useRecoilValue } from "recoil";
import SearchNotes from "./SearchNotes";
import WebsiteLogo from "./WebsiteLogo";
import MainLogo from "./MainLogo";

export const TopBar = () => {
  const isAuthenticated = useRecoilValue(authAtom);
  const { handleLogout } = useAuth();
  const navigateTo = useNavigate();
  async function handleClick() {
    const isSuccess = await handleLogout();
    if (isSuccess) {
      navigateTo("/signin");
    }
  }

  return (
    <div>
      {!isAuthenticated ? (
        <Navigate to={"/signin"} />
      ) : (
        <div className="py-4 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <MainLogo/>
          <SearchNotes />
          {isAuthenticated && (
            <div className="flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center cursor-pointer"
              >
                <User className="text-white h-5 w-5" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClick}
                className="w-10 h-10 rounded-full  flex items-center justify-center cursor-pointer"
              >
                <LogOut className="text-gray-500 hover:text-red-500 transition-colors" />
              </motion.div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
