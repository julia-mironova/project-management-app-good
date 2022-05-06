import { useLocation, useNavigate } from 'react-router-dom';

type LocationState = {
  from: Location;
};
const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const locationState = location.state as LocationState; // .from?.pathname || '/';
  const fromPage = locationState?.from?.pathname;

  return (
    <h1>
      Redirected to login page from:
      <p>{fromPage}</p>
      <p>Need to be log in first</p>
    </h1>
  );
};

export default LoginPage;
