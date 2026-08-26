import axios from "axios";

const API_URL = "http://localhost:5000/api/feedback";


// Submit feedback
export const submitFeedback = async (feedbackData) => {

    const response = await axios.post(
        API_URL,
        feedbackData
    );

    return response.data;
};


// Get all feedback
export const getFeedback = async () => {

    const response = await axios.get(
        API_URL
    );

    return response.data;
};


// Get analytics
export const getAnalytics = async () => {

    const response = await fetch(
        "http://localhost:5000/api/feedback/analytics"
    );

    if (!response.ok) {
        throw new Error("Failed to fetch analytics");
    }

    return await response.json();
};
export const getFeedbacks = async () => {
    const response = await fetch(
        "http://localhost:5000/api/feedback"
    );

    if (!response.ok) {
        throw new Error("Failed to fetch feedback");
    }

    return await response.json();
};