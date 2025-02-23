import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function Main() {
  const location = useLocation();
  const { subjects } = location.state || { subjects: [] };

  const [feedback, setFeedback] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onRatingChange = (subjectId, value) => {
    setFeedback(prev => ({
      ...prev,
      [subjectId]: { ...prev[subjectId], rating: value }
    }));
  };

  const onSuggestionChange = (subjectId, value) => {
    setFeedback(prev => ({
      ...prev,
      [subjectId]: { ...prev[subjectId], suggestion: value }
    }));
  };

  const onSubmitFeedback = async () => {
    setIsSubmitting(true);

    const ratings = subjects.map(subject => {
      const fb = feedback[subject._id] || {};
      return {
        subjectId: subject._id,
        rating: fb.rating ? Number(fb.rating) : null,
        message: fb.suggestion || ""
      };
    });

    const data = {
      branch: subjects[0]?.branch || "",
      ratings
    };

    try {
      const response = await fetch("https://academic-rating.onrender.com/api/feedback/rating", {
        method: "POST",
        headers: {
          "Accept": "*/*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Feedback submitted successfully");
      } else {
        alert("The admin has not made the site available. Please contact your admin.");
      }
    } catch (error) {
      alert("The admin has not made the site available. Please contact your admin.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="main">
      <style>{`
        /* General Styling */
        body {
          margin: 0;
          padding: 0;
          font-family: 'Poppins', sans-serif;
          background: #f8f9fc;
          color: #333;
        }

        .main {
          max-width: 360px;
          margin: 20px auto;
          padding: 15px;
          background: white;
          border-radius: 10px;
          box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
        }

        header img {
          width: 100%;
          border-radius: 6px;
        }

        h2 {
          text-align: center;
          font-size: 18px;
          margin-bottom: 15px;
        }

        /* Feedback Box */
        .feedback-box {
          background: #ffffff;
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 15px;
          box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.08);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .subject-name {
          font-size: 16px;
          font-weight: 600;
        }

        /* Radio Group */
        .radio-group {
          display: flex;
          justify-content: space-between;
          gap: 6px;
        }

        .radio-group label {
          font-size: 12px;
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .radio-group input {
          margin-right: 5px;
          transform: scale(1);
        }

        /* Suggestion Box - Now perfectly inside the feedback box */
        .suggestion-box {
          width: 100%;
          padding: 8px;
          font-size: 12px;
          border: 1px solid #ccc;
          border-radius: 6px;
          resize: vertical;
          min-height: 50px;
          box-sizing: border-box;
          background: #fafafa;
        }

        .suggestion-box:focus {
          border-color: #007bff;
          outline: none;
          box-shadow: 0px 3px 8px rgba(0, 123, 255, 0.2);
        }

        /* Submit Button */
        .submit-button {
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, #007bff, #0056b3);
          color: white;
          font-size: 14px;
          font-weight: bold;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          box-shadow: 0px 3px 8px rgba(0, 123, 255, 0.2);
          transition: all 0.2s ease-in-out;
        }

        .submit-button:hover {
          background: linear-gradient(135deg, #0056b3, #003f88);
        }

        .submit-button:active {
          background: #003f88;
          transform: scale(0.97);
        }

        .submit-button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        /* Responsive Design */
        @media (max-width: 400px) {
          .main {
            max-width: 320px;
            padding: 10px;
          }

          .radio-group {
            flex-direction: column;
          }

          .radio-group label {
            font-size: 14px;
          }
        }
      `}</style>

      {/* Header image */}
      <header>
        <img
          src="https://webprosindia.com/vignanit/collegeimages/title_head.jpg"
          alt="Header"
        />
      </header>

      <h2>Feedback for Subjects</h2>
      {subjects.map(subject => (
        <div key={subject._id} className="feedback-box">
          <div className="subject-name">{subject.name}</div>
          <div className="radio-group">
            {[4, 3, 2, 1].map(value => (
              <label key={value}>
                <input
                  type="radio"
                  name={`rating-${subject._id}`}
                  value={value}
                  checked={feedback[subject._id]?.rating === String(value)}
                  onChange={(e) => onRatingChange(subject._id, e.target.value)}
                />
                {["Excellent", "Good", "Average", "Poor"][4 - value]}
              </label>
            ))}
          </div>
          <textarea
            className="suggestion-box"
            placeholder="Enter your suggestions..."
            value={feedback[subject._id]?.suggestion || ''}
            onChange={(e) => onSuggestionChange(subject._id, e.target.value)}
          />
        </div>
      ))}
      <button className="submit-button" onClick={onSubmitFeedback} disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Feedback"}
      </button>
    </div>
  );
}

export default Main;
