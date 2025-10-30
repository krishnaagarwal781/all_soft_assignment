import { useState } from "react";
import { LayoutDashboard } from "lucide-react";
import FileUploadForm from "../components/Document/FileUploadForm";

const DashboardPage = () => {
  const [view, setView] = useState("search");

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-extrabold text-gray-900 flex items-center">
        <LayoutDashboard className="w-8 h-8 mr-3 text-indigo-600" />
        Document Management Dashboard
      </h1>

      <div className="flex space-x-2">
        <button
          onClick={() => setView("search")}
          className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors ${
            view === "search"
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50"
          }`}
        >
          Search Documents
        </button>
        <button
          onClick={() => setView("upload")}
          className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors ${
            view === "upload"
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50"
          }`}
        >
          Upload Document
        </button>
      </div>

      {view === "upload" && <FileUploadForm />}
    </div>
  );
};

export default DashboardPage;
