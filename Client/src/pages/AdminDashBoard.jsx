import { useEffect, useState } from "react";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [reservations, setReservations] = useState([]);

  const [stats, setStats] = useState({
    totalReservations: 0,
    bookedReservations: 0,
    cancelledReservations: 0,
  });

  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [editData, setEditData] = useState({
    reservationDate: "",
    timeSlot: "",
    numberOfGuests: "",
  });

  useEffect(() => {
    fetchReservations();
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
      "https://restaurant-reservation-system-3lf4.onrender.com/api/reservations/stats" ,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStats(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReservations = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
      "https://restaurant-reservation-system-3lf4.onrender.com/api/reservations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setReservations(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchReservationsByDate = async (date) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `https://restaurant-reservation-system-3lf4.onrender.com/api/reservations/date/${date}`,
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
        `https://restaurant-reservation-system-3lf4.onrender.com/api/reservations/admin/${id}/cancel`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        fetchReservations();
        fetchStats();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const startEditing = (reservation) => {
    setEditingId(reservation._id);

    setEditData({
      reservationDate: reservation.reservationDate.split("T")[0],
      timeSlot: reservation.timeSlot,
      numberOfGuests: reservation.numberOfGuests,
    });
  };

  const saveReservation = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
       `https://restaurant-reservation-system-3lf4.onrender.com/api/reservations/admin/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setEditingId(null);
        fetchReservations();
        fetchStats();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ marginBottom: "20px" }}>
        Admin Dashboard
      </h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            background: "#4CAF50",
            color: "white",
            padding: "20px",
            borderRadius: "10px",
            width: "220px",
            textAlign: "center",
          }}
        >
          <h3>Total Reservations</h3>
          <h1>{stats.totalReservations}</h1>
        </div>

        <div
          style={{
            background: "#2196F3",
            color: "white",
            padding: "20px",
            borderRadius: "10px",
            width: "220px",
            textAlign: "center",
          }}
        >
          <h3>Booked</h3>
          <h1>{stats.bookedReservations}</h1>
        </div>

        <div
          style={{
            background: "#f44336",
            color: "white",
            padding: "20px",
            borderRadius: "10px",
            width: "220px",
            textAlign: "center",
          }}
        >
          <h3>Cancelled</h3>
          <h1>{stats.cancelledReservations}</h1>
        </div>
      </div>

      <div style={{ margin: "20px 0" }}>
  <input
    type="text"
    placeholder="Search by customer name or email..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{
      width: "100%",
      padding: "12px",
      fontSize: "16px",
      border: "2px solid #2196F3",
      borderRadius: "8px",
      backgroundColor: "#fff",
      color: "#000",
    }}
  />
</div>
<div style={{ marginBottom: "25px" }}>
  <label>
    <strong>Filter by Date:</strong>
  </label>

  <br />
  <br />

  <input
    type="date"
    value={selectedDate}
    onChange={(e) => {
      const date = e.target.value;
      setSelectedDate(date);

      if (date) {
        fetchReservationsByDate(date);
      } else {
        fetchReservations();
      }
    }}
    style={{
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid #ccc",
    }}
  />

  {selectedDate && (
    <button
      style={{
        marginLeft: "15px",
        padding: "10px 15px",
      }}
      onClick={() => {
        setSelectedDate("");
        fetchReservations();
      }}
    >
      Clear Filter
    </button>
  )}
</div>
      {reservations.length === 0 ? (
        <h3>No Reservations Found</h3>
      ) : (
        reservations
          .filter((reservation) => {
            const name =
              reservation.user?.name?.toLowerCase() || "";
            const email =
              reservation.user?.email?.toLowerCase() || "";

            return (
              name.includes(search.toLowerCase()) ||
              email.includes(search.toLowerCase())
            );
          })
          .map((reservation) => (
                        <div
              key={reservation._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "20px",
                marginBottom: "20px",
                background: "#fafafa",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <p>
                <strong>Customer:</strong> {reservation.user?.name}
              </p>

              <p>
                <strong>Email:</strong> {reservation.user?.email}
              </p>

              <p>
                <strong>Table:</strong> {reservation.table?.tableNumber}
              </p>

              {editingId === reservation._id ? (
                <>
                  <p>
                    <strong>Date</strong>
                  </p>

                  <input
                    type="date"
                    value={editData.reservationDate}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        reservationDate: e.target.value,
                      })
                    }
                  />

                  <br />
                  <br />

                  <p>
                    <strong>Time Slot</strong>
                  </p>

                  <input
                    type="text"
                    value={editData.timeSlot}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        timeSlot: e.target.value,
                      })
                    }
                  />

                  <br />
                  <br />

                  <p>
                    <strong>Guests</strong>
                  </p>

                  <input
                    type="number"
                    value={editData.numberOfGuests}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        numberOfGuests: e.target.value,
                      })
                    }
                  />

                  <br />
                  <br />
                </>
              ) : (
                <>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(
                      reservation.reservationDate
                    ).toLocaleDateString()}
                  </p>

                  <p>
                    <strong>Time Slot:</strong>{" "}
                    {reservation.timeSlot}
                  </p>

                  <p>
                    <strong>Guests:</strong>{" "}
                    {reservation.numberOfGuests}
                  </p>
                </>
              )}

              <p>
                <strong>Status:</strong>{" "}
                <span
                  style={{
                    color:
                      reservation.status === "Booked"
                        ? "green"
                        : "red",
                    fontWeight: "bold",
                  }}
                >
                  {reservation.status}
                </span>
              </p>

              {editingId === reservation._id ? (
                <>
                  <button
                    onClick={() =>
                      saveReservation(reservation._id)
                    }
                    style={{
                      marginRight: "10px",
                      padding: "8px 15px",
                    }}
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setEditingId(null)}
                    style={{
                      padding: "8px 15px",
                    }}
                  >
                    Cancel Edit
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() =>
                      startEditing(reservation)
                    }
                    style={{
                      marginRight: "10px",
                      padding: "8px 15px",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      cancelReservation(
                        reservation._id
                      )
                    }
                    disabled={
                      reservation.status === "Cancelled"
                    }
                    style={{
                      padding: "8px 15px",
                    }}
                  >
                    Cancel Reservation
                  </button>
                </>
              )}
            </div>
          ))
      )}
    </div>
  );
}

export default AdminDashboard;