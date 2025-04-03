import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Main from "./Main";

function Home() {
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");
  const [section, setSection] = useState("");
  const [semester, setSemester] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Combine branch and section for sending to the next page
    const combinedBranch = branch + section;
    
    console.log("Year:", year);
    console.log("Branch:", combinedBranch); // This will be like "CSE1"
    console.log("Semester:", semester);

    // Navigate to the Main screen with selected values
    navigate("/main", { state: { year, branch: combinedBranch, semester } });
  };

  return (
    <div className="app">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        html, body, #root {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #f4f4f4;
        }
        .app {
          width: 375px;
          background-color: #fff;
          font-family: Arial, sans-serif;
          padding: 20px;
          border: 3px solid #007bff;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          text-align: center;
        }
        header img {
          width: 100%;
          height: auto;
          display: block;
        }
        .feedback-title {
          padding-top: 15px;
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .form-group {
          margin-bottom: 15px;
          text-align: left;
        }
        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }
        select {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          font-size: 16px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }
        .submit-button {
          width: 100%;
          background-color: #007bff;
          color: #fff;
          padding: 15px;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
        }
        .submit-button:disabled {
          background-color: #aaa;
          cursor: not-allowed;
        }
      `}</style>

      <header>
        <img
          src="https://webprosindia.com/vignanit/collegeimages/title_head.jpg"
          alt="VIGNAN Header"
        />
      </header>

      <main>
        <div className="feedback-title">FEEDBACK</div>

        <div className="form-group">
          <label>Select Year</label>
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">Select Year</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>

        <div className="form-group">
          <label>Select Branch</label>
          <select value={branch} onChange={(e) => setBranch(e.target.value)}>
            <option value="">Select Branch</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="MECH">MECH</option>
            <option value="CIVIL">CIVIL</option>
          </select>
        </div>

        <div className="form-group">
          <label>Select Section</label>
          <select value={section} onChange={(e) => setSection(e.target.value)}>
            <option value="">Select Section</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>
        </div>

        <div className="form-group">
          <label>Select Semester</label>
          <select value={semester} onChange={(e) => setSemester(e.target.value)}>
            <option value="">Select Semester</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>

        <button 
          className="submit-button" 
          onClick={handleSubmit}
          disabled={!year || !branch || !section || !semester}
        >
          SUBMIT
        </button>
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/main" element={<Main />} />
    </Routes>
  );
}

export default App;