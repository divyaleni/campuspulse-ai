// ==========================================
// CAMPUSPULSE AI - API SERVICE
// ==========================================

// Change this ONE value when your friend
// gives you the deployed backend URL.

const API_BASE_URL = "http://localhost:5000/api";


// ==========================================
// COMMON API REQUEST FUNCTION
// ==========================================

async function apiRequest(endpoint, options = {}) {

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      },

      ...options
    }
  );


  // Convert response to JSON

  const data = await response.json();


  // Handle backend errors

  if (!response.ok) {

    throw new Error(
      data.message || "Something went wrong"
    );

  }


  return data;
}


// ==========================================
// AUTHENTICATION
// ==========================================

export async function loginUser(email, password) {

  return apiRequest("/auth/login", {

    method: "POST",

    body: JSON.stringify({
      email,
      password
    })

  });

}


// ==========================================
// SUBMIT FEEDBACK
// ==========================================

export async function submitFeedback(feedbackData) {

  return apiRequest("/feedback", {

    method: "POST",

    body: JSON.stringify(feedbackData)

  });

}


// ==========================================
// GET ALL FEEDBACK
// ADMIN ONLY
// ==========================================

export async function getFeedback() {

  return apiRequest("/feedback", {

    method: "GET"

  });

}


// ==========================================
// GET DASHBOARD ANALYTICS
// ADMIN ONLY
// ==========================================

export async function getDashboardAnalytics() {

  return apiRequest("/analytics", {

    method: "GET"

  });

}


// ==========================================
// EXPORT
// ==========================================

export default {

  loginUser,
  submitFeedback,
  getFeedback,
  getDashboardAnalytics

};