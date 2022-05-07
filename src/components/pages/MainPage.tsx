import { Container, Typography, Grid, CardMedia, CardContent } from '@mui/material';
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
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
            <CardMedia
              component="img"
              height="140"
              image="/static/images/cards/contemplative-reptile.jpg"
              alt="team member picture"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" color="primary.contrastText">
                Victor
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Team Lead
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Add some text about impact or in general som information about team member. Probably
                a story of becoming of developer.
              </Typography>
            </CardContent>
          </Grid>
          <Grid item md={4}>
            <CardMedia
              component="img"
              height="140"
              image="/static/images/cards/contemplative-reptile.jpg"
              alt="team member picture"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" color="primary.contrastText">
                Olga
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Developer
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Add some text about impact or in general som information about team member. Probably
                a story of becoming of developer.
              </Typography>
            </CardContent>
          </Grid>
          <Grid item md={4}>
            <CardMedia
              component="img"
              height="140"
              image="/static/images/cards/contemplative-reptile.jpg"
              alt="team member picture"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" color="primary.contrastText">
                Evgeniy
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Developer
              </Typography>
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
