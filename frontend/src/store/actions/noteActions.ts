import axios from "axios";
import { baseUrl } from "../../baseUrl";
import { INotes } from "../types/types";

export type updateNoteDataType = Pick<
  INotes,
  "link" | "type" | "title" | "text" | "_id"
>;

export const createNote = async (notesData: INotes) => {
  //call
  return await axios.post(`${baseUrl}/mindnote/new`, notesData, {
    withCredentials: true,
  });
};
export const updateNote = async (notesData: updateNoteDataType, id: string) => {
  return await axios.patch(`${baseUrl}/mindnote/:${id}`, notesData, {
    withCredentials: true,
  });
};
export const deleteNote = async (id: string) => {
  return await axios.delete(`${baseUrl}/mindnote/:${id}`, {
    withCredentials: true,
  });
};
export const getNotes = async () => {
  return await axios.get(`${baseUrl}/mindnotes`, { withCredentials: true });
};

//share pending