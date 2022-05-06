import { Container, Button, Typography } from '@mui/material';
import { useAppSelector } from '../../hooks/redux.hooks';

const BoardsPage = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  return (
    <Container maxWidth="md" sx={{ mt: '1rem' }} data-testid="not-found-page">
      {isLoggedIn && (
        <>
          <Typography> Existing board</Typography>
          <Button>Create new board</Button>
        </>
      )}
    </Container>
  );
};

export default BoardsPage;
