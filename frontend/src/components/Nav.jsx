import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Logo from "./Logo/Logo";

export default function Nav() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="shadow-md bg-white p-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="font-extrabold text-3xl ">
       <Logo/>
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        <Link
          to="/bids"
          className="font-semibold text-lg text-blue-700 hover:text-gray-600 transition"
        >
          Bids
        </Link>
        <Link
          to="/items"
          className="font-semibold text-lg text-blue-700 hover:text-gray-600 transition"
        >
          Items
        </Link>

        {/* User Auth Section */}
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium">
               <span className="font-semibold text-blue-600">{user.email}</span>
            </span>
            <button
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
