const listing = require("../models/listingModel");
const User = require("../models/userModel");

exports.listingFullController = async (req, res) => {
  console.log("inside add listing");
  const {
    creator,
    category,
    type,
    streetAddress,
    aptSuite,
    city,
    province,
    country,
    guestCount,
    bedroomCount,
    bedsCount,
    bathroomCount,
    amenities,
    title,
    description,
    highlight,
    highlightDesc,
    price,
  } = req.body;

  const listingPhotos = req.files;
  console.log(listingPhotos);
  console.log(
    creator,
    category,
    type,
    streetAddress,
    aptSuite,
    city,
    province,
    country,
    guestCount,
    bedroomCount,
    bedsCount,
    bathroomCount,
    amenities,
    title,
    description,
    highlight,
    highlightDesc,
    price,
    listingPhotos
  );
  try {
    if (!listingPhotos || listingPhotos.length === 0) {
      return res.status(400).send("No file uploaded.");
    }

    const listingPhotoPaths = listingPhotos.map((file) => file.path);

    const newListing = new listing({
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedsCount,
      bathroomCount,
      amenities,
      listingPhotoPaths,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    });

    await newListing.save();

    res.status(200).json(newListing);
  } catch (err) {
    res
      .status(409)
      .json({ message: "Failed to create listing", error: err.message });
    console.log(err);
  }
};

exports.listingByCategoryController = async (req, res) => {
  console.log("inside listing by category");
  const qCategory = req.query.category;
  console.log(qCategory);
  try {
    let listings;
    if (qCategory) {
      listings = await listing
        .find({ category: qCategory })
        .populate("creator");
    } else {
      listings = await listing.find().populate("creator");
    }

    res.status(200).json(listings);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Failed to fetch listings", error: err.message });
    console.log(err);
  }
};

exports.listingBySearchController = async (req, res) => {
  console.log("inside listing by search");
  const { search } = req.params;
  try {
    let listings = [];
    if (search === "all") {
      listings = await listing.find().populate("creator");
    } else {
      listings = await listing
        .find({
          $or: [
            { category: { $regex: search, $options: "i" } },
            { title: { $regex: search, $options: "i" } },
          ],
        })
        .populate("creator");
    }

    res.status(200).json(listings);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Fail to fetch listings", error: err.message });
    console.log(err);
  }
};

exports.listingByIDController = async (req, res) => {
  console.log("inside listing by id");
  try {
    const { id } = req.params;
    const Listing = await listing.findById(id).populate("creator");
    res.status(200).json(Listing);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Failed to fetch listing by id", error: err.message });
    console.log(err);
  }
};
