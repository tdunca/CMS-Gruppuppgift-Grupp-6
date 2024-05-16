import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import firebaseOptions from './firebaseOptions.ts';
import './index.css';
import router from './router.tsx';

// Initialize Firebase
const app = initializeApp(firebaseOptions);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
