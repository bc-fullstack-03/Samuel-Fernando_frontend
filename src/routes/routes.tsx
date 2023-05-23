import { createBrowserRouter } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Friends from '../pages/Friends';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/friends',
    element: <Friends />,
  },
]);

export default routes;
