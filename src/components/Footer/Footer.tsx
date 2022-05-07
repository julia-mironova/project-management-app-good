import {
  Container,
  Typography,
  BottomNavigation,
  Box,
  BottomNavigationAction,
  Link,
  Grid,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import rsLogo from '../../assets/svg/rs_school.svg';

const Footer = () => {
  const location = useLocation();
  const isMainPage = location.pathname === '/';
  return (
    <footer>
      <Box bgcolor={isMainPage ? 'primary.dark' : 'primary.main'} color="white">
        <Container maxWidth="xl">
          <Grid container spacing={1} justifyContent="space-between">
            <Grid item xs={12} md={6} lg={4}>
              <BottomNavigation
                sx={{
                  backgroundColor: isMainPage ? 'primary.dark' : 'primary.main',
                }}
              >
                <BottomNavigationAction
                  sx={{ transition: '.4s', '&:hover': { transform: 'scale(1.2)' } }}
                  icon={
                    <Link
                      href="https://github.com/BlackHatMan"
                      underline="none"
                      rel="noopener"
                      color="secondary.contrastText"
                    >
                      BlackHatMan
                    </Link>
                  }
                />
                <BottomNavigationAction
                  sx={{ transition: '.4s', '&:hover': { transform: 'scale(1.2)' } }}
                  icon={
                    <Link
                      href="https://github.com/EVG777-prog"
                      underline="none"
                      rel="noopener"
                      color="secondary.contrastText"
                    >
                      EVG777-prog
                    </Link>
                  }
                />
                <BottomNavigationAction
                  sx={{ transition: '.4s', '&:hover': { transform: 'scale(1.2)' } }}
                  icon={
                    <Link
                      href="https://github.com/VolhaBukhal"
                      underline="none"
                      rel="noopener"
                      color="secondary.contrastText"
                    >
                      VolhaBukhal
                    </Link>
                  }
                />
              </BottomNavigation>
            </Grid>
            <Grid
              container
              item
              xs={12}
              md={6}
              lg={4}
              columnSpacing={1}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                <BottomNavigationAction
                  icon={
                    <Link
                      href="https://rs.school/react/"
                      target="_blank"
                      rel="noreferrer"
                      sx={{ transition: '.4s', '&:hover': { bgcolor: 'primary.main' } }}
                    >
                      <img src={rsLogo} alt="rs-school logo"></img>
                    </Link>
                  }
                />
              </Grid>
              <Grid item lg={1}>
                <Typography>&copy;2022</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
