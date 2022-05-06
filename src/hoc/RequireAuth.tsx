import { useLocation, Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux.hooks';

type RequireAuthProps = {
  children: JSX.Element;
};

const RequireAuth = ({ children }: RequireAuthProps) => {
  const location = useLocation();
  const { isLoggedIn } = useAppSelector((store) => store.auth);

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};
export default RequireAuth;
