import { useState, useContext } from "react";
import { Search, Calendar, Folder, XCircle } from "lucide-react";
import TagInput from "../UI/TagInput";
import { AuthContext } from "../../App";
import { searchDocuments } from "../../api/documentManagement";
import { MOCK_MINOR_HEADS } from "../../constants/documentConstants";

const DocumentSearch = ({ onSearch }) => {
  const { authToken, userId } = useContext(AuthContext);
  const [majorHead, setMajorHead] = useState("");
  const [minorHead, setMinorHead] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const minorHeadOptions = MOCK_MINOR_HEADS[majorHead] || [];

  const handleSearch = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!authToken || !userId) {
      setMessage("Authentication required. Please log in to search documents.");
      return;
    }

    setLoading(true);
    try {
      const formattedFromDate = fromDate
        ? `${fromDate.split("-")[2]}-${fromDate.split("-")[1]}-${
            fromDate.split("-")[0]
          }`
        : "";
      const formattedToDate = toDate
        ? `${toDate.split("-")[2]}-${toDate.split("-")[1]}-${
            toDate.split("-")[0]
          }`
        : "";

      const searchPayload = {
        major_head: majorHead,
        minor_head: minorHead,
        from_date: formattedFromDate,
        to_date: formattedToDate,
        tags: selectedTags.map((tag) => ({ tag_name: tag })),
        uploaded_by: userId,
        start: 0,
        length: 10,
        filterId: "",
        search: {
          value: "",
        },
      };

      const result = await searchDocuments(searchPayload, authToken);

      if (result.ok && result.status) {
        onSearch(result.data);
        setMessage(`Found ${result.recordsFiltered} documents.`);
      } else {
        setMessage(
          result.message || "Failed to search documents. Please try again."
        );
        onSearch([]);
      }
    } catch (error) {
      setMessage("Network error. Please try again later.");
      onSearch([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMajorHead("");
    setMinorHead("");
    setSelectedTags([]);
    setFromDate("");
    setToDate("");
    setMessage("");
    onSearch([]);
  };

  return (
    <div className="p-6 bg-white rounded-md mb-8 border border-gray-300">
      <h3 className="text-xl font-bold mb-3 text-indigo-800 flex items-center">
        <Search className="w-5 h-5 mr-2" />
        Advanced Document Search
      </h3>

      <hr className="mb-6 border-indigo-100" />

      {message && (
        <div
          className={`mb-6 p-4 rounded-md text-sm font-medium ${
            message.includes("Failed") ||
            message.includes("error") ||
            message.includes("Authentication")
              ? "bg-red-50 text-red-600 border border-red-200"
              : "bg-green-50 text-green-600 border border-green-200"
          }`}
        >
          {message}
        </div>
      )}

      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4"
      >
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700 flex items-center">
            <Folder className="w-4 h-4 mr-1 text-indigo-600" /> Category
          </label>
          <select
            value={majorHead}
            onChange={(e) => {
              setMajorHead(e.target.value);
              setMinorHead("");
            }}
            className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-400 transition duration-150 bg-white"
          >
            <option value="">All Categories</option>
            <option value="Personal">Personal</option>
            <option value="Professional">Professional</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700 flex items-center">
            <Folder className="w-4 h-4 mr-1 text-indigo-600" /> Sub-Category
          </label>
          <select
            value={minorHead}
            onChange={(e) => setMinorHead(e.target.value)}
            disabled={!majorHead}
            className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-400 transition duration-150 bg-white disabled:bg-gray-50 disabled:text-gray-400 cursor-pointer disabled:cursor-not-allowed"
          >
            <option value="">All Sub-Categories</option>
            {minorHeadOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700 flex items-center">
            <Calendar className="w-4 h-4 mr-1 text-indigo-600" /> From Date
          </label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-400 transition duration-150"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700 flex items-center">
            <Calendar className="w-4 h-4 mr-1 text-indigo-600" /> To Date
          </label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-400 transition duration-150"
          />
        </div>

        <div className="lg:col-span-3">
          <TagInput
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
        </div>

        <div className="col-span-full lg:col-span-1 flex items-end space-x-3 mt-4 lg:mt-0">
          <button
            type="submit"
            className="flex-1 flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-indigo-500/50 transition duration-150 ease-in-out"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <Search className="w-5 h-5 mr-2" />
            )}
            Search
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="flex-1 flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            <XCircle className="w-5 h-5 mr-2 text-red-500" />
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default DocumentSearch;
