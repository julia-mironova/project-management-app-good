import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  Menu,
  Button,
  MenuItem,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageMenu from '../../components/LanguageMenu';
import { useTranslation, TFuncKey } from 'react-i18next';
import { LOGO } from '../../constants/constants';
import { LoginMenu } from './LoginMenu';

const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [isSticky, setIsSticky] = useState<boolean>(false);

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

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const pages: Array<{ page: TFuncKey; path: string }> = [
    { page: 'HEADER.WELCOME', path: '/' },
    { page: 'HEADER.BOARDS', path: '/boards' },
    { page: 'HEADER.EDIT_PROFILE', path: '/edit-profile' },
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
      <Container maxWidth="xl" sx={{ p: { xs: 0, sm: 1 } }}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color: 'white' }}
          >
            {LOGO}
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
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, color: 'white' }}
          >
            {LOGO}
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
          <LanguageMenu />
          <LoginMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
