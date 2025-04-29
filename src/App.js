// import `RouterProvider` component
import { RouterProvider } from 'react-router-dom';
//  import `router` property
import router from './lib/routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the Toastify styles
import './bootstrap.css';

function App() {
  return (
    /*  comment so I can push chantal changes to vercel */
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />

    </>
    
  );
}

export default App;