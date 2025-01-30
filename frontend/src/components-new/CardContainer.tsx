import { useRecoilState } from "recoil";
import { notesAtom, notesState } from "../store/atoms/atoms";
import { AnimatePresence } from "framer-motion";
import { NoteCard2 } from "./Card";

export default function CardsContainer() {
    const [notes, setNotes] = useRecoilState(notesAtom);
   
    return (
      <div className="w-full h-screen ">

        <div className="flex-1 flex ">
       
          <div className="flex-1 p-6 overflow-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {notes.map((note) => (
                  <NoteCard2
                    key={note._id}
                    note={note}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    );
  }