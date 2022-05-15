import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, Stack, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { getSingleBoard } from '../../store/slices/boardSlice';
import { updateColumn, updateDrag } from '../../store/slices/columnReducer';
import NewColumn from '../NewColumn';
import ModalWindow from '../ModalWindow';
import Column from '../Column';
import { IColumnsResp } from '../../utils/types/board';
import { getAllUsers } from '../../store/slices/userReducer';
import { useTranslation } from 'react-i18next';

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

  const { t } = useTranslation();


  const onDragEnd = async (result: DropResult) => {
    const { destination, draggableId } = result;

    if (boardId && destination) {
      const draggableColumn = columns.find((column) => column.id === draggableId) as IColumnsResp;
      const oldOrder = draggableColumn.order;
      const newOrder = destination.index;
      const numChangedColumns = oldOrder - newOrder;

      if (numChangedColumns < 0) {
        const other = columns.filter((el) => el.id !== draggableColumn.id);
        const allNewColumns = other.map((el) =>
          el.order <= newOrder && el.order > oldOrder ? { ...el, order: el.order - 1 } : el
        );
        const oldColumn = Object.assign({}, draggableColumn, { order: newOrder });
        allNewColumns.push(oldColumn);
        dispatch(updateDrag(allNewColumns));
      } else if (numChangedColumns > 0) {
        const other = columns.filter((el) => el.id !== draggableColumn.id);
        const allNewColumns = other.map((el) =>
          el.order >= newOrder && el.order < oldOrder ? { ...el, order: el.order + 1 } : el
        );
        const oldColumn = Object.assign({}, draggableColumn, { order: newOrder });
        allNewColumns.push(oldColumn);
        dispatch(updateDrag(allNewColumns));
      }

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

  const getImageNumber = (title: string) => {
    const num = title.slice(0, 2);
    return num[0] === '0' ? num[1] : num;
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        height: 'calc(100vh - 157px)',
        background: `url('${process.env.PUBLIC_URL}/pictures/background${getImageNumber(
          title
        )}.jpg')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Typography align="left" variant="h5" color="white" sx={{ p: 1, fontWeight: 'bold' }}>
        {t('BOARD.BOARD')} {title.slice(2)}
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
                  sx={{
                    height: 50,
                    minWidth: 300,
                    backgroundColor: 'rgba(213, 217, 233, .7)',
                    '&:hover': { backgroundColor: 'rgb(213, 217, 233)' },
                  }}
                  onClick={() => setIsOpenModalAddNewColumn(true)}
                >
                  {t('COLUMN.NEW_COLUMN')}
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
