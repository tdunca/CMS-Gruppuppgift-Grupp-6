import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser, signInUser } from '../../firebase/user';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleCreateUser = async () => {
    await createUser({
      email,
      password,
      name: 'Yves',
      workEmail: 'tomte',
      phoneNum: 1239383838,
    });
    console.log('woho');
    navigate('home');
  };

  const handleSignIn = async () => {
    await signInUser({ email, password });
    navigate('home');
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

      <button onClick={handleSignIn}>Sign In</button>
      <button onClick={handleCreateUser}>Sign Up</button>
    </main>
  );
}

export default SignIn;
