import { Avatar } from "@mui/material";
import { Plus } from "lucide-react";
import { useAuth } from "../store/hooks/authHooks";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  isAuthenticated: boolean;
  onAddNote: () => void;
}

export default function Navbar({ onAddNote, isAuthenticated }: NavbarProps) {
  const { handleLogout } = useAuth();
const navigateTo = useNavigate();
  async function handleClick() {
    const isSuccess = await handleLogout();
    if(isSuccess){
      navigateTo("/signin")
    }
  }

  return (
    <nav className="bg-white shadow-sm px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-gray-900">MindNotes</h1>
        </div>

        <div className="flex items-center justify-between gap-4 ">
          <button
            onClick={onAddNote}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>New </span>
          </button>

          {isAuthenticated && <Avatar className="w-5 aspect-square" />}

          <button
            type="submit"
            className="btn-primary w-full flex justify-center items-center"
            onClick={handleClick}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
