import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Button, Typography } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../hooks/redux.hooks';
import { setUser } from '../../store/auth/authSlice';

type LocationState = {
  from: Location;
};
const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAppSelector((store) => store.auth);
  const dispatch = useAppDispatch();

  const locationState = location.state as LocationState;
  const fromPage = locationState?.from?.pathname;

  useEffect(() => {
    if (isLoggedIn) {
      if (fromPage) {
        navigate(fromPage, { replace: true });
      } else {
        navigate('/');
      }
    }
  }, [isLoggedIn, navigate, fromPage]);

  return (
    <Container>
      Redirected to login page from:
      <p>{fromPage}</p>
      <p>Need to be log in first</p>
      <Button variant="contained" onClick={() => dispatch(setUser(true))}>
        make login true
      </Button>
      <Typography>isLoggedIn: {String(isLoggedIn)}</Typography>
    </Container>
  );
};

export default LoginPage;
