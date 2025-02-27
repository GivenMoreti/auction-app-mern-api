import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Nav() {
  const { user, logout } = useContext(AuthContext);
  return (
    <div className="shadow bg-slate-100 p-4 flex justify-between">
      <Link to={"/"} className="font-extrabold  text-4xl text-red-700 py-6">
       ostrich.com
      </Link>
      <div className="flex justify-between  gap-6 py-6 pr-10">
        {user ? (
        <div>
          <span>Logged in as {user.email}</span>
          <button onClick={logout} style={{ marginLeft: "10px", cursor: "pointer" }}>Logout</button>
        </div>
      ) : (
        <Link to="/login" style={{ color: "#fff", textDecoration: "none" }}>Login</Link>
      )}
        <Link
          to={"/bids"}
          className="font-bold  text-xl text-blue-800 hover:text-gray-600"
        >
          bids
        </Link>
        <Link
          to={"/items"}
          className="font-bold  text-xl text-blue-800 hover:text-gray-600"
        >
          items
        </Link>
      </div>
    </div>
  );
}
