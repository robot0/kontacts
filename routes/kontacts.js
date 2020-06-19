const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const Kontact = require("../models/Kontact");

// @route   GET api/kontacts
// @desc    Gets all Users' contacts
// @access  Private
router.get("/", auth, async (req, res) => {
    try {
        const kontacts = await Kontact.find({ user: req.user.id }).sort({ date: -1 });
        res.json(kontacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   POST api/kontacts
// @desc    Add new contact
// @access  Private
router.post(
    "/",
    [auth, [check("name", "Name is required").not().isEmpty()]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, phone, type } = req.body;

        try {
            const newKontact = new Kontact({
                name,
                email,
                phone,
                type,
                user: req.user.id,
            });
            const kontact = await newKontact.save();
            res.json(kontact);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

// @route   PUT api/kontacts/:id
// @desc    Updates contact
// @access  Private
router.put("/:id", auth, async (req, res) => {
    const { name, email, phone, type } = req.body;

    // Build Kontact Object
    const kontactFields = {};
    if (name) kontactFields.name = name;
    if (email) kontactFields.email = email;
    if (phone) kontactFields.phone = phone;
    if (type) kontactFields.type = type;

    try {
        let kontact = await Kontact.findById(req.params.id);

        if (!kontact) return res.status(404).json({ msg: "Contact not found." });

        // Makes sure User owns contact
        if (kontact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorized" });
        }

        kontact = await Kontact.findByIdAndUpdate(
            req.params.id,
            { $set: kontactFields },
            { new: true }
        );

        res.json(kontact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   DELETE api/kontacts/:id
// @desc    Deletes contact
// @access  Private
router.delete("/:id", auth, async (req, res) => {
    try {
        let kontact = await Kontact.findById(req.params.id);

        if (!kontact) return res.status(404).json({ msg: "Contact not found." });

        // Makes sure User owns contact
        if (kontact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorized" });
        }

        await Kontact.findByIdAndRemove(req.params.id);

        res.json({ msg: "Contact removed" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
