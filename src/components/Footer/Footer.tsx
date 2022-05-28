import {
  Container,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  Link,
  Grid,
} from '@mui/material';
import rsLogo from '../../assets/svg/rs_school.svg';
import { DEVELOPERS_GH, mainBgColor } from '../../constants/constants';

const Footer = () => {
  return (
    <footer>
      <Container maxWidth="xl" sx={{ color: 'white', backgroundColor: mainBgColor }}>
        <Grid container justifyContent="space-between">
          <Grid container item xs={12} md={6} lg={4} p={0}>
            <BottomNavigation
              sx={{
                backgroundColor: mainBgColor,
                width: '50rem',
                display: 'flex',
                justifyContent: 'start',
                '@media only screen and (max-width: 900px)': {
                  justifyContent: 'center',
                },
              }}
            >
              {DEVELOPERS_GH.map((dev) => (
                <BottomNavigationAction
                  key={dev.name}
                  sx={{
                    transition: '.4s',
                    '&:hover': { transform: 'scale(1.2)' },
                  }}
                  icon={
                    <Link
                      href={dev.lingGH}
                      underline="none"
                      rel="noopener"
                      color="secondary.contrastText"
                      target="_blank"
                    >
                      {dev.name}
                    </Link>
                  }
                />
              ))}
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
            justifyContent="end"
            sx={{
              '@media only screen and (max-width: 900px)': {
                justifyContent: 'space-evenly',
              },
            }}
          >
            <Grid item lg={6}>
              <BottomNavigationAction
                icon={
                  <Link
                    href="https://rs.school/react/"
                    target="_blank"
                    rel="noreferrer"
                    sx={{
                      transition: '.4s',
                      '&:hover': { transform: 'scale(0.9)' },
                    }}
                  >
                    <img src={rsLogo} alt="rs-school logo"></img>
                  </Link>
                }
              />
            </Grid>
            <Grid item lg={3}>
              <Typography textAlign="end">&copy;2022</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
