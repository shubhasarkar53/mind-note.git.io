import { useRecoilState } from "recoil";
import {
  errorAtom,
  loadingAtom,
  notesAtom,
  sharableLinkAtom,
  sharedNoteAtom,
  shareErrorAtom,
} from "../atoms/atoms";

import axios from "axios";
import { INotes } from "../types/types";
import {
  createNote,
  deleteNote,
  generateSharableLink,
  getNotes,
  getSearchedNotes,
  getSharedNote,
  updateNote,
  updateNoteDataType,
} from "../actions/noteActions";
import { baseUrl } from "../../baseUrl";

export const useNoteFunctions = () => {
  const [loading, setLoading] = useRecoilState(loadingAtom);
  const [error, setError] = useRecoilState(errorAtom);
  const [sError, setSError] = useRecoilState(shareErrorAtom);
  const [note, setNotes] = useRecoilState(notesAtom);
  const [, setSharedNotes] = useRecoilState(sharedNoteAtom);
  const [, setSharableLink] = useRecoilState(sharableLinkAtom);

  //create note
  const handleCreateNote = async (notesData: INotes) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await createNote(notesData);
      console.log("after creating note data:", data);
      if (data) {
        setNotes((prev) => [...prev, data.note]);
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
      if (data.note) {
        setNotes((prev) =>
          prev.map((note) => (note._id == id ? data.note : note))
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

  //latest
  const handleGetNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await getNotes();
      console.log("Notes data:", data);
      if (data.notes) {
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

  //handle searched results
  const handleSearchNotes = async (query:string) =>{
    setLoading(true);
    setError(null);
    try {
      const { data } = await getSearchedNotes(query);
      console.log("Saerched Notes data:", data);
      if (data.searchResults) {
        setNotes(data.searchResults);
        return true;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error?.response?.data?.message);
        // console.log(error);
        throw error;
      } else {
        console.error("Failed to load search results");
      }
      return false;
    } finally {
      setLoading(false);
    }
  }


  const handleGenerateSharableLink = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await generateSharableLink(id);

      const link = `${window.location.origin}/mindnote/share/${data.data}`;

      setNotes((prev) =>
        prev.map((note) =>
          note._id == id ? { ...note, shared: true} : note
        )
      );

      setSharableLink(link);


      return true;
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
  const handleGetSharedContent = async (hash: string) => {
    setLoading(true);
    setSError(null);

    try {
      const { data } = await getSharedNote(hash);

      setSharedNotes(data.data);

      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setSError(error?.response?.data?.message);
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
    handleGetSharedContent,
    handleGenerateSharableLink,
    handleSearchNotes
  };
};
