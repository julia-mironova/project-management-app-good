import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, Stack } from '@mui/material';
import FormNewColumn from '../FormNewColumn';
import ModalWindow from '../ModalWindow';

// import BoardColumn from '../BoardColumn';
// import { IColumn, IBoardFull } from '../../types/board';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { getAllColumns } from '../../store/slices/columnSlice';

const SingleBoardPage = () => {
  const [isOpenModalAddNewColumn, setIsOpenModalAddNewColumn] = useState(false);
  const { columns } = useAppSelector((state) => state.columns);
  const dispatch = useAppDispatch();
  const { boardId } = useParams();

  useEffect(() => {
    console.log('useEffect SingleBoardPage');
    if (boardId) {
      dispatch(getAllColumns(boardId));
    }
  }, [boardId]);

  // const startDataBoard: IBoardFull = {
  //   id: '9a111e19-24ec-43e1-b8c4-13776842b8d5',
  //   title: 'Homework tasks',
  //   columns: [
  //     {
  //       id: '7b0b41b3-c01e-4139-998f-3ff25d20dc4f',
  //       title: 'To do',
  //       order: 1,
  //       tasks: [
  //         {
  //           id: '6e3abe9c-ceb1-40fa-9a04-eb2b2184daf9',
  //           title: 'Task: pet the cat',
  //           order: 1,
  //           done: false,
  //           description: 'Domestic cat needs to be stroked gently',
  //           userId: 'b2d92061-7d23-4641-af52-dd39f95b99f8',
  //           files: [
  //             {
  //               filename: 'foto.jpg',
  //               fileSize: 6105000,
  //             },
  //             {
  //               filename: 'foto2.jpg',
  //               fileSize: 6105000,
  //             },
  //             {
  //               filename: 'foto3.jpg',
  //               fileSize: 6105000,
  //             },
  //             {
  //               filename: 'foto4.jpg',
  //               fileSize: 6105000,
  //             },
  //           ],
  //         },
  //         {
  //           id: '6e3abe9c-ceb1-40fa-9a04-eb2b5858daf9',
  //           title: 'Task: pet the dog',
  //           order: 2,
  //           done: true,
  //           description: 'Domestic dog needs to be stroked gently',
  //           userId: 'b2d92061-7d23-4641-af52-dd39f95b99f8',
  //           files: [
  //             {
  //               filename: 'foto.jpg',
  //               fileSize: 6105000,
  //             },
  //             {
  //               filename: 'foto2.jpg',
  //               fileSize: 3105000,
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       id: '7b0b41b3-c01e-4139-998f-3ff24165465f',
  //       title: 'Done',
  //       order: 2,
  //       tasks: [
  //         {
  //           id: '6e3abe9c-ceb1-40fa-9a04-eb2b2666daf9',
  //           title: 'Task: pet the mouse',
  //           order: 2,
  //           done: false,
  //           description: 'Domestic cat needs to be stroked gently',
  //           userId: 'b2d92061-7d23-4641-af52-dd39f95b99f8',
  //           files: [],
  //         },
  //         {
  //           id: '6e3abe9c-ceb1-40fa-9a04-eb2b2776daf9',
  //           title: 'Task: pet the bird',
  //           order: 1,
  //           done: false,
  //           description: 'Domestic cat needs to be stroked gently',
  //           userId: 'b2d92061-7d23-4641-af52-dd39f95b99f8',
  //           files: [],
  //         },
  //       ],
  //     },
  //   ],
  // };

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
          .map((column) => (
            <p key={column.id}>{column.title}</p>
            // <BoardColumn
            //   key={column.id}
            //   column={column}
            //   // dataColumns={dataColumns}
            //   // setDataColumns={setDataColumns}
            // />
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
