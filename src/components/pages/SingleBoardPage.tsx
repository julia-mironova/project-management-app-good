import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, Stack } from '@mui/material';
/* import FormNewColumn from '../FormNewColumn';
import ModalWindow from '../ModalWindow';
import Column from '../Column'; */
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { useTranslation } from 'react-i18next';
import { getAllColumns, updateAsyncColumn } from '../../store/slices/columnSlice';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { getSingleBoard } from '../../store/slices/boardSlice';
import FormNewColumn from '../FormNewColumn';
import ModalWindow from '../ModalWindow';
import Column from '../Column';

const SingleBoardPage = () => {
  const [isOpenModalAddNewColumn, setIsOpenModalAddNewColumn] = useState(false);
  const { columns } = useAppSelector((state) => state.boards.singleBoard.columns);
  const dispatch = useAppDispatch();
  const { boardId } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    if (boardId) {
      dispatch(getSingleBoard(boardId));
    }
  }, [boardId, dispatch]);
  console.log(singleBoard);

  const onDragEnd = async (result: DropResult) => {
    const { destination, draggableId } = result;

    if (boardId && destination) {
      const draggableColumn = columns.find((column) => column.id === draggableId) as IColumnsResp;
      const oldOrder = draggableColumn.order;
      const newOrder = destination.index;
      const numChangedColumns = draggableColumn?.order - newOrder;

      await dispatch(
        updateAsyncColumn({
          boardId: boardId,
          columnId: draggableColumn.id,
          columnBody: { title: draggableColumn.title, order: 1000 },
        })
      );
      if (numChangedColumns < 0) {
        for (let i = oldOrder; i <= newOrder; i++) {
          const column = columns.find((column) => column.order === i) as IColumnsResp;
          if (column) {
            await dispatch(
              updateAsyncColumn({
                boardId: boardId,
                columnId: column.id,
                columnBody: { title: column.title, order: column.order - 1 },
              })
            );
          }
        }
      } else if (numChangedColumns > 0) {
        for (let i = oldOrder; i >= newOrder; i--) {
          const column = columns.find((column) => column.order === i) as IColumnsResp;
          if (column) {
            await dispatch(
              updateAsyncColumn({
                boardId: boardId,
                columnId: column.id,
                columnBody: { title: column.title, order: column.order + 1 },
              })
            );
          }
        }
      }

      await dispatch(
        updateAsyncColumn({
          boardId: boardId,
          columnId: draggableColumn.id,
          columnBody: { title: draggableColumn.title, order: newOrder },
        })
      );

      dispatch(getAllColumns(boardId));
    }
  };

  // const [dataColumns, setDataColumns] = React.useState<IColumn[]>(startDataBoard.columns);

  return (
    <Container maxWidth={false} sx={{ mt: '1rem', height: '83.5vh' }}>
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
                    // <p key={column.id} onClick=>{column.title}</p>
                    <BoardColumn
                      key={column.id}
                      column={column}
                      // dataColumns={dataColumns}
                      // setCurColumnId={tCurColumnId(column.id)}
                      // this.props.onUpdateSalary(salary, id)
                    />
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
        <FormNewColumn onClose={() => setIsOpenModalAddNewColumn(false)} />
      </ModalWindow>
    </Container>
  );
};

export default SingleBoardPage;
