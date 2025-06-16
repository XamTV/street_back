const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const {
  browse,
  read,
  edit,
  add,
  destroy,
} = require("../../../controllers/contactsActions");

// Route to get a list of items
router.get("/", browse);

// Route to get a specific item by ID
router.get("/:id", read);

// Route to edit a new item
router.put("/", edit);

// Route to add a new item
router.post("/", add);

// Route to delete an item
router.delete("/:id", destroy);

/* ************************************************************************* */

module.exports = router;