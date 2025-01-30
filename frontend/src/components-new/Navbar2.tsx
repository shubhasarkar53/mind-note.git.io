import { LogOut, Search, User } from "lucide-react";
// import { searchQueryState } from '../atoms/notesAtom';
import { motion } from "framer-motion";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../store/hooks/authHooks";
import { authAtom } from "../store/atoms/atoms";
import { useRecoilValue } from "recoil";

let clock: any;

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
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <input
                // ref={searchRef}
                type="text"
                // value={searchQuery}
                // onChange={(e) => setQuery(e.target.value)}
                placeholder="Search notes..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
            </div>
          </div>
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
