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
import Profile from '../Dashboard/Profile/Profile';
import Board from '../Dashboard/Board/Board';
import PrivateRoute from './PrivateRoute';
import AllUsers from '../Dashboard/AllUsers/AllUsers';
import MyDonationReq from '../Dashboard/MyDonationReq/MyDonationReq';
import CreateDonationReq from '../Dashboard/CreateDonationReq/CreateDonationReq';
import AllBloodDonationReq from '../Dashboard/AllBloodDonationReq/AllBloodDonationReq';
import ContentManagement from '../Dashboard/ContentManagement/ContentManagement';
import AddBlogPage from '../Dashboard/AddBlogPage/AddBlogPage';
import ViewDetails from '../components/ViewDetails/ViewDetails';
import BlogDetails from '../components/BlogDetails/BlogDetails';
import DonationViewDetails from '../components/DonationViewDetails/DonationViewDetails';
import DonationRequestEdit from '../components/DonationRequestEdit/DonationRequestEdit';
import ElementsWrapper from '../components/ElementsWrapper/ElementsWrapper';
import LearnMore from '../components/LearnMore/LearnMore';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/donation-request',
        element: <DonationRequest />,
      },
      {
        path: '/why-donate',
        element: <LearnMore />,
      },
      {
        path: '/view-details/:_id',
        element: (
          <PrivateRoute>
            <ViewDetails />
          </PrivateRoute>
        ),
      },
      {
        path: '/blog',
        element: <Blog />,
      },
      {
        path: '/view-full-blog/:_id',
        element: <BlogDetails />,
      },
      {
        path: '/funding',
        element: <Funding />,
      },
      {
        path: '/checkout',
        element: <ElementsWrapper />,
      },
      {
        path: '/signin',
        element: <SignIn />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/search',
        element: <SearchPage />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: '/dashboard',
        element: <Board />,
      },
      {
        path: '/dashboard/view-details/:_id',
        element: <DonationViewDetails />,
      },
      {
        path: '/dashboard/edit/:_id',
        element: <DonationRequestEdit />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'all-users',
        element: <AllUsers />,
      },
      {
        path: 'all-blood-donation-request',
        element: <AllBloodDonationReq />,
      },
      {
        path: 'content-management',
        element: <ContentManagement />,
      },
      {
        path: 'content-management/add-blog',
        element: <AddBlogPage />,
      },
      {
        path: 'my-donation-request',
        element: <MyDonationReq />,
      },
      {
        path: 'create-donation-request',
        element: <CreateDonationReq />,
      },
    ],
  },
]);

export default router;
