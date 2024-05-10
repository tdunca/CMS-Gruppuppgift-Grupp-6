import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import FireBaseConfig from "./FireBaseConfig.ts";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See:

// Initialize Firebase
const app = initializeApp(FireBaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
