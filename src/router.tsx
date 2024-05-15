import { createBrowserRouter } from 'react-router-dom';
import AdminRoot from './features/admin/views/adminRoot';
import Edit from './features/admin/views/edit';
import List from './features/admin/views/list';
import Details from './features/customer/views/details';
import Home from './features/customer/views/home';
import UserRoot from './features/customer/views/userRoot';

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserRoot />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/home/:name',
        element: <Details />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminRoot />,
    children: [
      {
        path: '/admin',
        element: <List />,
      },
      {
        path: '/admin/home/:name',
        element: <Edit />,
      },
    ],
  },
]);

export default router;
