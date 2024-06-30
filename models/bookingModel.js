const mongoose = require("mongoose");

const BookingSchema = mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    hostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "listing",
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("bookings", BookingSchema);
module.exports = Booking;
