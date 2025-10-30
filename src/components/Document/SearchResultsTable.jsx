import { Download, Eye, X, Archive } from "lucide-react";
import { useState, useContext } from "react";
import { AuthContext } from "../../App";

const SearchResultsTable = ({ results = [] }) => {
  const { authToken } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState(null);

  const handlePreview = (doc) => {
    const fileExtension = doc.file_url
      ? doc.file_url.split(".").pop().split("?")[0].toLowerCase()
      : "";
    let fileType = "application/octet-stream";
    if (["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(fileExtension)) {
      fileType = `image/${fileExtension === "jpg" ? "jpeg" : fileExtension}`;
    } else if (fileExtension === "pdf") {
      fileType = "application/pdf";
    }

    setPreviewContent({
      ...doc,
      type: fileType,
      name: doc.file_url.split("/").pop().split("?")[0],
    });
    setIsModalOpen(true);
  };

  const handleDownload = async (doc) => {
    if (!authToken) {
      alert("Authentication token not found. Please log in to download files.");
      return;
    }

    window.open(doc.file_url, "_blank");
  };

  const handleDownloadAll = () => {
    if (!authToken) {
      alert("Authentication token not found. Please log in to download files.");
      return;
    }

    alert(`Downloading ${results.length} files as a ZIP... (Simulated)`);
  };

  const FilePreviewModal = () => {
    if (!previewContent || !previewContent.type) return null;

    let content;
    if (previewContent.type.startsWith("image/")) {
      content = (
        <img
          src={previewContent.file_url}
          alt={previewContent.name}
          className="max-w-full max-h-[70vh] object-contain"
        />
      );
    } else if (previewContent.type === "application/pdf") {
      content = (
        <iframe
          src={previewContent.file_url}
          title={previewContent.name}
          width="100%"
          height="600px"
          className="border-none"
        >
          <p>
            Your browser does not support iframes, please download the file.
          </p>
        </iframe>
      );
    } else {
      content = (
        <div className="p-10 text-center bg-yellow-50 rounded-lg">
          <X className="w-10 h-10 mx-auto text-yellow-600" />
          <h4 className="text-lg font-semibold mt-3">
            Unsupported Preview Type
          </h4>
          <p className="text-gray-600">
            The file type **.{previewContent.name.split(".").pop()}** cannot be
            previewed directly in the browser. Please use the Download button.
          </p>
        </div>
      );
    }

    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={() => setIsModalOpen(false)}
      >
        <div
          className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="text-lg font-semibold text-indigo-700">
              Preview: {previewContent.name}
            </h3>
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-gray-500 hover:text-gray-800"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-4">{content}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-white rounded-xl border border-gray-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-indigo-700">
          Search Results ({results.length})
        </h3>
        {results.length > 0 && (
          <button
            onClick={handleDownloadAll}
            className="flex items-center py-2 px-4 text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition-colors"
          >
            <Archive className="w-5 h-5 mr-2" />
            Download All as ZIP
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                File Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Remarks
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Uploaded By
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {results.map((doc) => (
              <tr
                key={doc.document_id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                  {doc.file_url ? (
                    <a
                      href={doc.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {doc.file_url.split("/").pop().split("?")[0]}{" "}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(doc.document_date).toLocaleDateString("en-GB")}{" "}
                  {/* Format date */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {doc.major_head} /{" "}
                  <span className="font-medium">{doc.minor_head}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {doc.document_remarks}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {doc.uploaded_by}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button
                    onClick={() => handlePreview(doc)}
                    className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50 transition-colors"
                    title="Preview File"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDownload(doc)}
                    className="text-green-600 hover:text-green-900 p-1 rounded-full hover:bg-green-50 transition-colors"
                    title="Download File"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {results.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  No documents found matching the search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && <FilePreviewModal />}
    </div>
  );
};

export default SearchResultsTable;
