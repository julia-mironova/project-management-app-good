import { Container, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <Container maxWidth="md" sx={{ mt: '1rem' }} data-testid="not-found-page">
      <Typography variant="h6">No match in url</Typography>
      <Button variant="contained" component={Link} to="/">
        Back to main page
      </Button>
    </Container>
  );
};

export default Page404;
