import { Container, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Page404 = () => {
  const { t } = useTranslation();
  return (
    <Container
      maxWidth="lg"
      sx={{
        height: 'calc(100vh - 132.5px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h6" mb={2} sx={{ color: 'gray' }}>
        {t('NOT_FOUND_PAGE')}
      </Typography>
      <Button variant="contained" component={Link} to="/">
        {t('BACK_TO_MAIN')}
      </Button>
    </Container>
  );
};

export default Page404;
