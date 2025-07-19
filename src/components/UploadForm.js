import React, { useState } from 'react';
import axios from 'axios';
import './UploadForm.css';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('❌ Please select a file first');
      return;
    }

    setLoading(true);

    try {
      const apiUrl = 'https://<YOUR_API_GATEWAY_ID>.execute-api.<region>.amazonaws.com/generate-presigned-url';

      const response = await axios.post(apiUrl, {
        fileName: file.name,
        fileType: file.type
      });

      const { uploadUrl, fileUrl } = response.data;

      await axios.put(uploadUrl, file, {
        headers: { 'Content-Type': file.type }
      });

      setMessage(`✅ File uploaded successfully!\n${fileUrl}`);
    } catch (error) {
      console.error('Upload failed:', error);
      setMessage('❌ Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-form">
      <h2>📤 Upload Your Prescription</h2>

      <label htmlFor="file-upload" className="custom-file-upload">
        {file ? file.name : 'Choose File'}
      </label>
      <input
        id="file-upload"
        type="file"
        accept=".png,.jpg,.jpeg,.pdf"
        onChange={handleChange}
      />

      <button className="upload-button" onClick={handleUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>

      {message && (
        <p className="upload-message">{message}</p>
      )}
    </div>
  );
};

export default UploadForm;
