import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, Stack } from '@mui/material';
import FormNewColumn from '../FormNewColumn';
import ModalWindow from '../ModalWindow';

import BoardColumn from '../BoardColumn';
import { IColumnsResp } from '../../types/board';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { getAllColumns } from '../../store/slices/columnSlice';

const SingleBoardPage = () => {
  const [isOpenModalAddNewColumn, setIsOpenModalAddNewColumn] = useState(false);
  const { columns } = useAppSelector((state) => state.columns);
  const dispatch = useAppDispatch();
  const { boardId } = useParams();

  useEffect(() => {
    if (boardId) {
      dispatch(getAllColumns(boardId));
    }
  }, [boardId, dispatch]);

  // const [dataColumns, setDataColumns] = React.useState<IColumn[]>(startDataBoard.columns);

  return (
    <Container maxWidth={false} sx={{ mt: '1rem', height: '83.5vh' }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        justifyContent="flex-start"
        sx={{ overflowX: 'scroll', overflowY: 'hidden' }}
      >
        {columns
          // .sort((a, b) => a.order - b.order)
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
