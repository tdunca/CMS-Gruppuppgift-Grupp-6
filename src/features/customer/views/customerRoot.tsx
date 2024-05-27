import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { type Home } from '../../shared/firebase/home';
import Footer from '../components/footer';
import Header from '../components/header';
import Style from './customerRoot.module.css';

function UserRoot() {
  const [result, setResult] = useState<Home[]>([]);

  return (
    <div className={Style.wrapper}>
      <Header setResult={setResult} />
      <Outlet context={result} />
      <Footer />
    </div>
  );
}

export default UserRoot;
