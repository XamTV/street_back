const uploadPicture = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: "Aucun fichier reçu" });
  }

  res.status(201).json({
    msg: "Upload réussi",
    url: req.file.path, // URL Cloudinary directe
  });
};

module.exports = { uploadPicture };
