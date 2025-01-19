import axios from "axios";
import { selector } from "recoil";
import { baseUrl } from "../../baseUrl";

export const notesSelector = selector({
  key: "notesSelector",
  get: async ({ get }) => {
    try {
      //don't forget to add await , took me 1 day to figure out this bug.
      const { data } = await axios.get(`${baseUrl}/mindnotes`, {
        withCredentials: true,
      });

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      } else {
        console.error("Failed to load user");
      }
      return false;
    }
  },
});
