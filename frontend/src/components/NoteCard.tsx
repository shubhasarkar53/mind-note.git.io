import {
  Facebook,
  Globe,
  Globe2,
  Instagram,
  Linkedin,
  Link as LinkIcon,
  Share,
  Share2,
  Trash,
  Twitter,
  Youtube,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNoteFunctions } from "../store/hooks/noteHooks";
import { INotes } from "../store/types/types";
import { useRecoilState, useRecoilValue } from "recoil";
import { sharableLinkAtom, shareModalAtom } from "../store/atoms/atoms";
import ShareModal from "./ShareModal";

interface NoteCardProps {
  note: INotes;
  onEdit: () => void;
}

export enum iconOptions {
  twitter = "Twitter",
  youtube = "Youtube",
  linkedin = "Linkedin",
  link = "LinkIcon",
  instagram = "Instagram",
  facebook = "Facebook",
}

export const icon = {
  twitter: Twitter,
  youtube: Youtube,
  linkedin: Linkedin,
  link: LinkIcon,
  instagram: Instagram,
  facebook: Facebook,
};

function NoteCard({ note, onEdit }: NoteCardProps) {
  const sharableLink = useRecoilValue(sharableLinkAtom);

  const { handleUpdateNote, handleDeleteNote, handleGenerateSharableLink } =
    useNoteFunctions();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingText, setIsEditingText] = useState(false);
  const [title, setTitle] = useState(note.title as string);
  const [text, setText] = useState(note.text);
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useRecoilState(shareModalAtom);
  const exp = (note.type as string) || "link";
  //@ts-ignore
  const Icon = icon[exp];

  // Handle title change in input
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSave = () => {
    handleUpdateNote({ title }, note._id as string);
    setIsEditingTitle(false);
  };
  const handleDelete = () => {
    handleDeleteNote(note._id as string);
  };

  // Handle key press (Enter to save)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };
  const handleSaveText = () => {
    handleUpdateNote({ text }, note._id as string);
    setIsEditingText(false);
  };
  // Handle key press for text
  const handleTextKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault(); // Prevent adding a new line
      handleSaveText();
    }
  };

  //handle share

  async function handleShare() {
    console.log("noteid from share:", note._id);
    handleGenerateSharableLink(note._id as string);
    //open share modal
    setIsModalOpen(true);
  }

  return (
    <div className="card cursor-pointer relative" onClick={onEdit}>
      <div className="flex items-center justify-between  ">
        {/* main top */}
        <div className="flex items-center space-x-2 mb-3 ">
          <div className="w-5 aspect-square">
            <Icon className=" text-accent" />
          </div>

          {isEditingTitle ? (
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              onKeyDown={handleKeyPress}
              onBlur={handleSave} // Save when user clicks away
              autoFocus
              className="text-lg font-semibold  rounded px-2"
            />
          ) : (
            <h3
              className="text-lg font-semibold cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditingTitle(true);
              }}
            >
              {title.length > 35 ? `${title.slice(0, 35)}...` : title}{" "}
            </h3>
          )}
        </div>

        {/* top-icons */}
        {!isEditingTitle && (
          <div className=" flex items-center gap-2">
            <div
              className="flex items-center space-x-2 mb-3 hover:bg-red-50 hover:rounded-full"
              onClick={handleDelete}
            >
              <Trash className="w-4 aspect-square text-red-500" />
            </div>
            <div
              className="flex items-center space-x-2 mb-3 hover:bg-blue-50 hover:rounded-full"
              onClick={handleShare}
            >
              <Share2 className="w-4 aspect-square text-blue-600" />
            </div>
          </div>
        )}
      </div>

      <div className="mb-4">
        <div className=" relative mx-auto my-4 w-full md:max-w-60 aspect-video border  bg-slate-50 rounded-lg overflow-hidden">
          {note.shared && (
            <div className="absolute top-1 right-2 select-none">
              <Globe size={12} className="text-green-400" />
            </div>
          )}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            to={note.link as string}
            className="w-full h-full flex justify-center items-center "
          >
            <Icon size={50} className="text-blue-200" />
          </Link>
        </div>
      </div>

      <div className="prose prose-sm">
        {isEditingText ? (
          <textarea
            value={text}
            onChange={handleTextChange}
            onKeyDown={handleTextKeyPress}
            onBlur={handleSaveText} // Save when user clicks away
            autoFocus
            rows={3}
            className="w-full text-gray-600 border border-gray-300 rounded px-2 py-1"
          />
        ) : (
          <p
            className="text-gray-600 line-clamp-5 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditingText(true);
            }}
          >
            {text}
          </p>
        )}
      </div>
    </div>
  );
}

export default React.memo(NoteCard);
