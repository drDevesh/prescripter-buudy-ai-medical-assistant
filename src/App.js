import React from 'react';
import UploadForm from './components/UploadForm';
import './App.css'; // Import the styles

function App() {
  return (
    <div className="app-container">
      <div className="header-bar">
        <h1>Prescripter Buddy</h1>
      </div>
      <div className="content">
        <UploadForm />
      </div>
    </div>
  );
}

export default App;
