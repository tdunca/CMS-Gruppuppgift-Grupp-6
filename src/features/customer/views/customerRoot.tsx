import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { type Home } from '../../shared/firebase/home';
import Footer from '../components/footer';
import Header from '../components/header';

function UserRoot() {
  const [result, setResult] = useState<Home[]>([]);

  return (
    <>
      <Header setResult={setResult} />
      <Outlet context={result} />
      <Footer />
    </>
  );
}

export default UserRoot;
