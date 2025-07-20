import React from 'react';
import UploadForm from './components/UploadForm';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">Medical Prescription Simplifier</header>
      <div className="upload-section">
        <UploadForm />
      </div>
    </div>
  );
}

export default App;
