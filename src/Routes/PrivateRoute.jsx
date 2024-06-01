import { useContext } from 'react';
import { AuthContext } from '../Firebase/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../components/Spinner/Spinner';
function PrivateRoute({ children }) {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate to="/signin" state={location?.pathname} />;
}

export default PrivateRoute;
