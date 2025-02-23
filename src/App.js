// App.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  // State variables to store dropdown selections
  const [year, setYear] = useState('1');
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  const navigate = useNavigate();

  // Handler for the submit button
  const handleSubmit = () => {
    console.log('Year:', year);
    console.log('Branch:', branch);
    console.log('Semester:', semester);

    // Build the API URL dynamically using user selections
    const url = `https://academic-rating.onrender.com/api/subjects?branch=${branch}&semester=${semester}&year=${year}`;

    const myHeaders = new Headers();
    myHeaders.append("Accept", "*/*");
    myHeaders.append("User-Agent", "Thunder Client (https://www.thunderclient.com)");
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      // Note: GET requests do not require a body, so we omit it.
      redirect: "follow"
    };

    // Fetch the API data, parse it, and navigate to Main.js
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        // Ensure that the fetched data is an array
        let subjects = [];
        if (Array.isArray(data)) {
          subjects = data;
        } else if (data && data.subjects && Array.isArray(data.subjects)) {
          subjects = data.subjects;
        } else {
          console.error('Unexpected data format:', data);
        }
        console.log('Fetched Data:', subjects);
        navigate('/main', { state: { subjects } });
      })
      .catch(error => console.error('Error fetching data:', error));
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
        }
        /* Force a mobile-like container width */
        .app {
          width: 375px;
          margin: 0 auto;
          background-color: #fff;
          font-family: Arial, sans-serif;
          padding: 0 20px;
        }
        /* Header image styling */
        header img {
          width: 100%;
          height: auto;
          display: block;
        }
        /* "HEY THERE!!" button */
        .top-button {
          width: 100%;
          margin: 20px 0;
          background-color: #007bff;
          color: #fff;
          padding: 15px;
          text-align: center;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
        }
        /* Feedback title and dashed line */
        .feedback-title {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        hr {
          border: none;
          border-top: 1px dashed #000;
          margin-bottom: 20px;
        }
        /* Labels and selects */
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: 500;
        }
        select {
          width: 100%;
          padding: 10px;
          margin-bottom: 20px;
          font-size: 16px;
          border-radius: 5px;
          border: 1px solid #ccc;
          outline: none;
        }
        /* Submit button and interactive styling */
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
          transition: transform 0.1s ease-in-out, background-color 0.1s ease-in-out;
        }
        /* Scale down and change background color on click */
        .submit-button:active {
          transform: scale(0.95);
          background-color: #0056b3;
        }
      `}</style>

      {/* Header with the provided VIGNAN banner */}
      <header>
        <img
          src="https://webprosindia.com/vignanit/collegeimages/title_head.jpg"
          alt="VIGNAN Header"
        />
      </header>

      {/* Main content */}
      <main>
        <button className="top-button">HEY THERE!!</button>

        <div className="feedback-section">
          <div className="feedback-title">FEEDBACK</div>
          <hr />

          <label htmlFor="yearSelect">Select Year</label>
          <select
            id="yearSelect"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>

          <label htmlFor="branchSelect">Select Branch</label>
          <select
            id="branchSelect"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          >
            <option value="">Select Branch</option>
            <option value="CSE1">CSE1</option>
            <option value="CSE2">CSE2</option>
            <option value="CSE3">CSE3</option>
            <option value="CSE4">CSE4</option>
          </select>

          <label htmlFor="semesterSelect">Select Semester</label>
          <select
            id="semesterSelect"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          >
            <option value="">Select Semester</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>

          <button className="submit-button" onClick={handleSubmit}>
            SUBMIT
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
