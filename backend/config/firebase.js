const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = require("../credentials/firebase-service-account.json");

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

console.log("Firebase Admin initialized successfully ✅");

module.exports = {
    db
};


