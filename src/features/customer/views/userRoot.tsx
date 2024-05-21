import { Outlet } from 'react-router-dom';
import Footer from '../components/footer';
import Header from '../components/header';
import Style from './userRoot.module.css';

function UserRoot() {
  return (
    <div className={Style.wrapper}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default UserRoot;
