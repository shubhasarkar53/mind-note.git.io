import { useRecoilState, useRecoilValue } from "recoil";

import {
  authAtom,
  loadingAtom,
  modalAtom,
  notesAtom,
} from "../store/atoms/atoms";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardsContainer from "../components-new/CardContainer";
import { TopBar } from "../components-new/Navbar2";
import ShareModal from "../components/ShareModal";
import { Sidebar } from "../components/Sidebar";
import { useNoteFunctions } from "../store/hooks/noteHooks";

export default function Dashboard() {
  const isAuthenticated = useRecoilValue(authAtom);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/signin");
      // return null;
    }
  }, []);

  const notes = useRecoilValue(notesAtom);

  const loading = useRecoilValue(loadingAtom);

  const [, setIsModalOpen] = useRecoilState(modalAtom);
  const handleAddNote = () => {
    // setSelectedNote(null);
    setIsModalOpen(true);
  };

  const { handleGetNotes } = useNoteFunctions();
  useEffect(() => {
    handleGetNotes();
  }, []);
  return (
    <div>
      <>
        <TopBar />
        <div className="min-h-screen  flex">
          <Sidebar />
          <CardsContainer />
          <ShareModal />
        </div>
      </>
    </div>
  );
}
