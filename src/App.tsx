import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import routes from './routes/routes';

function App() {
  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer autoClose={5000} className='toast-container' />
    </>
  );
}

export default App;
