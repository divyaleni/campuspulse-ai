const { db } = require("../config/firebase");

const getAnalytics = async (req, res) => {

    try {

        const snapshot = await db
            .collection("feedbacks")
            .get();


        let total = 0;
        let positive = 0;
        let negative = 0;
        let neutral = 0;

        const categoryStats = {};


        snapshot.forEach((doc) => {

            const data = doc.data();

            total++;


            // ==========================================
            // SENTIMENT COUNT
            // ==========================================

            if (data.sentiment === "Positive") {
                positive++;
            }

            else if (data.sentiment === "Negative") {
                negative++;
            }

            else if (data.sentiment === "Neutral") {
                neutral++;
            }


            // ==========================================
            // CATEGORY COUNT
            // ==========================================

            const category =
                data.category || "General";


            if (!categoryStats[category]) {

                categoryStats[category] = {
                    total: 0,
                    positive: 0,
                    negative: 0,
                    neutral: 0
                };

            }


            categoryStats[category].total++;


            if (data.sentiment === "Positive") {

                categoryStats[category].positive++;

            }

            else if (data.sentiment === "Negative") {

                categoryStats[category].negative++;

            }

            else if (data.sentiment === "Neutral") {

                categoryStats[category].neutral++;

            }

        });


        // ==========================================
        // RESPONSE
        // ==========================================

        res.json({

            success: true,

            total: total,

            sentiment: {

                positive: positive,

                negative: negative,

                neutral: neutral

            },

            categories: categoryStats

        });


    } catch (error) {

        console.error(
            "Analytics error:",
            error
        );


        res.status(500).json({

            success: false,

            message: "Failed to generate analytics"

        });

    }

};


module.exports = {
    getAnalytics
};