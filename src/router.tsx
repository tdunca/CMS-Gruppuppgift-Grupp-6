import { createBrowserRouter } from 'react-router-dom';
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
]);

export default router;
