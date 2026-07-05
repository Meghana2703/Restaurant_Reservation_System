import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../App.css";

function Navbar() {
  const navigate = useNavigate();

  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    alert("Logged out successfully");
    navigate("/login");
  };

  return (
  <div className="navbar">
    <h2 className="logo">Restaurant</h2>

    <div className="nav-links">
      <Link to="/">Home</Link>

      {!user && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}

      {user && (
        <>
          <Link to="/book">Book</Link>
          <Link to="/my-reservations">My Reservations</Link>

          {user.role === "admin" && (
            <Link to="/admin">Admin</Link>
          )}

          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  </div>
);
}

export default Navbar;