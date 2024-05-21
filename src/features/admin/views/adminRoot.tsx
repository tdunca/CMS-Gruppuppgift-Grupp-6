import { Outlet } from 'react-router-dom';
import Controls from '../components/controls';
import Style from './adminRoot.module.css';

function AdminRoot() {
  return (
    <div className={Style.wrapper}>
      <Outlet />
      <Controls />
    </div>
  );
}

export default AdminRoot;
