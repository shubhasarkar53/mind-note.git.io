import { Home, Settings, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-sm hidden md:block">
      <div className="h-full flex flex-col py-6">
        <div className="px-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900">Menu</h2>
        </div>
        
        <nav className="flex-1">
          <Link
            to="/dashboard"
            className="flex items-center space-x-2 px-6 py-3 text-gray-700 hover:bg-primary hover:text-accent"
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>
          
          <Link
            to="/notes"
            className="flex items-center space-x-2 px-6 py-3 text-gray-700 hover:bg-primary hover:text-accent"
          >
            <BookOpen className="w-5 h-5" />
            <span>My Notes</span>
          </Link>
          
          <Link
            to="/settings"
            className="flex items-center space-x-2 px-6 py-3 text-gray-700 hover:bg-primary hover:text-accent"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
}