const mongoose = require("mongoose");

const KontactSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
    },
    type: {
        type: String,
        default: "personal",
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("kontact", KontactSchema);
