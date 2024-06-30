const users = require("../models/userModel");
const Listing = require("../models/listingModel");
const Booking = require("../models/bookingModel");

exports.TripListController = async (req, res) => {
  console.log("Inside trip list controller");
  try {
    const { userId } = req.params;
    const trips = await Booking.find({ customerId: userId }).populate(
      "customerId hostId listingId"
    );
    res.status(200).json(trips);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Cannot find trips!", error: err.message });
  }
};

exports.WishListController = async (req, res) => {
  console.log("Inside Wish list controller");
  try {
    const { userId, listingId } = req.params;
    const user = await users.findById(userId);
    const listing = await Listing.findById(listingId);

    if (!user || !listing) {
      return res.status(404).json({ message: "User or Listing not found" });
    }

    const favoriteListing = user.wishList.find(
      (item) => item._id.toString() === listingId
    );
    if (favoriteListing) {
      user.wishList = user.wishList.filter(
        (item) => item._id.toString() !== listingId
      );
    } else {
      user.wishList.push(listing);
    }

    await user.save();
    res
      .status(200)
      .json({ message: "Wish list updated", wishList: user.wishList });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Cannot update wish list", error: err.message });
  }
};

exports.PropertyListController = async (req, res) => {
  console.log("Inside Property list controller");
  try {
    const { userId } = req.params;
    const properties = await Listing.find({ creator: userId }).populate(
      "creator"
    );
    res.status(200).json(properties);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Cannot find Property!", error: err.message });
  }
};

exports.ReservationListController = async (req, res) => {
  console.log("Inside Reservation list controller");
  try {
    const { userId } = req.params;
    const reservation = await Booking.find({ hostId: userId }).populate(
      "customerId hostId listingId"
    );
    res.status(200).json(reservation);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Cannot find Reservation!", error: err.message });
  }
};
