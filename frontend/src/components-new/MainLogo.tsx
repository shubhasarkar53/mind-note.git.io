import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

function MainLogo() {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/")}
      className=" cursor-pointer flex justify-center items-center gap-2"
    >
      <BookOpen className="w-8 h-8 text-purple-600" />
      <span className="text-2xl font-bold gradient-text">Mind Notes</span>
    </div>
  );
}

export default MainLogo;
