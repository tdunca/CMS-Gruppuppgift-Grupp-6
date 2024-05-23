import { createBrowserRouter } from 'react-router-dom';
import AdminRoot from './features/admin/views/adminRoot';
import Edit from './features/admin/views/edit';
import List from './features/admin/views/list';
import SignIn from './features/admin/views/signIn';
import Details from './features/customer/views/details';
import Home from './features/customer/views/home';
import UserRoot from './features/customer/views/userRoot';
import ErrorPage from './features/error/errorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'home/:name',
        element: <Details />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminRoot />,
    children: [
      {
        index: true,
        element: <SignIn />,
      },
      {
        path: 'home',
        element: <List />,
      },
      {
        path: 'home/edit/:id',
        element: <Edit />,
      },
    ],
  },
]);

export default router;
