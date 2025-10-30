import { X, Loader2 } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../App";
import { getDocumentTags } from "../../api/documentManagement";

const TagInput = ({ selectedTags, setSelectedTags }) => {
  const { authToken } = useContext(AuthContext);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!inputValue.trim() || !authToken) {
        setSuggestions([]);
        return;
      }
      setLoadingSuggestions(true);
      try {
        const result = await getDocumentTags(inputValue, authToken);
        if (result.ok && result.data && result.data.data) {
          const newSuggestions = result.data.data
            .filter((tag) => !selectedTags.includes(tag.label.toLowerCase()))
            .map((tag) => tag.label.toLowerCase());
          setSuggestions(newSuggestions);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        setSuggestions([]);
      } finally {
        setLoadingSuggestions(false);
      }
    };

    const handler = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, selectedTags, authToken]);

  const addTag = (tag) => {
    const newTag = tag.trim().toLowerCase();
    if (newTag && !selectedTags.includes(newTag)) {
      setSelectedTags([...selectedTags, newTag]);
    }
    setInputValue("");
    setSuggestions([]);
  };

  const removeTag = (tagToRemove) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (showSuggestions && suggestions.length > 0) {
        addTag(suggestions[0]);
      } else {
        addTag(inputValue);
      }
    } else if (e.key === "Backspace" && inputValue === "") {
      setSelectedTags(selectedTags.slice(0, -1));
    }
  };

  const handleSuggestionClick = (tag) => {
    addTag(tag);
  };

  const filteredSuggestions = suggestions.filter((tag) =>
    tag.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="relative">
      <div
        className={`flex flex-wrap items-center gap-2 p-2 border rounded-lg shadow-inner transition duration-150 ease-in-out
          ${
            showSuggestions
              ? "border-emerald-500 ring-1 ring-emerald-500"
              : "border-gray-300 hover:border-gray-400"
          }
        `}
      >
        {selectedTags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 bg-emerald-100 text-emerald-800 text-xs font-medium py-1 pl-2 pr-1 rounded-full whitespace-nowrap"
          >
            {tag}
            <X
              onClick={() => removeTag(tag)}
              className="w-3 h-3 text-emerald-600 cursor-pointer hover:text-red-500 transition-colors"
            />
          </span>
        ))}

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
          placeholder={
            selectedTags.length > 0
              ? ""
              : "Search or add tags (e.g., invoice, receipt)"
          }
          className="flex-1 min-w-[150px] border-none outline-none focus:ring-0 focus:border-transparent p-0 text-sm placeholder-gray-500 bg-transparent"
        />

        {loadingSuggestions && (
          <Loader2 className="w-4 h-4 mr-2 animate-spin text-emerald-500" />
        )}
      </div>

      {showSuggestions &&
        (filteredSuggestions.length > 0 || loadingSuggestions) && (
          <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-lg shadow-xl mt-1 max-h-60 overflow-y-auto">
            {filteredSuggestions.length > 0
              ? filteredSuggestions.map((tag) => (
                  <li
                    key={tag}
                    onMouseDown={() => handleSuggestionClick(tag)}
                    className="px-4 py-2 text-sm text-gray-800 cursor-pointer hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                  >
                    {tag}
                  </li>
                ))
              : !loadingSuggestions && (
                  <li className="px-4 py-2 text-sm text-gray-500 italic">
                    No existing tags found. Press Enter to create new.
                  </li>
                )}
          </ul>
        )}
    </div>
  );
};

export default TagInput;
