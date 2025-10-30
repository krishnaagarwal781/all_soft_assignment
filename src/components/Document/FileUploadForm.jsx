import { useState, useMemo, useContext } from "react";
import {
  Calendar,
  Folder,
  Users,
  FileText,
  Upload,
  Paperclip,
} from "lucide-react";
import TagInput from "../UI/TagInput";
import { AuthContext } from "../../App";
import { MOCK_MINOR_HEADS } from "../../constants/documentConstants";

const FileUploadForm = () => {
  const { authToken, userId } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [uploadDate, setUploadDate] = useState("");
  const [majorHead, setMajorHead] = useState("");
  const [minorHead, setMinorHead] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [remarks, setRemarks] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const minorHeadOptions = useMemo(() => {
    return MOCK_MINOR_HEADS[majorHead] || [];
  }, [majorHead]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (
        selectedFile.type.startsWith("image/") ||
        selectedFile.type === "application/pdf"
      ) {
        setFile(selectedFile);
      } else {
        alert("Only Image and PDF files are allowed.");
        setFile(null);
        e.target.value = null;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!authToken || !userId) {
      setMessage("Authentication required. Please log in to upload documents.");
      return;
    }
    if (!file || !uploadDate || !majorHead || !minorHead) {
      setMessage("Please fill all required fields and select a file.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const formattedTags = selectedTags.map((tag) => ({ tag_name: tag }));

      const [year, month, day] = uploadDate.split("-");
      const formattedDate = `${day}-${month}-${year}`;

      const dataPayload = {
        major_head: majorHead,
        minor_head: minorHead,
        document_date: formattedDate,
        document_remarks: remarks,
        tags: formattedTags,
        user_id: userId,
      };
      formData.append("data", JSON.stringify(dataPayload));

      const response = await fetch(
        "https://apis.allsoft.co/api/documentManagement/saveDocumentEntry",
        {
          method: "POST",
          headers: {
            token: authToken,
          },
          body: formData,
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage(
          `Successfully uploaded file: ${file.name}. ${result.message || ""}`
        );

        setFile(null);
        setUploadDate("");
        setMajorHead("");
        setMinorHead("");
        setSelectedTags([]);
        setRemarks("");
      } else {
        setMessage(
          result.message || "Failed to upload document. Please try again."
        );
      }
    } catch (error) {
      setMessage("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-md border border-gray-300">
      <h3 className="text-xl font-semibold mb-4 text-indigo-700 flex items-center">
        <Upload className="w-6 h-6 mr-2" />
        Upload New Document
      </h3>

      {message && (
        <p
          className={`mb-4 p-3 rounded-lg text-sm ${
            message.includes("Successfully")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="space-y-2">
          <label
            htmlFor="upload-date"
            className="text-sm font-medium text-gray-700 flex items-center"
          >
            <Calendar className="w-4 h-4 mr-1 text-indigo-500" /> Upload Date *
          </label>
          <input
            id="upload-date"
            type="date"
            value={uploadDate}
            onChange={(e) => setUploadDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="major-head"
            className="text-sm font-medium text-gray-700 flex items-center"
          >
            <Folder className="w-4 h-4 mr-1 text-indigo-500" /> Category (Major
            Head) *
          </label>
          <select
            id="major-head"
            value={majorHead}
            onChange={(e) => {
              setMajorHead(e.target.value);
              setMinorHead("");
            }}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
            required
          >
            <option value="">Select Category</option>
            <option value="Personal">Personal</option>
            <option value="Professional">Professional</option>
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="minor-head"
            className="text-sm font-medium text-gray-700 flex items-center"
          >
            <Users className="w-4 h-4 mr-1 text-indigo-500" /> Sub-Category
            (Minor Head) *
          </label>
          <select
            id="minor-head"
            value={minorHead}
            onChange={(e) => setMinorHead(e.target.value)}
            disabled={!majorHead}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white disabled:bg-gray-50"
            required
          >
            <option value="">Select {majorHead || "..."}</option>
            {minorHeadOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <TagInput
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <label
            htmlFor="remarks"
            className="text-sm font-medium text-gray-700 flex items-center"
          >
            <FileText className="w-4 h-4 mr-1 text-indigo-500" /> Remarks
          </label>
          <textarea
            id="remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            rows="2"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Add any relevant notes or descriptions..."
          ></textarea>
        </div>

        <div className="md:col-span-2 space-y-2">
          <label
            htmlFor="file-upload"
            className="text-sm font-medium text-gray-700 flex items-center"
          >
            <Paperclip className="w-4 h-4 mr-1 text-indigo-500" /> Select File
            (Image or PDF only) *
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".pdf, image/*"
            onChange={handleFileChange}
            className="w-full text-sm text-gray-500 
                file:mr-4 file:py-2 file:px-4 
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100"
            required
          />
          {file && (
            <p className="text-xs text-gray-500 mt-1">
              Selected: **{file.name}** ({Math.round(file.size / 1024)} KB)
            </p>
          )}
        </div>

        <div className="md:col-span-2 pt-4">
          <button
            type="submit"
            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            <Upload className="w-6 h-6 mr-2" />
            Upload Document
          </button>
        </div>
      </form>
    </div>
  );
};

export default FileUploadForm;
