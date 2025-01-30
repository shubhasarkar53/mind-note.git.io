import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNoteFunctions } from "../store/hooks/noteHooks";
import { useRecoilValue } from "recoil";
import { errorAtom, sharedNoteAtom, shareErrorAtom } from "../store/atoms/atoms";
import { User, Link as LinkIcon, Calendar } from "lucide-react";
function SharedNote() {
  const { hash } = useParams();
  const error = useRecoilValue(shareErrorAtom);
  const sharedNote = useRecoilValue(sharedNoteAtom);
  const { handleGetSharedContent } = useNoteFunctions();

  useEffect(() => {
    if (!hash) return;
    handleGetSharedContent(hash);
  }, [hash]);

  if (error) {
    return <div className="text-red-600 text-sm font-semibold">{error}</div>;
  }

  if (!sharedNote) return null;

  console.log(sharedNote);
  
  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6`}>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        {/* Header with user info */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 flex items-center justify-between">
            <h1 className=" space-x-2 text-white font-semibold text-2xl">MindNotes</h1>
          <div className="flex justify-end items-center space-x-2 text-white">
            <User className="w-5 h-5" />
            <span className="text-sm font-medium">Shared by {sharedNote.userId?.fullname}</span>
          </div>
        </div>

        {/* Main content */}
        <div className="p-8">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4 hover:text-blue-600 transition-colors duration-300">
            {sharedNote.title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2 group">
              <LinkIcon className="w-4 h-4 group-hover:text-blue-500 transition-colors duration-300" />
              <a
                href={sharedNote.link}
                className="hover:text-blue-500 transition-colors duration-300 underline-offset-2 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {sharedNote.link}
              </a>
            </div>
            <div className="flex items-center space-x-2 group">
              <Calendar className="w-4 h-4 group-hover:text-blue-500 transition-colors duration-300" />
              <span className="group-hover:text-blue-500 transition-colors duration-300">
                {sharedNote.updatedAt && new Date(sharedNote.updatedAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  timeZone: "Asia/Kolkata", 
                })}
              </span>
            </div>
          </div>

          {/* Note content */}
          <div className="prose prose-blue max-w-none">
            <div className="bg-blue-50 rounded-xl p-6 text-gray-700 leading-relaxed hover:bg-blue-100 transition-colors duration-300">
              {sharedNote.text}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SharedNote;
