import { Avatar } from "@mui/material";
import { Plus } from "lucide-react";

interface NavbarProps {
  onAddNote: () => void;
}

export default function Navbar({ onAddNote }: NavbarProps) {
  return (
    <nav className="bg-white shadow-sm px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-gray-900">MindNotes</h1>
        </div>
        
        <div className="flex items-center justify-between gap-4">
        <button
          onClick={onAddNote}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>New Note</span>
        </button>
        <Avatar className='w-5 aspect-square'/>
        </div>
      </div>
    </nav>
  );
}