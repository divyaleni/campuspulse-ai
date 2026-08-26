```js
const { db } = require("../config/firebase");

const {
    analyzeSentiment
} = require("../services/sentimentService");


// ==========================================
// SUBMIT FEEDBACK
// ==========================================

const submitFeedback = async (req, res) => {
    try {

        const {
            category,
            target,
            feedbackText,
            anonymous
        } = req.body;


        // ==========================================
        // STUDENT IDENTIFICATION
        // ==========================================

        const userId =
            req.user?.uid ||
            req.body.userId ||
            req.ip;


        // ==========================================
        // 24-HOUR COOLDOWN CHECK
        // ==========================================

        const existingSnapshot = await db
            .collection("feedbacks")
            .where("userId", "==", userId)
            .get();

        const now = Date.now();

        const cooldown =
            24 * 60 * 60 * 1000;


        const recentSubmission =
            existingSnapshot.docs.find((doc) => {

                const data = doc.data();

                if (
                    data.category !== category ||
                    data.target !== target ||
                    !data.createdAt
                ) {
                    return false;
                }


                let createdTime;

                if (
                    data.createdAt &&
                    typeof data.createdAt.toDate === "function"
                ) {
                    createdTime =
                        data.createdAt.toDate().getTime();
                } else {
                    createdTime =
                        new Date(data.createdAt).getTime();
                }


                return (
                    now - createdTime < cooldown
                );
            });


        if (recentSubmission) {

            return res.status(429).json({

                success: false,

                message:
                    "You have already submitted feedback for this event, course, or facility within the last 24 hours."

            });
        }


        // ==========================================
        // SENTIMENT ANALYSIS
        // ==========================================

        const sentimentResult =
            analyzeSentiment(feedbackText);


        // ==========================================
        // ENSURE VALID SENTIMENT
        // ==========================================

        const allowedSentiments = [
            "Positive",
            "Negative",
            "Neutral"
        ];

        const sentimentLabel =
            allowedSentiments.includes(
                sentimentResult.label
            )
                ? sentimentResult.label
                : "Neutral";


        // ==========================================
        // SAVE TO FIRESTORE
        // ==========================================

        const feedbackRef = await db
            .collection("feedbacks")
            .add({

                category: category,

                target: target || "",

                feedbackText: feedbackText,

                anonymous:
                    anonymous ?? true,

                userId: userId,

                sentiment:
                    sentimentLabel,

                sentimentScore:
                    sentimentResult.score,

                positiveWords:
                    sentimentResult.positiveWords || [],

                negativeWords:
                    sentimentResult.negativeWords || [],

                classificationStatus:
                    "classified",

                createdAt: new Date()

            });


        // ==========================================
        // RESPONSE
        // ==========================================

        res.status(201).json({

            success: true,

            message:
                "Feedback analyzed and saved successfully",

            feedbackId:
                feedbackRef.id,

            sentiment:
                sentimentLabel,

            score:
                sentimentResult.score

        });


    } catch (error) {

        console.error(
            "Feedback processing error:",
            error
        );

        res.status(500).json({

            success: false,

            message: error.message

        });
    }
};


// ==========================================
// GET FEEDBACK
// ==========================================

const getFeedback = async (req, res) => {

    try {

        const snapshot = await db
            .collection("feedbacks")
            .orderBy("createdAt", "desc")
            .get();


        const feedback = [];


        snapshot.forEach((doc) => {

            const data = doc.data();

            feedback.push({

                id: doc.id,

                category:
                    data.category,

                target:
                    data.target || "",

                feedbackText:
                    data.feedbackText,

                anonymous:
                    data.anonymous,

                sentiment:
                    data.sentiment,

                sentimentScore:
                    data.sentimentScore,

                classificationStatus:
                    data.classificationStatus ||
                    "classified",

                positiveWords:
                    data.positiveWords || [],

                negativeWords:
                    data.negativeWords || [],

                createdAt:
                    data.createdAt

            });

        });


        res.json({

            success: true,

            count: feedback.length,

            feedback: feedback

        });


    } catch (error) {

        console.error(
            "Get feedback error:",
            error
        );

        res.status(500).json({

            success: false,

            message: error.message

        });

    }
};


// ==========================================
// EXPORT
// ==========================================

module.exports = {

    submitFeedback,

    getFeedback

};
```
