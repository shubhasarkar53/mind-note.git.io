import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNoteFunctions } from "../store/hooks/noteHooks";

function SearchNotes() {
  const [searchQuery, setSearchQuery] = useState("");
  const { handleSearchNotes, handleGetNotes } = useNoteFunctions();

  useEffect(() => {

    if (!searchQuery) {
      handleGetNotes();
    }
    //set the note using hook
    const debouncedSearch = setTimeout(() => {
      handleSearchNotes(searchQuery.trim());
    }, 400);

    return () => clearTimeout(debouncedSearch);
  }, [searchQuery]);

  return (
    <div className="flex-1 max-w-xl">
      <div className="relative">
        <input
          // ref={searchRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search notes..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
      </div>
    </div>
  );
}

export default SearchNotes;
