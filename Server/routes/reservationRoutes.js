const express = require("express");
const {
  createReservation,
  getMyReservations,
  cancelReservation,
  getAllReservations,
} = require("../controllers/reservationController");

const { protect ,admin} = require("../middleware/authMiddleware");

const router = express.Router();

// Create reservation
router.post("/", protect, createReservation);

// Get logged-in user reservations
router.get("/my", protect, getMyReservations);
router.get("/", protect, admin, getAllReservations);
// Cancel reservation
router.put("/:id/cancel", protect, cancelReservation);


module.exports = router;