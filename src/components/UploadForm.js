import React, { useState } from 'react';
import './Upload.css';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('File selected: ' + e.target.files[0].name);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('❗ Please select a file before uploading.');
      return;
    }

    setMessage('Uploading...');

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Replace with your real backend endpoint
      const response = await fetch('https://your-api-url/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Prescription simplified: ' + data.result);
      } else {
        setMessage('❌ Upload failed: ' + data.error);
      }
    } catch (error) {
      setMessage('❌ Upload failed: ' + error.message);
    }
  };

  return (
    <div className="upload-form">
      <div className="title-left">Choose your Prescription file and click upload</div>
      <input
        type="file"
        className="file-input"
        onChange={handleFileChange}
      />
      <button className="upload-button" onClick={handleUpload}>
        Upload
      </button>
      <div className="message-box">{message}</div>
    </div>
  );
};

export default UploadForm;
