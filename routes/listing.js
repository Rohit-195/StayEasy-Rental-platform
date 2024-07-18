const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");

const listingController = require("../controllers/listing.js");
const multer  = require('multer')
const {storage} = require("../cloudconfig.js")
const upload = multer({ storage })


router.route("/")
.get(wrapAsync(listingController.index)) //Index Route
.post(
  isLoggedIn,                       //create Route
  upload.single('listing[image]'),
  validateListing,
  wrapAsync(listingController.createListing)
);

router.route("/new")                 
.get(isLoggedIn, listingController.renderNewForm);  //new route

router.route("/:id")
.get(wrapAsync(listingController.showListing)) //Show Route
.put( 
    isLoggedIn,                               //Update Route
    isOwner,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.updateListing))
.delete(
    isLoggedIn,                           //Delete Route
    isOwner,
    wrapAsync(listingController.destroyListing)
);


// Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;