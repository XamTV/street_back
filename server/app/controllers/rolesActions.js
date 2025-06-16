// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all roles from the database
    const roles = await tables.roles.readAll();

    // Respond with the roles in JSON format
    res.json(roles);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific role from the database based on the provided ID
    const role = await tables.roles.read(req.params.id);

    // If the role is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the role in JSON format
    if (role == null) {
      res.sendStatus(404);
    } else {
      res.json(role);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation

const edit = async (req, res, next) => {
  // Extract the category data from the request body and params
  const role = { ...req.body, id: req.params.id };

  try {
    // Update the category in the database
    await tables.roles.update(role);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the role data from the request body
  const role = req.body;

  try {
    // Insert the role into the database
    const insertId = await tables.roles.create(role);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted role
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation

const destroy = async (req, res, next) => {
  try {
    // Delete the category from the database
    await tables.roles.delete(req.params.id);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};