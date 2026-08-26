const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./config/firebase");

const feedbackRoutes = require("./routes/feedbackRoutes");

const app = express();

app.use(cors());
app.use(express.json());


// Feedback API
app.use("/api/feedback", feedbackRoutes);


// Home route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "CampusPulse AI Backend is running"
    });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`CampusPulse AI Backend running on port ${PORT}`);
});