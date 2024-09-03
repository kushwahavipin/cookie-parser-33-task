import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

function App() {
  const [response, setResponse] = useState(null);

  const setCookie = async () => {
    const res = await axios.get('https://cookie-parser-33-task-backend.vercel.app/set-cookie', {
      withCredentials: true
    });
    setResponse(res.data);
  };

  const getCookie = async () => {
    const res = await axios.get('https://cookie-parser-33-task-backend.vercel.app/get-cookie', {
      withCredentials: true
    });
    setResponse(res.data);
  };

  const getStatusCodeResponse = async (code) => {
    try {
      const res = await axios.get(`https://cookie-parser-33-task-backend.vercel.app/status/${code}`, {
        withCredentials: true
      });
      setResponse(res.data);
    } catch (error) {
      if (error.response) {
        setResponse({
          message: `Error: ${error.response.data.message}`,
          status: error.response.status,
        });
      } else {
        setResponse({ message: 'An unknown error occurred' });
      }
    }
  };

  return (
    <div className="container">
      <h1>Task 33: Cookies and Response</h1>
      <div className="button-container">
        <button className="btn" onClick={setCookie}>Set Cookie</button>
        <button className="btn" onClick={getCookie}>Get Cookie</button>
        <button className="btn" onClick={() => getStatusCodeResponse(200)}>Get 200 Response</button>
        <button className="btn" onClick={() => getStatusCodeResponse(400)}>Get 400 Response</button>
        <button className="btn" onClick={() => getStatusCodeResponse(404)}>Get 404 Response</button>
        <button className="btn" onClick={() => getStatusCodeResponse(500)}>Get 500 Response</button>
      </div>
      {response && (
        <div className="response-container">
          <h2>Response</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
