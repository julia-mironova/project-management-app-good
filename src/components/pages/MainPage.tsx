import { Container, Typography, Grid, CardMedia, CardContent, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import bgImage from '../../assets/images/bg.jpg';

const MainPage = () => {
  return (
    <>
      <Container>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          maxWidth="lg"
          sx={{ height: '95vh' }}
        >
          <Grid item sm={12} md={5}>
            <Typography
              variant="h3"
              component="h1"
              color="primary.dark"
              sx={{ fontWeight: '700', marginBlock: '2rem' }}
            >
              We help to organize your work!
            </Typography>
            <Typography variant="h6" component="div" color="primary.contrastText">
              Welcome to project management application.
              <Typography>We create for you a convenient way to plan your business.</Typography>
              <Typography>Track all the tasks and miss nothing!</Typography>
            </Typography>
          </Grid>
          <Grid item sm={12} md={7} mt={1}>
            <img
              src={bgImage}
              alt="main page bg"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            ></img>
          </Grid>
        </Grid>
        <Typography variant="h3" component="h2" align="center" mt={2} mb={2} color="primary.dark">
          Out team
        </Typography>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          maxWidth="lg"
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item md={4}>
            <CardMedia component="img" height="250" image={bgImage} alt="team member picture" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" color="primary.contrastText">
                Victor
              </Typography>
              <Grid container>
                <Typography variant="h6" color="text.secondary" mr={1}>
                  Team Lead
                </Typography>
                <Link
                  href="https://github.com/BlackHatMan"
                  target="_blank"
                  sx={{
                    transition: '.4s',
                    color: 'secondary.main',
                    '&:hover': { color: 'primary.contrastText' },
                  }}
                >
                  <GitHubIcon />
                </Link>
              </Grid>
              <Typography variant="body2" color="text.secondary">
                Add some text about impact or in general som information about team member. Probably
                a story of becoming of developer.
              </Typography>
            </CardContent>
          </Grid>
          <Grid item md={4}>
            <CardMedia component="img" height="250" image={bgImage} alt="team member picture" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" color="primary.contrastText">
                Olga
              </Typography>
              <Grid container>
                <Typography variant="h6" color="text.secondary" mr={1}>
                  Developer
                </Typography>
                <Link
                  href="https://github.com/VolhaBukhal"
                  target="_blank"
                  sx={{
                    transition: '.4s',
                    color: 'secondary.main',
                    '&:hover': { color: 'primary.contrastText' },
                  }}
                >
                  <GitHubIcon />
                </Link>
              </Grid>
              <Typography variant="body2" color="text.secondary">
                Add some text about impact or in general som information about team member. Probably
                a story of becoming of developer.
              </Typography>
            </CardContent>
          </Grid>
          <Grid item md={4}>
            <CardMedia component="img" height="250" image={bgImage} alt="team member picture" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" color="primary.contrastText">
                Evgeniy
              </Typography>
              <Grid container>
                <Typography variant="h6" color="text.secondary" mr={1}>
                  Developer
                </Typography>
                <Link
                  href="https://github.com/EVG777-prog"
                  target="_blank"
                  sx={{
                    transition: '.4s',
                    color: 'secondary.main',
                    '&:hover': { color: 'primary.contrastText' },
                  }}
                >
                  <GitHubIcon />
                </Link>
              </Grid>
              <Typography variant="body2" color="text.secondary">
                Add some text about impact or in general som information about team member. Probably
                a story of becoming of developer.
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MainPage;
