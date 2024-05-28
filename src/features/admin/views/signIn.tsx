import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser, signInUser } from '../../shared/firebase/user';
import Input from '../components/input';

function SignIn() {
  const [currentTab, setCurrentTab] = useState<1 | 2>(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [workEmail, setWorkEmail] = useState('');

  const navigate = useNavigate();

  const handleCreateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!phoneNum || password !== confirmPassword) return;

    await createUser({
      email,
      password,
      name,
      workEmail,
      phoneNum: parseInt(phoneNum),
    });

    navigate('home');
  };

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await signInUser({ email, password });
    navigate('home');
  };

  return (
    <main>
      <section>
        <button onClick={() => setCurrentTab(1)}>Inloggning</button>
        <button onClick={() => setCurrentTab(2)}>Registrering</button>
      </section>

      {currentTab === 1 && (
        <form onSubmit={handleSignIn}>
          <Input
            label="Epost:"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Lösenord:"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Logga in</button>
        </form>
      )}
      {currentTab === 2 && (
        <form onSubmit={handleCreateUser}>
          <section>
            <p>Inloggningsuppgifter</p>
            <Input
              label="Användarnamn (epost):"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Lösenord:"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              label="Bekräfta lösenord:"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </section>
          <section>
            <p>Kontaktuppgifter</p>
            <Input
              label="Namn:"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Telefonnummer:"
              name="phoneNum"
              type="number"
              value={phoneNum}
              onChange={(e) => setPhoneNum(e.target.value)}
            />
            <Input
              label="Epost:"
              name="workEmail"
              type="email"
              value={workEmail}
              onChange={(e) => setWorkEmail(e.target.value)}
            />
          </section>
          <button type="submit">Skapa användare</button>
        </form>
      )}
    </main>
  );
}

export default SignIn;
