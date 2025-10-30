import { Link } from "react-router-dom";
import { LogOut, Home, Users } from "lucide-react";
import { AuthContext } from "../App";
import { useContext } from "react";

const Layout = ({ children }) => {
  const { logout } = useContext(AuthContext);
  const NavItem = ({ to, icon: Icon, label }) => (
    <Link
      to={to}
      className="flex items-center p-3 text-sm font-medium text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors"
    >
      <Icon className="w-5 h-5 mr-3" />
      {label}
    </Link>
  );

  return (
    <div className="flex h-screen bg-neutral-50">
      <aside className="w-64 py-4 px-2 space-y-6 bg-white border-r border-gray-400">
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

      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
};

export default Layout;
