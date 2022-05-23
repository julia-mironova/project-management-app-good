import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Box, Tooltip, IconButton, Typography, Menu, MenuItem } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { TFuncKey, useTranslation } from 'react-i18next';
import { generateUserInitials } from '../../utils/generateUserInitials';
import { logOut } from '../../store/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';

export const LoginMenu = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { isLoggedIn, name } = useAppSelector((state) => state.auth);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settings: Array<{ page: TFuncKey; path: string }> = [
    { page: 'AUTH.LOG_IN', path: '/login' },
    { page: 'AUTH.SIGN_UP', path: '/signup' },
  ];

  return (
    <div>
      <Tooltip title={t('HEADER.OPEN_SETTINGS')}>
        <IconButton
          onClick={(e) => {
            isLoggedIn ? navigate('/edit-profile') : handleOpenUserMenu(e);
          }}
          sx={{ p: 0 }}
        >
          {isLoggedIn ? (
            <Box
              justifyContent="center"
              alignItems="center"
              sx={{
                display: 'flex',
                width: { xs: '2rem', sm: '3rem' },
                height: { xs: '2rem', sm: '3rem' },
                borderRadius: '50%',
                bgcolor: 'white',
                transition: '.4s',
                '&:hover': { bgcolor: 'primary.contrastText' },
              }}
            >
              <Typography
                color="primary.contrastText"
                sx={{
                  fontWeight: '700',
                  fontSize: '1.25rem',
                  transition: '.4s',
                  '&:hover': { color: 'white' },
                }}
              >
                {name && generateUserInitials(name)}
              </Typography>
            </Box>
          ) : (
            <AccountCircleIcon
              sx={{
                color: 'white',
                width: '3rem',
                height: '3rem',
                transition: '.4s',
                '&:hover': { color: 'primary.contrastText' },
              }}
            />
          )}
        </IconButton>
      </Tooltip>
      <IconButton
        sx={{ p: 0 }}
        onClick={() => {
          dispatch(logOut());
        }}
      >
        {isLoggedIn && (
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
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map(({ page, path }) => (
          <MenuItem key={page} onClick={handleCloseUserMenu} component={NavLink} to={path}>
            <Typography textAlign="center">{t(`${page}`)}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
