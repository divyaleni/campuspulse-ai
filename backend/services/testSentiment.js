const {
    analyzeSentiment
} = require("./sentimentService");


const feedback1 =
    "The computers in Lab 3 are very slow and it affected our practical session.";

const feedback2 =
    "The event was excellent and very useful.";

const feedback3 =
    "The practical session was conducted in Lab 3.";


console.log("\nFeedback 1:");
console.log(analyzeSentiment(feedback1));


console.log("\nFeedback 2:");
console.log(analyzeSentiment(feedback2));


console.log("\nFeedback 3:");
console.log(analyzeSentiment(feedback3));