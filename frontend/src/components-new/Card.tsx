import React, { useRef, useState } from "react";
import { Instagram, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { INotes, Note } from "../store/types/types";
import { useNoteFunctions } from "../store/hooks/noteHooks";
import { updateNoteDataType } from "../store/actions/noteActions";
import WebsiteLogo from "./WebsiteLogo";
import { Link } from "react-router-dom";

interface NoteCardProps {
  note: INotes;
}

let clock: any;

export const NoteCard2: React.FC<NoteCardProps> = ({ note }) => {
  const [noteData, setNoteData] = useState<updateNoteDataType>({
    _id: note._id,
    title: note.title,
    text: note.text,
    link: note.link,
    type: note.type,
  });

  const debouncedNoteData = useRef(noteData);
  const { handleDeleteNote, handleUpdateNote } = useNoteFunctions();

  const onDelete = () => {
    handleDeleteNote(note._id as string);
  };

  const checkIfEmpty = (data: updateNoteDataType) => {
    if (!data.link) {
      data.link = "Paste link here...";
    }
    if (!data.text) {
      data.link = "Write your mind's note here...";
    }
    if (!data.title) {
      data.title = "Title...";
    }
    if (!data.type) {
      data.type = "link";
    }
  };

  const handleContentChange = (
    field: keyof updateNoteDataType,
    value: string
  ) => {
    clearTimeout(clock);

    //debouncing here using refs
    debouncedNoteData.current = {
      ...debouncedNoteData.current,
      [field]: value,
    };

    //if field == "link"
    //call the funtion
    // get res and add to type type:funtion's return value.
    //link :value

    if (field === "link") {
      try {
        const hostname = new URL(value).hostname;
        debouncedNoteData.current.type = hostname;
      } catch {
        debouncedNoteData.current.type = "link";
      }
    }

    setNoteData(debouncedNoteData.current);
    clock = setTimeout(() => {
      console.log(debouncedNoteData.current);

      checkIfEmpty(debouncedNoteData.current);

      console.log(debouncedNoteData.current);
      handleUpdateNote(debouncedNoteData.current, note._id as string);
    }, 3000);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`${note.color} p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow`}
    >
      <div className="flex justify-end mb-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onDelete}
          className="text-gray-500 hover:text-red-500 transition-colors"
        >
          <Trash2 className="h-5 w-5" />
        </motion.button>
      </div>
      <input
        value={noteData.title}
        onChange={(e) => handleContentChange("title", e.target.value)}
        placeholder="Title..."
        className="w-full font-bold text-xl bg-transparent border-none focus:outline-none resize-none"
      />
      <textarea
        value={noteData.text}
        onChange={(e) => handleContentChange("text", e.target.value)}
        placeholder="Write your mind note here..."
        className="w-full bg-transparent border-none focus:outline-none resize-none"
        rows={4}
      />
      <div className="flex items-center gap-2">
        <input
          value={noteData.link}
          onChange={(e) => handleContentChange("link", e.target.value)}
          placeholder="Paste the link..."
          className="w-full text-sm text-gray-600 bg-transparent border-none focus:outline-none resize-none"
        />
        <div>
        {noteData.link && (
          <div className="flex justify-center items-center">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              to={noteData.link as string}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-500 hover:text-blue-500 transition-colors"
              >
                <WebsiteLogo url={noteData.link} />
              </motion.button>
            </Link>
          </div>
        )}
        </div>
        
      </div>
    </motion.div>
  );

  //     const [noteData,setNoteData] = useState<updateNoteDataType>({
  //         _id:note._id,
  //         title:note.title,
  //         text:note.text,
  //         link:note.link,
  //         type:note.type
  //     })
  //     const {handleDeleteNote} = useNoteFunctions()

  //     const onDelete = () => {
  //         handleDeleteNote(note._id as string);
  //       };

  //     const onContentChange = () =>{

  //     }

  //   return (
  //     <motion.div
  //       layout
  //       initial={{ opacity: 0, y: 20 }}
  //       animate={{ opacity: 1, y: 0 }}
  //       exit={{ opacity: 0, y: -20 }}
  //       className={`${note.color} p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow`}
  //     >
  //       <div className="flex justify-end mb-2">
  //         <motion.button
  //           whileHover={{ scale: 1.1 }}
  //           whileTap={{ scale: 0.95 }}
  //           onClick={() => onDelete()}
  //           className="text-gray-500 hover:text-red-500 transition-colors"
  //         >
  //           <Trash2 className="h-5 w-5" />
  //         </motion.button>
  //       </div>
  //       <input
  //         value={note.title}
  //         onChange={(e) => onContentChange(note._id as string, e.target.value)}
  //         placeholder="Title..."
  //         className="w-full font-bold text-xl bg-transparent border-none focus:outline-none resize-none"
  //       />
  //       <textarea
  //         value={note.text}
  //         onChange={(e) => onContentChange(note._id as string, e.target.value)}
  //         placeholder="Write your mind note here..."
  //         className="w-full bg-transparent border-none focus:outline-none resize-none"
  //         rows={4}
  //       />
  //       <div className=" flex items-center">
  //         <input
  //           value={note.link}
  //           onChange={(e) => onContentChange(note._id as string, e.target.value)}
  //           placeholder="Paste the link..."
  //           className="w-full bg-transparent border-none focus:outline-none resize-none"
  //         />
  //         <div className="flex justify-center items-center">
  //           <motion.button
  //             whileHover={{ scale: 1.1 }}
  //             whileTap={{ scale: 0.95 }}
  //             className="text-gray-500 hover:text-blue-500 transition-colors"
  //           >
  //             <Instagram className="h-5 w-5" />
  //           </motion.button>
  //         </div>
  //       </div>
  //     </motion.div>
  //   );
};
