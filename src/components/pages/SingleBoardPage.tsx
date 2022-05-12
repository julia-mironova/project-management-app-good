import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, Stack } from '@mui/material';
import FormNewColumn from '../FormNewColumn';
import ModalWindow from '../ModalWindow';

import BoardColumn from '../BoardColumn';
import { IColumnsResp } from '../../types/board';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { useTranslation } from 'react-i18next';
import { getAllColumns, updateAsyncColumn } from '../../store/slices/columnSlice';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { DropResult } from 'react-beautiful-dnd';

const SingleBoardPage = () => {
  const [isOpenModalAddNewColumn, setIsOpenModalAddNewColumn] = useState(false);
  const { columns } = useAppSelector((state) => state.columns);
  const dispatch = useAppDispatch();
  const { boardId } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    if (boardId) {
      dispatch(getAllColumns(boardId));
    }
  }, [boardId, dispatch]);

  console.log(columns);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    console.log(result);
    console.log(destination);
    console.log(draggableId);
    if (boardId && destination) {
      columns.forEach((column) => {
        if (column.id === draggableId) {
          dispatch(
            updateAsyncColumn({
              boardId: boardId,
              columnId: column.id,
              columnBody: { title: column.title, order: destination.index },
            })
          );
        } else if (column.order >= source.index) {
          dispatch(
            updateAsyncColumn({
              boardId: boardId,
              columnId: column.id,
              columnBody: { title: column.title, order: column.order + 1 },
            })
          );
        }
      });
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
                {provided.placeholder}
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
        <FormNewColumn
          onClose={() => setIsOpenModalAddNewColumn(false)}
          // dataColumns={dataColumns}
          // setDataColumns={setDataColumns}
        />
      </ModalWindow>
    </Container>
  );
};

export default SingleBoardPage;
