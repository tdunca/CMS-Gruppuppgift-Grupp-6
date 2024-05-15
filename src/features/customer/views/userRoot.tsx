import { Outlet } from 'react-router-dom';
import Footer from '../components/footer';
import Header from '../components/header';

function UserRoot() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default UserRoot;
