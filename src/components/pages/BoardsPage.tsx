import { Container, Button, Typography } from '@mui/material';

const BoardsPage = () => {
  return (
    <Container maxWidth="md" sx={{ mt: '1rem' }} data-testid="not-found-page">
      <Typography> Existing board</Typography>
      <Button>Create new board</Button>
    </Container>
  );
};

export default BoardsPage;
