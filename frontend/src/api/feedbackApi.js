import axios from "axios";

const API_URL =
    "https://campuspulse-ai-q2ui.onrender.com/api/feedback";


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
        `${API_URL}/analytics`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch analytics");
    }

    return await response.json();
};


// Get feedback list
export const getFeedbacks = async () => {
    const response = await fetch(
        API_URL
    );

    if (!response.ok) {
        throw new Error("Failed to fetch feedback");
    }

    return await response.json();
};