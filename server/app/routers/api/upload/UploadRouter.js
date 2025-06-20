const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("../../../../cloudinary"); // ton fichier config

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

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions

router.post("/", upload.single("file"), (req, res) => {
  res.status(201).json({
    msg: "Upload réussi",
    url: req.file.path, // URL Cloudinary directe
  });
});

// Route to upload an item

/* ************************************************************************* */

module.exports = router;
