const Reservation = require("../models/Reservation");
const Table = require("../models/Table");

// Create Reservation
const createReservation = async (req, res) => {
  try {
    const { reservationDate, timeSlot, numberOfGuests } = req.body;

    // Find a table that can accommodate the guests
    const availableTable = await Table.findOne({
      capacity: { $gte: numberOfGuests },
    }).sort({ capacity: 1 });

    if (!availableTable) {
      return res.status(404).json({
        message: "No suitable table available",
      });
    }

    // Check if the table is already booked
    const existingReservation = await Reservation.findOne({
      table: availableTable._id,
      reservationDate,
      timeSlot,
      status: "Booked",
    });

    if (existingReservation) {
      return res.status(400).json({
        message: "Table already booked for this time slot",
      });
    }

    // Create reservation
    const reservation = await Reservation.create({
      user: req.user._id,
      table: availableTable._id,
      reservationDate,
      timeSlot,
      numberOfGuests,
    });

    res.status(201).json({
      message: "Reservation created successfully",
      reservation,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get My Reservations
const getMyReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({
      user: req.user._id,
    })
      .populate("table")
      .sort({ createdAt: -1 });

    res.json(reservations);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Cancel Reservation
const cancelReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found",
      });
    }

    if (reservation.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    reservation.status = "Cancelled";

    await reservation.save();

    res.json({
      message: "Reservation cancelled",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("user", "name email")
      .populate("table")
      .sort({ createdAt: -1 });

    res.json(reservations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createReservation,
  getMyReservations,
  cancelReservation,
  getAllReservations,
};