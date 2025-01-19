import { Plus } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import Footer from "../components/Footer";
import DisplayModal from "../components/Modal";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import Sidebar from "../components/Sidebar";
import { authAtom, modalAtom, notesAtom } from "../store/atoms/atoms";
import { useNoteFunctions } from "../store/hooks/noteHooks";
import { notesSelector } from "../store/selectors/notesSelector";
import { INotes } from "../store/types/types";

export default function Dashboard() {
  // const notes:INotes[] = useRecoilValue(notesSelector);
  const loadedNotes = useRecoilValueLoadable(notesSelector);

  const isAuthenticated = useRecoilValue(authAtom);

  const [, setIsModalOpen] = useRecoilState(modalAtom);

  const handleAddNote = () => {
    // setSelectedNote(null);
    setIsModalOpen(true);
  };

  if (loadedNotes.state === "loading") {
    return <div>Finding Notes...</div>;
  }

  if (loadedNotes.state === "hasError") {
    return <div>Some error occurred while fetching this notes.</div>;
  }

  if (loadedNotes.state === "hasValue") {
    const notes: INotes[] = loadedNotes.contents.notes;

    if (!notes) {
      return <div>No developer found. Please check the username.</div>;
    }
    if (!Array.isArray(notes)) {
      console.error("Notes is not an array:", notes);
      return <div>No notes found or invalid data structure.</div>;
    }

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
                    key={note._id}
                    note={note}
                    onEdit={() => {}}
                  />
                ))}
              </div>
            )}
          </main>

          <Footer />
        </div>
        <DisplayModal />
      </div>
    );
  }
}
