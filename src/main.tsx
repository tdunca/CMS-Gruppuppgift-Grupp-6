import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import firebaseOptions from './firebaseOptions.ts';
import './index.css';
import router from './router.tsx';

// Firebase
const app = initializeApp(firebaseOptions);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage();

// Render the root React component (App) to the DOM
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
