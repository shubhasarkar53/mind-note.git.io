import { Twitter, Youtube, Linkedin, Link as LinkIcon } from 'lucide-react';
import { INotes } from '../store/types/types';
import { Icon } from '@mui/material';


interface NoteCardProps {
  note: INotes;
  onEdit: () => void;
}

const icons = {
  twitter: Twitter,
  youtube: Youtube,
  linkedin: Linkedin,
  link: LinkIcon,
};

export default function NoteCard({ note, onEdit }: NoteCardProps) {
  // const Icon = icons[note.type];
  

  return (
    <div className="card cursor-pointer" onClick={onEdit}>
      <div className="flex items-center space-x-2 mb-3">
        <Icon className="w-5 h-5 text-accent" />
        <h3 className="text-lg font-semibold">{note.title}</h3>
      </div>
      
      <div className="mb-4">
        <a
          href={note.link}
          className="text-blue-600 hover:underline break-all"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          {note.link}
        </a>
      </div>
      
      <div className="prose prose-sm">
        <p className="text-gray-600 line-clamp-3">{note.text}</p>
      </div>
    </div>
  );
}