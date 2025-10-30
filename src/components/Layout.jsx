import { Link } from "react-router-dom";
import { LogOut, Home, Users, Menu, X } from "lucide-react";
import { AuthContext } from "../App";
import { useContext, useState } from "react";

const Layout = ({ children }) => {
  const { logout } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const NavItem = ({ to, icon: Icon, label }) => (
    <Link
      to={to}
      className="flex items-center p-3 text-sm font-medium text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors"
      onClick={() => setSidebarOpen(false)}
    >
      <Icon className="w-5 h-5 mr-3" />
      {label}
    </Link>
  );

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden fixed top-0 left-0 z-40 p-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-gray-700 bg-white rounded-md shadow-md"
        >
          {sidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 py-4 px-2 space-y-6 bg-white border-r border-gray-400 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-200 ease-in-out`}
      >
        <h1 className="text-xl font-bold text-primary">Document DMS</h1>
        <nav className="space-y-1">
          <NavItem to="/dashboard" icon={Home} label="Dashboard" />{" "}
          <NavItem
            to="/admin-register"
            icon={Users}
            label="Admin Registration"
          />
        </nav>
        <div className="pt-4 border-t border-gray-400">
          <button
            onClick={logout}
            className="flex items-center w-full p-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-100 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <main className="flex-1 p-8 overflow-y-auto md:ml-0 mt-16 md:mt-0">
        {children}
      </main>
    </div>
  );
};

export default Layout;
