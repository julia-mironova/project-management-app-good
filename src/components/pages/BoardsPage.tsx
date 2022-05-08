import { Container, Button, Typography } from '@mui/material';
import BoardPreview from '../BoardPreview';
import { useEffect, useState } from 'react';
import { GetBoards } from '../../utils/backAPI';
import ModalWindow from '../ModalWindow';
import FormNewBoard from '../FormNewBoard';

type IBoard = {
  id: string;
  title: string;
};

const BoardsPage = () => {
  const [dataBoards, setDataBoards] = useState<IBoard[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOnClose = () => {
    setIsOpenModal(false);
  };

  const start = async () => setDataBoards(await GetBoards());

  useEffect(() => {
    start();
  }, []);

  return (
    <Container
      maxWidth="xl"
      sx={{ mt: '1rem', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 5, p: 5 }}
      data-testid="not-found-page"
    >
      {dataBoards.map((item) => (
        <BoardPreview
          board={item}
          key={item.id}
          dataBoards={dataBoards}
          setDataBoards={setDataBoards}
        />
      ))}
      <Button variant="contained" onClick={() => setIsOpenModal(true)}>
        +
      </Button>
      <ModalWindow open={isOpenModal} onClose={handleOnClose}>
        <FormNewBoard
          onClose={handleOnClose}
          dataBoards={dataBoards}
          setDataBoards={setDataBoards}
        />
      </ModalWindow>
    </Container>
  );
};

export default BoardsPage;
