import { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  Menu,
  Button,
  MenuItem,
  Tooltip,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAppSelector, useAppDispatch } from '../../hooks/redux.hooks';
import { generateUserInitials } from '../../utils/generateUserInitials';
import { logOut } from '../../store/slices/authSlice';
import LanguageMenu from '../../components/LanguageMenu';
import { useTranslation, TFuncKey } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const { isLoggedIn, name } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const setStickyHeader = () => {
    if (window.scrollY >= 60) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', setStickyHeader);
    return () => {
      window.removeEventListener('scroll', setStickyHeader);
    };
  }, [isSticky]);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const pages: Array<{ page: TFuncKey; path: string }> = [
    { page: 'HEADER.WELCOME', path: '/' },
    { page: 'HEADER.BOARDS', path: '/boards' },
    { page: 'HEADER.EDIT_PROFILE', path: '/edit-profile' },
  ];

  const settings: Array<{ page: TFuncKey; path: string }> = [
    { page: 'AUTH.LOG_IN', path: '/login' },
    { page: 'AUTH.SIGN_UP', path: '/signup' },
  ];

  return (
    <AppBar
      position="static"
      sx={{
        position: 'sticky',
        top: 0,
        height: isSticky ? '65px' : '',
        backgroundColor: isSticky ? '#0F23F5' : '',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color: 'white' }}
          >
            RSS-trello
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: 'white' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(({ page, path }) => (
                <MenuItem key={page} onClick={handleCloseNavMenu} component={NavLink} to={path}>
                  <Typography textAlign="center">{t(`${page}`)}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, color: 'white' }}
          >
            RSS-trello
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(({ page, path }) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  textDecoration: location.pathname === path ? 'underline' : '',
                  transition: '.4s',
                  '&:hover': { color: 'primary.contrastText' },
                }}
                component={NavLink}
                to={path}
              >
                {t(`${page}`)}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <LanguageMenu />
          </Box>
          <Box sx={{ flexGrow: 0 }}>
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
                      width: '50px',
                      height: '50px',
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
                    width: '3rem',
                    height: '3rem',
                    marginLeft: '1rem',
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
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
