const express = require("express");

const {
    submitFeedback,
    getFeedback
} = require("../controllers/feedbackController");

const {
    getAnalytics
} = require("../controllers/analyticsController");

const validateFeedback =
    require("../middleware/validation");

const router = express.Router();


// ==========================================
// TEST
// ==========================================

router.get("/test", (req, res) => {

    res.json({

        success: true,

        message: "Feedback API is working"

    });

});


// ==========================================
// ANALYTICS
// ==========================================

router.get(
    "/analytics",
    getAnalytics
);
router.get(
    "/",
    getFeedback
);

// ==========================================
// SUBMIT FEEDBACK
// ==========================================

router.post(
    "/",
    validateFeedback,
    submitFeedback
);


module.exports = router;