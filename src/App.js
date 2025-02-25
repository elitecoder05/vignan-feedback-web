// App.js
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Main from './Main';

function Home() {
  const [year, setYear] = useState('');
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log('Year:', year);
    console.log('Branch:', branch);
    console.log('Semester:', semester);
  
    const url = `https://academic-rating.onrender.com/api/subjects?branch=${branch}&semester=${semester}&year=${year}`;
  
    fetch(url, {
      method: "GET",
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        // Check if the response indicates the server is under maintenance.
        if (data.message === "Server is under maintenance.") {
          alert('The site admin has not made the page available, please try again later');
          return;
        }
        let subjects = Array.isArray(data) ? data : data.subjects || [];
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
          border: 3px solid #007bff; /* Blue border added */
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
        select {
          width: 100%;
          padding: 10px;
          margin-bottom: 20px;
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
      `}</style>

      <header>
        <img src="https://webprosindia.com/vignanit/collegeimages/title_head.jpg" alt="VIGNAN Header" />
      </header>

      <main>
        <div className="feedback-title">FEEDBACK</div>

        <label>Select Year</label>
        <select value={year} onChange={(e) => setYear(e.target.value)}>
        <option value="">Select Year</option>

          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>

        <label>Select Branch</label>
        <select value={branch} onChange={(e) => setBranch(e.target.value)}>
          <option value="">Select Branch</option>
          <option value="CSE1">CSE1</option>
          <option value="CSE2">CSE2</option>
          <option value="CSE3">CSE3</option>
          <option value="CSE4">CSE4</option>
        </select>

        <label>Select Semester</label>
        <select value={semester} onChange={(e) => setSemester(e.target.value)}>
          <option value="">Select Semester</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>

        <button className="submit-button" onClick={handleSubmit}>SUBMIT</button>
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
