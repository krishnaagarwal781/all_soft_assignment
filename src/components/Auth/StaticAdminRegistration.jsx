import { useState } from "react";
import { User, Lock, PlusCircle } from "lucide-react";

const StaticAdminRegistration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    if (username && password) {
      setMessage(`User "${username}" registered successfully! (Simulated)`);
      setUsername("");
      setPassword("");
    } else {
      setMessage("Please enter both username and password.");
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
        Admin User Registration
      </h2>
      <form onSubmit={handleRegister} className="space-y-4">
        {message && (
          <p
            className={`text-sm text-center ${
              message.includes("successfully")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <div className="relative">
          <User className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Register Admin User
        </button>
      </form>
    </div>
  );
};

export default StaticAdminRegistration;
