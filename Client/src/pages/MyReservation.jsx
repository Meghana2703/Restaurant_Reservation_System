import { useEffect, useState } from "react";

function MyReservations() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "http://localhost:5000/api/reservations/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setReservations(data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancelReservation = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:5000/api/reservations/${id}/cancel`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Reservation Cancelled Successfully");
        fetchReservations();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="my-container">
      <h2 className="my-title">My Reservations</h2>

      {reservations.length === 0 ? (
        <p>No Reservations Found</p>
      ) : (
        reservations.map((reservation) => (
          <div key={reservation._id}>
            <hr />

            <p>
              <strong>Date:</strong>{" "}
              {new Date(reservation.reservationDate).toLocaleDateString()}
            </p>

            <p>
              <strong>Time Slot:</strong> {reservation.timeSlot}
            </p>

            <p>
              <strong>Guests:</strong> {reservation.numberOfGuests}
            </p>

            <p>
              <strong>Status:</strong> {reservation.status}
            </p>

            <p>
              <strong>Table Number:</strong>{" "}
              {reservation.table?.tableNumber}
            </p>

            <button
              onClick={() => cancelReservation(reservation._id)}
              disabled={reservation.status === "Cancelled"}
            >
              {reservation.status === "Cancelled"
                ? "Already Cancelled"
                : "Cancel Reservation"}
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default MyReservations;