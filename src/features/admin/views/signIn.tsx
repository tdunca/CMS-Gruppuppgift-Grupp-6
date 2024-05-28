import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser, signInUser } from '../../shared/firebase/user';
import Input from '../components/input';
import Style from './signIn.module.css';

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
    <main className={Style.signIn}>
      <section className={Style.tabs}>
        <button disabled={currentTab === 1} onClick={() => setCurrentTab(1)}>
          Inloggning
        </button>
        <button disabled={currentTab === 2} onClick={() => setCurrentTab(2)}>
          Registrering
        </button>
      </section>

      {currentTab === 1 && (
        <form onSubmit={handleSignIn} className={Style.form}>
          <section className={Style.section}>
            <h2 className={Style.header}>Inloggningsuppgifter</h2>
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
          </section>
          <button type="submit">Logga in</button>
        </form>
      )}
      {currentTab === 2 && (
        <form onSubmit={handleCreateUser} className={Style.form}>
          <section className={Style.section}>
            <h2 className={Style.header}>Inloggningsuppgifter</h2>
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
          <section className={Style.section}>
            <h2 className={Style.header}>Kontaktuppgifter</h2>
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
