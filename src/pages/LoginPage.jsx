import { useState } from "react";
import OtpLogin from "../components/Auth/OtpLogin";
import StaticAdminRegistration from "../components/Auth/StaticAdminRegistration";

const LoginPage = () => {
  const [showAdminRegistration, setShowAdminRegistration] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center w-full justify-center p-4 bg-gray-100">
      <div className="flex flex-col items-center max-w-5xl w-full gap-6">
        <div className="flex justify-end space-x-4 mb-6">
          <button
            onClick={() => setShowAdminRegistration(false)}
            className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              !showAdminRegistration
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            User Login
          </button>
          <button
            onClick={() => setShowAdminRegistration(true)}
            className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              showAdminRegistration
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Admin Registration
          </button>
        </div>
        {showAdminRegistration ? <StaticAdminRegistration /> : <OtpLogin />}
      </div>
    </div>
  );
};

export default LoginPage;
