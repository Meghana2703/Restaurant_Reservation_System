const express = require("express");
const {
  createReservation,
  getMyReservations,
  cancelReservation,
  getAllReservations,
  adminCancelReservation,
  adminUpdateReservation,
  getDashboardStats,
  getReservationsByDate,
} = require("../controllers/reservationController");

const { protect ,admin} = require("../middleware/authMiddleware");

const router = express.Router();

// Create reservation
router.post("/", protect, createReservation);

// Get logged-in user reservations
router.get("/my", protect, getMyReservations);
router.get("/date/:date", protect, admin, getReservationsByDate);
router.get("/", protect, admin, getAllReservations);
// Cancel reservation
router.get("/stats", protect, admin, getDashboardStats);
router.put("/admin/:id/cancel", protect,admin, adminCancelReservation);

router.put(
  "/admin/:id",
  protect,
  admin,
  adminUpdateReservation
);
router.put("/:id/cancel", protect, cancelReservation);
module.exports = router;