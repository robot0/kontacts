const express = require("express");

const app = express();

app.get("/", (req, res) => res.json({ msg: "Welcome to the Kontact Api" }));

// Defining Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/kontacts", require("./routes/kontacts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
