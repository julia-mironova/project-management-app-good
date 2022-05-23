import { Container, Button, Backdrop, CircularProgress } from '@mui/material';
import BoardPreview from '../BoardPreview';
import { useEffect, useState } from 'react';
import ModalWindow from '../ModalWindow';
import FormCreateBoard from '../FormCreateBoard';
import { useAppSelector, useAppDispatch } from '../../hooks/redux.hooks';
import { getAllBoards, deleteBoard, createBoard } from '../../store/slices/boardSlice';
import { useTranslation } from 'react-i18next';

const BoardsPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useAppDispatch();
  const { boards, pending } = useAppSelector((state) => state.boards);
  const { t } = useTranslation();

  const handleOnClose = () => {
    setOpenModal(false);
  };

  const handlerDelete = (id: string) => {
    dispatch(deleteBoard(id));
  };

  const handlerCreateBoard = (title: string) => {
    dispatch(createBoard(title));
  };

  useEffect(() => {
    if (boards.length === 0) dispatch(getAllBoards());
  }, [boards.length, dispatch]);

  return (
    <Container
      maxWidth="xl"
      sx={{
        mb: 2,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        gap: 5,
        p: 3,
        height: 'calc(100vh - 149px)',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '.7rem',
        },
        '&::-webkit-scrollbar-thumb ': {
          backgroundColor: '#c8c8c8',
          borderRadius: 2,
        },
        '&::-webkit-scrollbar-thumb:hover ': {
          backgroundColor: '#a8a8a8',
        },
      }}
    >
      {boards.map((item) => (
        <BoardPreview board={item} key={item.id} handlerDelete={handlerDelete} />
      ))}
      <Button
        variant="outlined"
        size="large"
        sx={{ height: 50, width: '100%', maxWidth: '21rem' }}
        onClick={() => setOpenModal(true)}
      >
        {t('BOARD.NEW_BOARD')}
      </Button>
      <ModalWindow open={openModal} onClose={handleOnClose}>
        <FormCreateBoard onClose={handleOnClose} handlerCreateBoard={handlerCreateBoard} />
      </ModalWindow>
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={pending}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default BoardsPage;
