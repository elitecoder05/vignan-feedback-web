import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import './Main.css';

function Main() {
  const location = useLocation();
  const { year, branch, semester } = location.state || {
    year: "",
    branch: "",
    semester: "",
  };

  const [subjects, setSubjects] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // Fetch subjects only if year, branch, and semester are available
    if (year && branch && semester) {
      const fetchSubjects = async () => {
        try {
          const myHeaders = new Headers();
          myHeaders.append("Accept", "*/*");
          myHeaders.append("User-Agent", "Thunder Client (https://www.thunderclient.com)");

          const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
          };

          const response = await fetch(`https://academic-rating.onrender.com/api/subjects?branch=${branch}&semester=${semester}&year=${year}`, requestOptions);
          const result = await response.json();

          if (response.ok) {
            setSubjects(result); // Assuming the result is an array of subjects
          } else {
            throw new Error('Failed to fetch subjects');
          }
        } catch (error) {
          console.error("Error fetching subjects:", error);
          displayAlert("Error fetching subjects, please try again later.", false);
        }
      };

      fetchSubjects();
    }
  }, [year, branch, semester]);

  useEffect(() => {
    const storedSubmissionTime = localStorage.getItem("feedbackSubmissionTime");
    if (storedSubmissionTime) {
      const submissionTime = new Date(parseInt(storedSubmissionTime, 10));
      const now = new Date();
      if (now - submissionTime < 48 * 60 * 60 * 1000) {
        setHasSubmitted(true);
      } else {
        localStorage.removeItem("feedbackSubmissionTime");
      }
    }
  }, []);

  const onRatingChange = (subjectId, value) => {
    setFeedback((prev) => ({
      ...prev,
      [subjectId]: { ...prev[subjectId], rating: value },
    }));
  };

  const onSuggestionChange = (subjectId, value) => {
    setFeedback((prev) => ({
      ...prev,
      [subjectId]: { ...prev[subjectId], suggestion: value },
    }));
  };

  const displayAlert = (message, isSuccess = true) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const onSubmitFeedback = () => {
    setIsSubmitting(true);

    const ratings = subjects.map((subject) => {
      const fb = feedback[subject.id] || {};
      return {
        subjectName: subject.name,
        rating: fb.rating ? Number(fb.rating) : null,
        message: fb.suggestion || "",
      };
    });

    const data = {
      branch,
      year: Number(year),
      semester: Number(semester),
      ratings,
    };

    const myHeaders = new Headers();
    myHeaders.append("Accept", "*/*");
    myHeaders.append("User-Agent", "Thunder Client (https://www.thunderclient.com)");
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: "follow"
    };

    fetch("https://academic-rating.onrender.com/api/feedback/rating", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then((result) => {
        console.log("API Response:", result);
        displayAlert("Feedback submitted successfully!");
        localStorage.setItem("feedbackSubmissionTime", Date.now().toString());
        setHasSubmitted(true);
      })
      .catch((error) => {
        console.error("Error submitting feedback:", error);
        displayAlert("The admin has not made the site available yet, contact admin", false);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="main">
      {showAlert && (
        <div className={`alert ${alertMessage.includes("Error") ? "alert-error" : "alert-success"}`}>
          {alertMessage}
        </div>
      )}

      <header>
        <img src="https://webprosindia.com/vignanit/collegeimages/title_head.jpg" alt="Header" />
      </header>

      <div className="subject-list">
        {subjects.length > 0 ? (
          subjects.map((subject) => (
            <div key={subject.id} className="feedback-box">
              <div className="subject-name">{subject.name}</div>
              <div className="radio-group">
                {[3, 2, 1].map((value) => (
                  <label key={value}>
                    <input
                      type="radio"
                      name={`rating-${subject.id}`}
                      value={value}
                      checked={feedback[subject.id]?.rating === String(value)}
                      onChange={(e) => onRatingChange(subject.id, e.target.value)}
                      disabled={hasSubmitted}
                    />
                    {value === 3 ? "Excellent" : value === 2 ? "Satisfactory" : "Not upto the mark"}
                  </label>
                ))}
              </div>
              <textarea
                className="suggestion-box"
                placeholder="Enter your suggestions..."
                value={feedback[subject.id]?.suggestion || ""}
                onChange={(e) => onSuggestionChange(subject.id, e.target.value)}
                disabled={hasSubmitted}
              />
            </div>
          ))
        ) : (
          <p>Loading subjects...</p>
        )}
      </div>

      <button className="submit-button" onClick={onSubmitFeedback} disabled={isSubmitting || hasSubmitted}>
        {isSubmitting ? "Submitting..." : hasSubmitted ? "Feedback already submitted" : "Submit Feedback"}
      </button>
    </div>
  );
}

export default Main;
