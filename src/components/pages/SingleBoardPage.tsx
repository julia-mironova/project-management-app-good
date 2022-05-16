import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, Stack, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { getSingleBoard } from '../../store/slices/boardSlice';
import { updateColumn } from '../../store/slices/columnReducer';
import NewColumn from '../NewColumn';
import ModalWindow from '../ModalWindow';
import Column from '../Column';
import { IColumnsResp } from '../../utils/types/board';
import { getAllUsers } from '../../store/slices/userReducer';

const SingleBoardPage = () => {
  const [isOpenModalAddNewColumn, setIsOpenModalAddNewColumn] = useState(false);
  const { columns, title } = useAppSelector((state) => state.boards.singleBoard);
  const dispatch = useAppDispatch();
  const { boardId } = useParams();

  useEffect(() => {
    if (boardId) {
      dispatch(getSingleBoard(boardId));
    }
  }, [boardId, dispatch]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const onDragEnd = async (result: DropResult) => {
    const { destination, draggableId } = result;

    if (boardId && destination) {
      const draggableColumn = columns.find((column) => column.id === draggableId) as IColumnsResp;
      const oldOrder = draggableColumn.order;
      const newOrder = destination.index;
      const numChangedColumns = oldOrder - newOrder;

      await dispatch(
        updateColumn({
          boardId: boardId,
          columnId: draggableColumn.id,
          title: draggableColumn.title,
          order: 1000,
        })
      );
      if (numChangedColumns < 0) {
        for (let i = oldOrder + 1; i <= newOrder; i++) {
          const column = columns.find((column) => column.order === i) as IColumnsResp;
          if (column) {
            await dispatch(
              updateColumn({
                boardId: boardId,
                columnId: column.id,
                title: column.title,
                order: column.order - 1,
              })
            );
          }
        }
      } else if (numChangedColumns > 0) {
        for (let i = oldOrder - 1; i >= newOrder; i--) {
          const column = columns.find((column) => column.order === i) as IColumnsResp;
          if (column) {
            await dispatch(
              updateColumn({
                boardId: boardId,
                columnId: column.id,
                title: column.title,
                order: column.order + 1,
              })
            );
          }
        }
      }

      await dispatch(
        updateColumn({
          boardId: boardId,
          columnId: draggableColumn.id,
          title: draggableColumn.title,
          order: newOrder,
        })
      );
    }
  };

  return (
    <Container maxWidth={false} sx={{ mb: '1rem', height: 'calc(100vh - 157px)' }}>
      <Typography align="left" variant="h5" sx={{ m: 1, p: 0, fontWeight: 'bold' }}>
        {title.slice(2)}
      </Typography>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="columns" direction="horizontal">
          {(provided) => {
            return (
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                justifyContent="flex-start"
                alignItems="flex-start"
                sx={{ overflowX: 'auto', overflowY: 'hidden' }}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {[...columns]
                  .sort((a, b) => a.order - b.order)
                  .map((column: IColumnsResp) => (
                    <Column key={column.id} column={column} />
                  ))}
                {provided.placeholder}
                <Button
                  variant="outlined"
                  size="large"
                  sx={{ height: 50, minWidth: 300 }}
                  onClick={() => setIsOpenModalAddNewColumn(true)}
                >
                  + new colomn
                </Button>
              </Stack>
            );
          }}
        </Droppable>
      </DragDropContext>
      <ModalWindow open={isOpenModalAddNewColumn} onClose={() => setIsOpenModalAddNewColumn(false)}>
        <NewColumn onClose={() => setIsOpenModalAddNewColumn(false)} />
      </ModalWindow>
    </Container>
  );
};

export default SingleBoardPage;
