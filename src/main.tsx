import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import FileUpload from './components/FileUpload.tsx';

// Firebase configuration object containing the Firebase project's credentials
const firebaseConfig = {
  apiKey: 'AIzaSyA0YXs8FBbxHfxkxt9Jv0IdHvh2w4ZIpFI',
  authDomain: 'cms-gruppuppgift-grupp6-43f65.firebaseapp.com',
  projectId: 'cms-gruppuppgift-grupp6-43f65',
  storageBucket: 'cms-gruppuppgift-grupp6-43f65.appspot.com',
  messagingSenderId: '236047481910',
  appId: '1:236047481910:web:1243f17ab7595e0a886c97',
};

// Initialize the Firebase app with the provided configuration
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Authentication services with the initialized app
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage();

// Render the root React component (App) to the DOM
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Export the Firestore and Authentication services for use in other modules
export { db, auth, storage };
