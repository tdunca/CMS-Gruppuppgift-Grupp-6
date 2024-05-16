import { Outlet } from 'react-router-dom';
import Controls from '../components/controls';

function AdminRoot() {
  return (
    <>
      <Controls />
      <Outlet />
    </>
  );
}

export default AdminRoot;
