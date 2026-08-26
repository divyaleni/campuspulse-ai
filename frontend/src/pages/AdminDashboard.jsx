import React, { useEffect, useMemo, useState } from "react";

import {
  getAnalytics,
  getFeedbacks
} from "../api/feedbackApi";


function AdminDashboard() {

  const [search, setSearch] = useState("");
  const [sentimentFilter, setSentimentFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [feedbacks, setFeedbacks] = useState([]);


  // ==============================
  // FETCH REAL DATA FROM BACKEND
  // ==============================

  useEffect(() => {

    const loadDashboardData = async () => {

      try {

        setLoading(true);
        setError("");

        // Get analytics
        const analyticsData = await getAnalytics();

        console.log(
          "Analytics from backend:",
          analyticsData
        );

        setAnalytics(analyticsData);


        // Get feedback records
        const feedbackData = await getFeedbacks();

        console.log(
          "Feedback from backend:",
          feedbackData
        );


        // Backend returns:
        // { success, count, feedback }

        if (feedbackData?.feedback) {

          setFeedbacks(feedbackData.feedback);

        } else if (Array.isArray(feedbackData)) {

          setFeedbacks(feedbackData);

        } else {

          setFeedbacks([]);

        }


      } catch (error) {

        console.error(
          "Dashboard loading failed:",
          error
        );

        setError(
          "Unable to load dashboard data."
        );

      } finally {

        setLoading(false);

      }

    };


    loadDashboardData();

  }, []);


  // ==============================
  // FILTER REAL FIREBASE DATA
  // ==============================

  const filteredFeedback = useMemo(() => {

    return feedbacks.filter((item) => {

      const text =
        item.feedbackText ||
        item.text ||
        "";

      const sentiment =
        item.sentiment?.label ||
        item.sentiment ||
        "Neutral";

      const category =
        item.category ||
        "Unknown";


      const matchesSearch =
        text
          .toLowerCase()
          .includes(search.toLowerCase());


      const matchesSentiment =
        sentimentFilter === "All" ||
        sentiment === sentimentFilter;


      const matchesCategory =
        categoryFilter === "All" ||
        category === categoryFilter;


      return (
        matchesSearch &&
        matchesSentiment &&
        matchesCategory
      );

    });

  }, [
    feedbacks,
    search,
    sentimentFilter,
    categoryFilter
  ]);


  // ==============================
  // CALCULATE DISPLAY VALUES
  // ==============================
const total = analytics?.total ?? feedbacks.length;

const positive =
    analytics?.sentiment?.positive ?? 0;

const negative =
    analytics?.sentiment?.negative ?? 0;

const neutral =
    analytics?.sentiment?.neutral ?? 0;

const highPriority = feedbacks.filter(
    item => item.priority === "High"
).length;

  const positivePercentage =
    total > 0
      ? Math.round((positive / total) * 100)
      : 0;


  const negativePercentage =
    total > 0
      ? Math.round((negative / total) * 100)
      : 0;


  const neutralPercentage =
    total > 0
      ? Math.round((neutral / total) * 100)
      : 0;


  // ==============================
  // UI
  // ==============================

  return (

    <main className="dashboard-page">


      {/* HEADER */}

      <section className="dashboard-header">

        <div>

          <div className="ai-badge">
            ✦ CAMPUSPULSE AI
          </div>

          <h1>
            Campus Intelligence
          </h1>

          <p>
            Understand what students are saying
            and identify issues that need action.
          </p>

        </div>


        <div className="dashboard-date">
          Last updated: Just now
        </div>

      </section>


      {/* LOADING */}

      {loading && (

        <div className="loading-message">
          Loading campus analytics...
        </div>

      )}


      {/* ERROR */}

      {error && (

        <div className="error-message">
          {error}
        </div>

      )}


      {/* STAT CARDS */}

      <section className="stats-grid">


        {/* TOTAL */}

        <div className="dashboard-stat">

          <div className="stat-icon">
            💬
          </div>

          <span>
            Total Feedback
          </span>

          <strong>
            {total}
          </strong>

          <small>
            All submissions
          </small>

        </div>


        {/* POSITIVE */}

        <div className="dashboard-stat">

          <div className="stat-icon">
            😊
          </div>

          <span>
            Positive
          </span>

          <strong>
            {positive}
          </strong>

          <small>
            {positivePercentage}% of feedback
          </small>

        </div>


        {/* NEGATIVE */}

        <div className="dashboard-stat">

          <div className="stat-icon">
            😟
          </div>

          <span>
            Negative
          </span>

          <strong>
            {negative}
          </strong>

          <small>
            {negativePercentage}% of feedback
          </small>

        </div>


        {/* HIGH PRIORITY */}

        <div className="dashboard-stat">

          <div className="stat-icon">
            🚨
          </div>

          <span>
            High Priority
          </span>

          <strong>
            {highPriority}
          </strong>

          <small>
            Requires action
          </small>

        </div>


      </section>


      {/* INSIGHT + SENTIMENT */}

      <section className="analytics-grid">


        {/* SENTIMENT */}

        <div className="analytics-card">

          <div className="card-heading">

            <div>

              <span>
                SENTIMENT OVERVIEW
              </span>

              <h2>
                How students feel
              </h2>

            </div>


            <div className="ai-small">
              ✦ AI analyzed
            </div>

          </div>


          <div className="sentiment-bars">


            {/* POSITIVE */}

            <div className="sentiment-row">

              <div className="sentiment-label">

                <span>
                  😊
                </span>

                Positive

              </div>


              <div className="bar-track">

                <div
                  className="bar-fill positive-fill"
                  style={{
                    width:
                      `${positivePercentage}%`
                  }}
                ></div>

              </div>


              <strong>
                {positive}
              </strong>

            </div>


            {/* NEGATIVE */}

            <div className="sentiment-row">

              <div className="sentiment-label">

                <span>
                  😟
                </span>

                Negative

              </div>


              <div className="bar-track">

                <div
                  className="bar-fill negative-fill"
                  style={{
                    width:
                      `${negativePercentage}%`
                  }}
                ></div>

              </div>


              <strong>
                {negative}
              </strong>

            </div>


            {/* NEUTRAL */}

            <div className="sentiment-row">

              <div className="sentiment-label">

                <span>
                  😐
                </span>

                Neutral

              </div>


              <div className="bar-track">

                <div
                  className="bar-fill neutral-fill"
                  style={{
                    width:
                      `${neutralPercentage}%`
                  }}
                ></div>

              </div>


              <strong>
                {neutral}
              </strong>

            </div>


          </div>

        </div>


        {/* AI INSIGHT */}

        <div className="analytics-card ai-insight-card">

          <div className="insight-icon">
            ✦
          </div>

          <span className="insight-label">
            AI INSIGHT
          </span>

          <h2>
            Infrastructure needs attention
          </h2>

          <p>
            Negative responses can help identify
            campus areas that need attention.
          </p>

          <div className="recommendation">

            <strong>
              Recommended action
            </strong>

            <span>
              Review high-priority feedback and
              assign it to the appropriate campus team.
            </span>

          </div>

        </div>


      </section>


      {/* FEEDBACK LIST */}

      <section className="feedback-list-card">


        <div className="list-header">

          <div>

            <span className="section-label">
              FEEDBACK STREAM
            </span>

            <h2>
              Student Responses
            </h2>

          </div>


          <span>
            {filteredFeedback.length} results
          </span>

        </div>


        {/* FILTERS */}

        <div className="filters">


          {/* SEARCH */}

          <div className="search-box">

            🔍

            <input
              type="text"
              placeholder="Search feedback..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          {/* SENTIMENT FILTER */}

          <select
            value={sentimentFilter}
            onChange={(e) =>
              setSentimentFilter(e.target.value)
            }
          >

            <option>
              All
            </option>

            <option>
              Positive
            </option>

            <option>
              Negative
            </option>

            <option>
              Neutral
            </option>

          </select>


          {/* CATEGORY FILTER */}

          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.value)
            }
          >

            <option>
              All
            </option>

            <option>
              Course
            </option>

            <option>
              Infrastructure
            </option>

            <option>
              Faculty
            </option>

            <option>
              Library
            </option>

            <option>
              Hostel
            </option>

            <option>
              Transport
            </option>

            <option>
              Food / Canteen
            </option>

            <option>
              Event
            </option>

          </select>


        </div>


        {/* REAL FIREBASE FEEDBACK */}

        <div className="recent-feedback-list">


          {filteredFeedback.length === 0 ? (

            <p>
              No feedback found.
            </p>

          ) : (

            filteredFeedback.map((item) => {


              const sentiment =
                item.sentiment?.label ||
                item.sentiment ||
                "Neutral";


              const text =
                item.feedbackText ||
                item.text ||
                "No feedback text";


              const category =
                item.category ||
                "Unknown";


              const priority =
                item.priority ||
                "Low";


              return (

                <div
                  className="feedback-item"
                  key={item.id}
                >


                  <div className="feedback-item-header">

                    <strong>
                      {category}
                    </strong>

                    <span>
                      {sentiment}
                    </span>

                  </div>


                  <p>
                    {text}
                  </p>


                  <small>
                    Priority: {priority}
                  </small>


                </div>

              );

            })

          )}


        </div>


      </section>


    </main>

  );

}


export default AdminDashboard;