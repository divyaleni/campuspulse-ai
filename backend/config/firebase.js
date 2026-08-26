
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const fs = require("fs");

// Use Render Secret File in production,
// local JSON file during local development.
let serviceAccount;

if (fs.existsSync("/etc/secrets/firebase-service-account.json")) {
    // Render
    serviceAccount = require("/etc/secrets/firebase-service-account.json");
} else {
    // Local Windows development
    serviceAccount = require("../credentials/firebase-service-account.json");
}

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

console.log("Firebase Admin initialized successfully ✅");

module.exports = {
    db
};






