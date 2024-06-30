const router = require("express").Router();
const authController = require("../controllers/authController");
const listingController = require("../controllers/listingController");
const bookingController = require("../controllers/bookingController");
const userTripWishController = require("../controllers/userControler");
const multerMiddleware = require("../middlewares/multerMiddleware");

router.post(
  "/register",
  multerMiddleware.single("profileImg"),
  authController.registerController
);

router.post("/login", authController.loginController);

router.post(
  "/properties/create",
  multerMiddleware.array("listingPhotos"),
  listingController.listingFullController
);

router.get("/properties", listingController.listingByCategoryController);

router.get(
  "/properties/search/:search",
  listingController.listingBySearchController
);

router.get("/properties/:id", listingController.listingByIDController);

router.post("/bookings/create", bookingController.BookingDataController);

router.get("/users/:userId/trips", userTripWishController.TripListController);

router.patch(
  "/users/:userId/:listingId",
  userTripWishController.WishListController
);

router.get(
  "/users/:userId/properties",
  userTripWishController.PropertyListController
);

router.get(
  "/users/:userId/reservations",
  userTripWishController.ReservationListController
);

module.exports = router;
