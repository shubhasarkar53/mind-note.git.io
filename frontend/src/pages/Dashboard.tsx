import { useState } from "react";
import {
  Plus,
  Twitter,
  Youtube,
  Linkedin,
  Link as LinkIcon,
  Brain,
} from "lucide-react";
import { Modal, Box, Avatar } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NoteCard from "../components/NoteCard";
import { useRecoilValue } from "recoil";
import { authAtom } from "../store/atoms/atoms";

interface Note {
  id: string;
  title: string;
  type: "twitter" | "youtube" | "linkedin" | "link";
  link: string;
  content: string;
}

export default function Dashboard() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleAddNote = () => {
    setSelectedNote(null);
    setIsModalOpen(true);
  };

  const handleEditNote = (note: Note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
  };

  ////

  const isAuthenticated = useRecoilValue(authAtom);

  return (
    <div className="min-h-screen bg-primary flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar isAuthenticated={isAuthenticated} onAddNote={handleAddNote} />

        <main className="flex-1 p-6 overflow-auto">
          {notes.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <button
                onClick={handleAddNote}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add Mind Note</span>
              </button>

            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onEdit={() => handleEditNote(note)}
                />
              ))}
            </div>
          )}
        </main>

        <Footer />
      </div>

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="note-modal"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">
            {selectedNote ? "Edit Note" : "Add New Note"}
          </h2>
          {/* Modal content will go here */}
        </Box>
      </Modal>
    </div>
  );
}
