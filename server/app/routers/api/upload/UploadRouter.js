const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("../../../../cloudinary");
const { uploadPicture } = require("../../../controllers/uploadActions");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploadedPictures", // nom du dossier dans Cloudinary
    allowed_formats: ["jpg", "png", "webp"],
    transformation: [{ width: 1000, crop: "limit" }],
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post("/", upload.single("file"), uploadPicture);

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions

// Route to upload an item

/* ************************************************************************* */

module.exports = router;
