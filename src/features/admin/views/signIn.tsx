import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../main';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential: UserCredential) => {
        console.log('User registered and logged in', { userCredential });
        navigate('home');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signInUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: UserCredential) => {
        console.log('User logged in', userCredential);

        navigate('home');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main>
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
    </main>
  );
}

export default SignIn;
