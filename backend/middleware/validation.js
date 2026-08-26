const allowedCategories = [
    "Event",
    "Course",
    "Facility"
];

const validateFeedback = (req, res, next) => {

    const {
        category,
        feedbackText,
        anonymous
    } = req.body;


    // Check feedback text

    if (!feedbackText || typeof feedbackText !== "string") {

        return res.status(400).json({
            success: false,
            message: "Feedback text is required"
        });

    }


    // Remove unnecessary spaces

    const cleanedText = feedbackText.trim();


    // Minimum length

    if (cleanedText.length < 5) {

        return res.status(400).json({
            success: false,
            message: "Feedback must contain at least 5 characters"
        });

    }


    // Maximum length

    if (cleanedText.length > 1000) {

        return res.status(400).json({
            success: false,
            message: "Feedback cannot exceed 1000 characters"
        });

    }


    // Check category

    if (!category || !allowedCategories.includes(category)) {

        return res.status(400).json({
            success: false,
            message: "Invalid feedback category"
        });

    }


    // Check anonymous field

    if (
        anonymous !== undefined &&
        typeof anonymous !== "boolean"
    ) {

        return res.status(400).json({
            success: false,
            message: "Anonymous must be true or false"
        });

    }


    // Replace with cleaned text

    req.body.feedbackText = cleanedText;


    next();

};


module.exports = validateFeedback;