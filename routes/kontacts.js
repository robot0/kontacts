const express = require("express");
const router = express.Router();

// @route   GET api/kontacts
// @desc    Gets all Users' contacts
// @access  Private
router.get("/", (req, res) => {
    res.send("Get all contacts");
});

// @route   POST api/kontacts
// @desc    Add new contact
// @access  Private
router.post("/", (req, res) => {
    res.send("Add contacts");
});

// @route   PUT api/kontacts/:id
// @desc    Updates contact
// @access  Private
router.put("/:id", (req, res) => {
    res.send("Update contact");
});

// @route   DELETE api/kontacts/:id
// @desc    Deletes contact
// @access  Private
router.delete("/:id", (req, res) => {
    res.send("Delete contact");
});

module.exports = router;
