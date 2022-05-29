import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IconButton, Typography, Menu, MenuItem } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { TFuncKey, useTranslation } from 'react-i18next';
import { logOut } from '../../store/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import HeaderTooltip from './HeaderTooltip';

const LoginMenu = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const settings: Array<{ page: TFuncKey; path: string }> = [
    { page: 'AUTH.LOG_IN', path: '/signin' },
    { page: 'AUTH.SIGN_UP', path: '/signup' },
  ];

  return (
    <div>
      <HeaderTooltip openMenu={handleOpenUserMenu} />
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

export default LoginMenu;
