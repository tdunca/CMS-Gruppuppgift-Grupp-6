// File: components/FileUpload.js
import React from 'react';
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '../main';

const FileUpload = ({ onFileUpload }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && onFileUpload) {
      onFileUpload(file);
    }
  };

  return <input type="file" onChange={handleFileChange} />;
};

export const uploadFile = async (file) => {
  const storageRef = ref(storage, `images/${file.name}`);
  try {
    const snapshot = await uploadBytes(storageRef, file);
    console.log('Uploaded a blob or file!', snapshot);
  } catch (error) {
    console.error('Upload failed', error);
  }
};

export default FileUpload;
