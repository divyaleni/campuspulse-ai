const Sentiment = require("sentiment");

const sentiment = new Sentiment();

const analyzeSentiment = (text) => {

    const result = sentiment.analyze(text);

    const lowerText = text.toLowerCase();

    // Campus-specific negative phrases
    const negativeKeywords = [
        "slow",
        "very slow",
        "poor",
        "bad",
        "worst",
        "problem",
        "problems",
        "issue",
        "issues",
        "difficult",
        "failure",
        "failed",
        "broken",
        "not working",
        "unable",
        "delay",
        "delayed",
        "late",
        "affected",
        "uncomfortable",
        "insufficient",
        "lack",
        "shortage",
        "crowded",
        "dirty"
    ];

    // Campus-specific positive phrases
    const positiveKeywords = [
        "excellent",
        "great",
        "good",
        "useful",
        "helpful",
        "amazing",
        "comfortable",
        "clean",
        "fast",
        "improved",
        "improvement",
        "satisfied",
        "excellent service"
    ];


    let extraNegativeScore = 0;
    let extraPositiveScore = 0;

    const detectedNegative = [];
    const detectedPositive = [];


    // Detect negative keywords

    negativeKeywords.forEach((word) => {

        if (lowerText.includes(word)) {

            extraNegativeScore -= 2;

            detectedNegative.push(word);

        }

    });


    // Detect positive keywords

    positiveKeywords.forEach((word) => {

        if (lowerText.includes(word)) {

            extraPositiveScore += 2;

            detectedPositive.push(word);

        }

    });


    const finalScore =
        result.score +
        extraNegativeScore +
        extraPositiveScore;


    let label;

    if (finalScore > 1) {

        label = "Positive";

    } else if (finalScore < -1) {

        label = "Negative";

    } else {

        label = "Neutral";

    }


    const allowedLabels = [
    "Positive",
    "Negative",
    "Neutral"
];


// Safety check
if (!allowedLabels.includes(label)) {
    label = "Neutral";
}


return {
    label: label,
    score: finalScore,
    positiveWords: [
        ...result.positive,
        ...detectedPositive
    ],
    negativeWords: [
        ...result.negative,
        ...detectedNegative
    ]
};

};


module.exports = {
    analyzeSentiment
};