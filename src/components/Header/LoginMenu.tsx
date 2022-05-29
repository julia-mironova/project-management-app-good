import { useNavigate } from 'react-router-dom';
import { IconButton, Button, ButtonGroup, useMediaQuery } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { logOut } from '../../store/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import HeaderTooltip from './HeaderTooltip';
import { useTranslation } from 'react-i18next';

const LoginMenu = () => {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const matches = useMediaQuery('(max-width:600px)');
  const { t } = useTranslation();

  return (
    <div>
      {!matches && <HeaderTooltip />}
      <IconButton
        sx={{ p: 0 }}
        onClick={() => {
          dispatch(logOut());
        }}
      >
        {isLoggedIn && !matches && (
          <LogoutIcon
            sx={{
              color: 'white',
              width: { xs: '2rem', sm: '3rem' },
              height: '3rem',
              marginLeft: { xs: '0.5rem', sm: '1rem' },
              transition: '.4s',
              '&:hover': { color: 'primary.contrastText' },
            }}
          />
        )}
      </IconButton>
      <ButtonGroup variant="outlined" color="secondary" aria-label="large contained button group">
        {isLoggedIn ? (
          <>
            <Button
              onClick={() => navigate('/boards')}
              sx={{
                '@media only screen and (max-width: 450px)': {
                  p: 0,
                  m: 0.5,
                },
              }}
            >
              {t('GO_TO_MAIN')}
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => navigate('/signin')}
              sx={{
                '@media only screen and (max-width: 450px)': {
                  p: 0,
                  ml: 0.5,
                },
              }}
            >
              {t('LOGIN.HEADER')}
            </Button>
            <Button
              onClick={() => navigate('/signup')}
              sx={{
                '@media only screen and (max-width: 450px)': {
                  p: 0,
                  mr: 0.5,
                },
              }}
            >
              {t('SIGNUP.HEADER')}
            </Button>
          </>
        )}
      </ButtonGroup>
    </div>
  );
};

export default LoginMenu;
