import { Container, Button, Typography } from '@mui/material';

const BoardsPage = () => {
  const isAuth = true;
  return (
    <Container maxWidth="md" sx={{ mt: '1rem' }} data-testid="not-found-page">
      {isAuth && (
        <>
          <Typography> Existing board</Typography>
          <Button>Create new board</Button>
        </>
      )}
    </Container>
  );
};

export default BoardsPage;
