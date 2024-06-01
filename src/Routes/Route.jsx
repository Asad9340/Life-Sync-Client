import { createBrowserRouter } from 'react-router-dom';
import Root from '../Layout/Root';
import DonationRequest from '../Pages/DonationRequest/DonationRequest';
import Blog from '../Pages/Blog/Blog';
import Funding from '../Pages/Funding/Funding';
import SignIn from '../Pages/SignIn/SignIn';
import SignUp from '../Pages/SignUp/SignUp';
import ErrorPage from '../Pages/Error/ErrorPage';
import HomePage from '../Pages/Home/HomePage/HomePage';
import SearchPage from '../components/SearchPage/SearchPage';
import DashboardLayout from '../Layout/DashboardLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element:<Root/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '/',
        element: <HomePage/>
      },
      {
        path: '/donation-request',
        element:<DonationRequest/>
      },
      {
        path: '/blog',
        element:<Blog/>
      },
      {
        path: '/funding',
        element:<Funding/>
      },
      {
        path: '/signin',
        element:<SignIn/>
      },
      {
        path: '/signup',
        element:<SignUp/>
      },
      {
        path: '/search',
        element:<SearchPage/>
      },
    ]
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      
    ]
  }
]);

export default router;
