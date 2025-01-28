import React from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import { useSetRecoilState } from "recoil";
import { notesState } from "../store/atoms/atoms";
import { useNoteFunctions } from "../store/hooks/noteHooks";

const colorOptions = [
  "bg-rose-200",
  "bg-yellow-200",
  "bg-green-200",
  "bg-blue-200",
  "bg-purple-200",
];

export const Sidebar = () => {
  const [selectedColor, setSelectedColor] = React.useState(colorOptions[0]);
  const { handleCreateNote } = useNoteFunctions();

  const handleAddNote = async () => {
    const defaultContent = {
      title: "Title..",
      link: "Paste your link here...",
      type: "link",
      text: "Write you mind's note here..",
      createdAt: new Date().toISOString(),
    };

    await handleCreateNote(defaultContent);
    //   setNotes((prev) => [
    //     ...prev,
    //     {
    //       id: nanoid(),
    //       content: '',
    //       color: selectedColor,
    //       createdAt: new Date(),
    //     },
    //   ]);
  };

  return (
    <div className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 gap-6">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleAddNote}
        className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
      >
        <Plus className="text-white h-6 w-6" />
      </motion.button>

      <div className="flex flex-col gap-3">
        {colorOptions.map((color) => (
          <motion.div
            key={color}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedColor(color)}
            className={`w-8 h-8 rounded-full cursor-pointer ${color} ${
              selectedColor === color
                ? "ring-2 ring-offset-2 ring-blue-500"
                : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
};
