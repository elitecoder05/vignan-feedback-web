import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const [year, setYear] = useState('1');
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log('Year:', year);
    console.log('Branch:', branch);
    console.log('Semester:', semester);

    const url = `https://academic-rating.onrender.com/api/subjects?branch=${branch}&semester=${semester}&year=${year}`;

    const myHeaders = new Headers();
    myHeaders.append("Accept", "*/*");
    myHeaders.append("User-Agent", "Thunder Client (https://www.thunderclient.com)");
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
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
          border: 2px solid #007bff;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          text-align: center;
        }
        header img {
          width: 100%;
          height: auto;
          display: block;
        }
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
        .submit-button:active {
          transform: scale(0.95);
          background-color: #0056b3;
        }
      `}</style>

      <header>
        <img
          src="https://webprosindia.com/vignanit/collegeimages/title_head.jpg"
          alt="VIGNAN Header"
        />
      </header>

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
