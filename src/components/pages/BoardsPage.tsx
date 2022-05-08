import { Container, Button, Typography } from '@mui/material';

const BoardsPage = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{ mt: '1rem', pb: 3, height: 'calc(100vh - 148px)' }}
      data-testid="not-found-page"
    >
      <Typography> Existing board</Typography>
      <Button>Create new board</Button>
    </Container>
  );
};

export default BoardsPage;
