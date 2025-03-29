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
  const [newSubject, setNewSubject] = useState("");
  const [feedback, setFeedback] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

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

  const addSubject = () => {
    if (newSubject.trim() === "") return;
    setSubjects([...subjects, { id: Date.now(), name: newSubject }]);
    setNewSubject("");
  };

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
      year,
      semester,
      ratings,
    };

    console.log(`Feedback submitted successfully!\n\nJSON sent:\n${JSON.stringify(data, null, 2)}`);

    localStorage.setItem("feedbackSubmissionTime", Date.now().toString());
    setHasSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <div className="main">
      <header>
        <img src="https://webprosindia.com/vignanit/collegeimages/title_head.jpg" alt="Header" />
      </header>

      <div className="add-section">
        <h2>Feedback for Subjects</h2>
        <div className="add-subject">
          <input
            type="text"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            placeholder="Enter subject name"
          />
          <button onClick={addSubject}>Add</button>
        </div>
      </div>

      <div className="subject-list">
        {subjects.map((subject) => (
          <div key={subject.id} className="feedback-box">
            <div className="subject-name">{subject.name}</div>
            <div className="radio-group">
              {[4, 3, 2, 1].map((value) => (
                <label key={value}>
                  <input
                    type="radio"
                    name={`rating-${subject.id}`}
                    value={value}
                    checked={feedback[subject.id]?.rating === String(value)}
                    onChange={(e) => onRatingChange(subject.id, e.target.value)}
                    disabled={hasSubmitted}
                  />
                  {["Excellent", "Good", "Average", "Poor"][4 - value]}
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
        ))}
      </div>

      <button className="submit-button" onClick={onSubmitFeedback} disabled={isSubmitting || hasSubmitted}>
        {isSubmitting ? "Submitting..." : hasSubmitted ? "Feedback already submitted" : "Submit Feedback"}
      </button>
    </div>
  );
}

export default Main;
