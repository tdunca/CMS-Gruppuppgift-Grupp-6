import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import firebaseOptions from './firebaseOptions.ts';
import './index.css';

// Initialize Firebase
const app = initializeApp(firebaseOptions);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
