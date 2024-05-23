import { Outlet } from 'react-router-dom';
import Footer from '../components/footer';
import Header from '../components/header';
import Style from './userRoot.module.css';
import { useState } from 'react';
import { HomeType } from '../../firebase/home';

function UserRoot() {
  const [result, setResult] = useState<HomeType[]>([]);
  return (
    <div className={Style.wrapper}>
      <Header setResult={setResult} />
      <Outlet context={result} />
      <Footer />
    </div>
  );
}

export default UserRoot;
