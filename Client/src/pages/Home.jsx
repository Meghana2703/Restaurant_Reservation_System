import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const token = localStorage.getItem("token");

  return (
    <div className="home">
      <div className="hero">
        <h1>🍽️ <i>TabLa Restaurant Reservation</i></h1>

        <p>
          Reserve your favorite table in just a few clicks.
          Fast, secure, and hassle-free.
        </p>

        <div className="buttons">
          {token ? (
            <>
              <Link to="/book">
                <button className="primary-btn">
                  Book a Table
                </button>
              </Link>

              <Link to="/my-reservations">
                <button className="secondary-btn">
                  My Reservations
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="primary-btn">
                  Login
                </button>
              </Link>

              <Link to="/register">
                <button className="secondary-btn">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="features">
        <div className="card">
          <h2>🍴 Easy Booking</h2>
          <p>
            Book restaurant tables instantly with your preferred date and time.
          </p>
        </div>

        <div className="card">
          <h2>🔒 Secure Login</h2>
          <p>
            JWT-based authentication keeps your account and reservations secure.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;