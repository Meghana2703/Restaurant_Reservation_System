import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        padding: "15px",
        background: "#333",
        display: "flex",
        gap: "20px",
      }}
    >
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        Home
      </Link>

      <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
        Login
      </Link>

      <Link to="/register" style={{ color: "white", textDecoration: "none" }}>
        Register
      </Link>

      <Link to="/book" style={{ color: "white", textDecoration: "none" }}>
        Book Table
      </Link>

      <Link
        to="/my-reservations"
        style={{ color: "white", textDecoration: "none" }}
      >
        My Reservations
      </Link>

      <Link to="/admin" style={{ color: "white", textDecoration: "none" }}>
        Admin
      </Link>
    </nav>
  );
}

export default Navbar;