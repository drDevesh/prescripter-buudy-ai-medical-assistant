import React, { useState } from 'react';
import axios from 'axios';
import './Upload.css';

const UploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setMessage('');
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('❌ Please select a file first.');
      return;
    }

    setIsUploading(true);
    setMessage('⏳ Uploading...');

    try {
      // 1. Get the pre-signed URL from your Lambda API
      const response = await axios.post(
  'https://w9q3xtsru7.execute-api.us-east-1.amazonaws.com/get-presigned-url',
  formData
);


      const { uploadURL, fileName } = response.data;

      // 2. Upload the file to S3 using the pre-signed URL
      await axios.put(uploadURL, selectedFile, {
        headers: {
          'Content-Type': selectedFile.type,
        },
      });

      setMessage(`✅ File uploaded successfully!`);
      console.log('Uploaded file:', fileName);

      // 👉 Save the fileName in local state or context if needed for next API call
    } catch (error) {
      console.error('Upload error:', error);
      setMessage('❌ Upload failed. See console for details.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="upload-form">
      <h2>Upload Prescription</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={isUploading}>
        {isUploading ? 'Uploading...' : 'Upload'}
      </button>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default UploadForm;
