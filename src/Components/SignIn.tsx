import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../main';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to create a new user with email and password
  const createUser = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User is now registered and logged in
        console.log('User registered and logged in');
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // Function to sign in an existing user with email and password
  const signInUser = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User is now logged in
        console.log('User logged in');
        // If sign-in is successful, navigate to the AddItem component
        navigate('/add-item');
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      <label>Epost:</label>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <label>Lösenord:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <button onClick={signInUser}>Sign In</button>
      <button onClick={createUser}>Sign Up</button>
    </>
  );
};

export default SignIn;
