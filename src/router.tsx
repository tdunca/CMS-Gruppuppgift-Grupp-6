import { createBrowserRouter } from 'react-router-dom';
import AdminRoot from './features/admin/views/adminRoot';
import Edit from './features/admin/views/edit';
import List from './features/admin/views/list';
import SignIn from './features/admin/views/signIn';
import CustomerRoot from './features/customer/views/customerRoot';
import Details from './features/customer/views/details';
import Result from './features/customer/views/result';
import Start from './features/customer/views/start';
import ErrorPage from './features/shared/error/errorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <CustomerRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Start />,
      },
      {
        path: 'home/:id',
        element: <Details />,
      },
      {
        path: 'result',
        element: <Result />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminRoot />,
    errorElement: <ErrorPage />,
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
