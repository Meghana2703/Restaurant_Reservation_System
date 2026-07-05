import { useState } from "react";
import "./Booking.css";

function BookTable() {
  const [reservationDate, setReservationDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "https://restaurant-reservation-system-3lf4.onrender.com/api/reservations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            reservationDate,
            timeSlot,
            numberOfGuests,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Reservation Created Successfully");

        console.log(data);

        setReservationDate("");
        setTimeSlot("");
        setNumberOfGuests("");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

return (
  <div className="booking-container">
    <div className="booking-card">
      <h2>Book Table</h2>

      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Reservation Date</label>
          <input
            type="date"
            value={reservationDate}
            onChange={(e) => setReservationDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Time Slot</label>
          <input
            type="text"
            placeholder="Example: 7:00 PM"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Number of Guests</label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(e.target.value)}
            required
          />
        </div>

        <button type="submit">Book Table</button>
      </form>
    </div>
  </div>
);
}

export default BookTable;