import { useRecoilState } from "recoil";
import { errorAtom, loadingAtom, notesAtom } from "../atoms/atoms";

import axios from "axios";
import { INotes } from "../types/types";
import {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
  updateNoteDataType,
} from "../actions/noteActions";

export const useNoteFunctions = () => {
  const [loading, setLoading] = useRecoilState(loadingAtom);
  const [error, setError] = useRecoilState(errorAtom);
  const [note, setNotes] = useRecoilState(notesAtom);

  //create note
  const handleCreateNote = async (notesData: INotes) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await createNote(notesData);
      console.log("after creating note data:", data);
      if (data) {
        setNotes((prev) => [...prev, notesData]);
        return true;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error?.response?.data?.message);
        // console.log(error);
        throw error;
      } else {
        console.error("Failed to create mind note");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  //Updatenote
  const handleUpdateNote = async (
    notesData: updateNoteDataType,
    id: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await updateNote(notesData, id);
      console.log("after updatenote data:", data);
      if (data) {
        setNotes((prev) =>
          prev.map((note) => (note._id == id ? notesData : note))
        );

        return true;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error?.response?.data?.message);
        // console.log(error);
        throw error;
      } else {
        console.error("Failed to update mindnote");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  //deletenote
  const handleDeleteNote = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await deleteNote(id);
      console.log("after deleting data:", data);
      if (data) {
        // setNotes(prev=> prev.map((note)=> note._id!==id && note  ))
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
        return true;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error?.response?.data?.message);
        // console.log(error);
        throw error;
      } else {
        console.error("Failed to logout");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  //get all notes

  const handleGetNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await getNotes();
      console.log("Notes data:", data);
      if (data) {
        setNotes(data.notes);
        return true;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error?.response?.data?.message);
        // console.log(error);
        throw error;
      } else {
        console.error("Failed to load user");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };


  return {
    handleCreateNote,
    handleUpdateNote,
    handleGetNotes,
    handleDeleteNote,
  };
};
