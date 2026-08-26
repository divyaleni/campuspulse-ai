import React, { useState } from "react";
import { submitFeedback as sendFeedback } from "../api/feedbackApi";

function StudentFeedback() {

  const [category, setCategory] = useState("Course");
const [target, setTarget] = useState("");
const [feedback, setFeedback] = useState("");
  const [anonymous, setAnonymous] = useState(true);

  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);


  const handleSubmit = async (e) => {

    e.preventDefault();

    const text = feedback.trim();

    if (text.length < 5) {
      alert("Feedback must contain at least 5 characters.");
      return;
    }

    if (text.length > 1000) {
      alert("Feedback cannot exceed 1000 characters.");
      return;
    }
    if (!target.trim()) {
  alert("Please enter the event, course, or facility name.");
  return;
}

    setStatus("processing");

    try {

      const response = await sendFeedback({
  category: category,
  target: target.trim(),
  feedbackText: text,
  anonymous: anonymous
});
      console.log("Backend response:", response);

      setResult(response);

      setStatus("success");

    } catch (error) {
  console.error("Feedback submission failed:", error);

  setStatus("idle");

  const message =
    error.response?.data?.message ||
    "Unable to submit feedback. Please try again.";

  alert(message);
}

  };


  const resetForm = () => {
  setFeedback("");
  setCategory("Course");
  setTarget("");
  setAnonymous(true);
  setResult(null);
  setStatus("idle");
};


  return (

    <main className="feedback-page">

      <div className="feedback-container">

        {/* HEADER */}

        <div className="feedback-header">

          <div className="ai-badge">
            ✦ AI-POWERED FEEDBACK
          </div>

          <h1>
            Your voice can
            <span> improve campus.</span>
          </h1>

          <p>
            Tell us about your experience.
            Our AI will analyze your feedback and
            help identify areas that need attention.
          </p>

        </div>


        {/* FORM */}

        {status === "idle" && (

          <form
            className="smart-feedback-card"
            onSubmit={handleSubmit}
          >

            <div className="form-section">

              <label>
                What is your feedback about?
              </label>

              <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  <option value="Event">Event</option>
  <option value="Course">Course</option>
  <option value="Facility">Facility</option>
</select>
<div className="form-section">

  <label>
    {category === "Event"
      ? "Event Name"
      : category === "Course"
      ? "Course Name"
      : "Facility Name"}
  </label>

  <input
    type="text"
    value={target}
    onChange={(e) => setTarget(e.target.value)}
    placeholder={
      category === "Event"
        ? "Example: Tech Fest 2026"
        : category === "Course"
        ? "Example: Data Structures"
        : "Example: Lab 3"
    }
    required
  />

</div>

            </div>


            <div className="form-section">

              <div className="label-row">

                <label>
                  Your feedback
                </label>

                <span>
                  {feedback.length}/1000
                </span>

              </div>

              <textarea
                value={feedback}
                onChange={(e) =>
                  setFeedback(e.target.value)
                }
                maxLength={1000}
                rows={9}
                placeholder="Example: The computers in Lab 3 are very slow and it affected our practical session..."
              />

              <div className="textarea-hint">
                Minimum 5 characters
              </div>

            </div>


            {/* ANONYMOUS OPTION */}

            <div className="anonymous-box">

              <div className="anonymous-icon">
                🔒
              </div>

              <div className="anonymous-content">

                <strong>
                  Submit anonymously
                </strong>

                <p>
                  Your identity will not be displayed
                  in the admin feedback dashboard.
                </p>

              </div>

              <label className="switch">

                <input
                  type="checkbox"
                  checked={anonymous}
                  onChange={(e) =>
                    setAnonymous(e.target.checked)
                  }
                />

                <span className="slider"></span>

              </label>

            </div>


            {/* AI PREVIEW */}

            <div className="ai-preview">

              <div className="ai-preview-icon">
                ✦
              </div>

              <div>

                <strong>
                  What happens after you submit?
                </strong>

                <p>
                  AI analyzes sentiment, category,
                  severity and recommends the
                  appropriate campus action.
                </p>

              </div>

            </div>


            <button
              type="submit"
              className="submit-feedback-btn"
            >

              <span>
                Submit Feedback
              </span>

              <span>
                →
              </span>

            </button>

          </form>

        )}


        {/* PROCESSING */}

        {status === "processing" && (

          <div className="analysis-card">

            <div className="analysis-animation">
              ✦
            </div>

            <h2>
              AI is analyzing your feedback
            </h2>

            <p>
              Please wait while CampusPulse
              processes your response.
            </p>

            <div className="analysis-steps">

              <div className="analysis-step active">

                <span>✓</span>

                <div>

                  <strong>
                    Feedback received
                  </strong>

                  <small>
                    Your response is securely stored
                  </small>

                </div>

              </div>


              <div className="analysis-step active">

                <span className="loader"></span>

                <div>

                  <strong>
                    Analyzing sentiment
                  </strong>

                  <small>
                    Detecting positive, negative or neutral
                  </small>

                </div>

              </div>


              <div className="analysis-step">

                <span>3</span>

                <div>

                  <strong>
                    Determining priority
                  </strong>

                  <small>
                    Identifying severity and action
                  </small>

                </div>

              </div>

            </div>

          </div>

        )}


        {/* SUCCESS */}

        {status === "success" && (

          <div className="analysis-card success-result">

            <div className="success-icon-large">
              ✓
            </div>

            <div className="ai-badge">
              ANALYSIS COMPLETE
            </div>

            <h2>
              Thank you for your feedback!
            </h2>

            <p>
              Your feedback has been received.
              AI analysis has been completed successfully.
            </p>


            <div className="result-preview">

              <div>

                <span>
                  Category
                </span>

                <strong>
                  {category}
                </strong>

              </div>


              <div>

                <span>
                  Sentiment
                </span>

                <strong
                  className={
                    result?.sentiment === "Negative"
                      ? "result-negative"
                      : result?.sentiment === "Neutral"
                      ? "result-neutral"
                      : "result-positive"
                  }
                >
                  {result?.sentiment || "Processing"}
                </strong>

              </div>


              <div>

                <span>
                  Priority
                </span>

                <strong>
                  {result?.priority || "Low"}
                </strong>

              </div>

            </div>


            <p className="result-note">
              Analysis generated by the CampusPulse
              cloud backend.
            </p>


            <button
              className="secondary-btn"
              onClick={resetForm}
            >
              Submit Another Feedback
            </button>

          </div>

        )}

      </div>

    </main>

  );

}

export default StudentFeedback;