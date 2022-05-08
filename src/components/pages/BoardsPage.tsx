import { Container, Button, Typography } from '@mui/material';
import BoardPreview from '../BoardPreview';
import { useEffect, useState } from 'react';
import BackAPI from '../../utils/backAPI';
import ModalWindow from '../ModalWindow';

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

  const start = async () => setDataBoards(await BackAPI.getBoards());

  useEffect(() => {
    start();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: '1rem' }} data-testid="not-found-page">
      {dataBoards.map((item) => (
        <BoardPreview board={item} key={item.id} />
      ))}
      <Button variant="contained" onClick={() => setIsOpenModal(true)}>
        +
      </Button>
      <ModalWindow open={isOpenModal} onClose={handleOnClose}>
        <FormNewBoard onClose={handleOnClose} />
      </ModalWindow>
    </Container>
  );
};

export default BoardsPage;
