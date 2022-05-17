import { Container, Typography, Grid, CardMedia, CardContent, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import bgImage from '../../assets/images/bg.jpg';
import { useTranslation } from 'react-i18next';

const WelcomePage = () => {
  const { t } = useTranslation();
  const developers = [
    {
      name: `${t('DEVELOPERS.VICTOR')}`,
      role: `${t('DEVELOPERS.TEAM_L')}`,
      lingGH: 'https://github.com/BlackHatMan',
      description: `${t('DEVELOPERS.DESCR_VICTOR')}`,
    },
    {
      name: `${t('DEVELOPERS.OLGA')}`,
      role: `${t('DEVELOPERS.DEVELOPER')}`,
      lingGH: 'https://github.com/VolhaBukhal',
      description: `${t('DEVELOPERS.DESCR_OLGA')}`,
    },
    {
      name: `${t('DEVELOPERS.EVGENIY')}`,
      role: `${t('DEVELOPERS.DEVELOPER')}`,
      lingGH: 'https://github.com/EVG777-prog',
      description: `${t('DEVELOPERS.DESCR_EVGENIY')}`,
    },
  ];
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
              {t('WELCOME.TITLE')}
            </Typography>
            <Typography variant="h6" component="div" color="primary.contrastText">
              {t('WELCOME.SUBTITLE')}
              <Typography>{t('WELCOME.INFO')}</Typography>
              <Typography>{t('WELCOME.DESCR')}</Typography>
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
          {t('DEVELOPERS.TEAM')}
        </Typography>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          maxWidth="lg"
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {developers.map((developer) => (
            <Grid item md={4} key={developer.name}>
              <CardMedia component="img" height="250" image={bgImage} alt={developer.name} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" color="primary.contrastText">
                  {developer.name}
                </Typography>
                <Grid container>
                  <Typography variant="h6" color="text.secondary" mr={1}>
                    {developer.role}
                  </Typography>
                  <Link
                    href={developer.lingGH}
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
                  {developer.description}
                </Typography>
              </CardContent>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default WelcomePage;
