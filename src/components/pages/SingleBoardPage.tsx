import { Box, Button, Container, IconButton, Paper, Stack, styled, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';
import BoardColumn from '../BoardColumn';

export type IFileAttached = {
  filename: string;
  fileSize: number;
};

export type ITask = {
  id: string;
  title: string;
  order: number;
  done: boolean;
  description: string;
  userId: string;
  files: IFileAttached[];
};

export type IColumn = {
  id: string;
  title: string;
  order: number;
  tasks: ITask[];
};

export type IBoardFull = {
  id: string;
  title: string;
  columns: IColumn[];
};

const SingleBoardPage = () => {
  const startDataBoard: IBoardFull = {
    id: '9a111e19-24ec-43e1-b8c4-13776842b8d5',
    title: 'Homework tasks',
    columns: [
      {
        id: '7b0b41b3-c01e-4139-998f-3ff25d20dc4f',
        title: 'To do',
        order: 1,
        tasks: [
          {
            id: '6e3abe9c-ceb1-40fa-9a04-eb2b2184daf9',
            title: 'Task: pet the cat',
            order: 1,
            done: false,
            description: 'Domestic cat needs to be stroked gently',
            userId: 'b2d92061-7d23-4641-af52-dd39f95b99f8',
            files: [
              {
                filename: 'foto.jpg',
                fileSize: 6105000,
              },
            ],
          },
          {
            id: '6e3abe9c-ceb1-40fa-9a04-eb2b5858daf9',
            title: 'Task: pet the dog',
            order: 2,
            done: true,
            description: 'Domestic dog needs to be stroked gently',
            userId: 'b2d92061-7d23-4641-af52-dd39f95b99f8',
            files: [
              {
                filename: 'foto.jpg',
                fileSize: 6105000,
              },
            ],
          },
        ],
      },
      {
        id: '7b0b41b3-c01e-4139-998f-3ff24165465f',
        title: 'Done',
        order: 2,
        tasks: [
          {
            id: '6e3abe9c-ceb1-40fa-9a04-eb2b2666daf9',
            title: 'Task: pet the mouse',
            order: 2,
            done: false,
            description: 'Domestic cat needs to be stroked gently',
            userId: 'b2d92061-7d23-4641-af52-dd39f95b99f8',
            files: [],
          },
          {
            id: '6e3abe9c-ceb1-40fa-9a04-eb2b2776daf9',
            title: 'Task: pet the bird',
            order: 1,
            done: false,
            description: 'Domestic cat needs to be stroked gently',
            userId: 'b2d92061-7d23-4641-af52-dd39f95b99f8',
            files: [],
          },
        ],
      },
    ],
  };

  const [dataBoard, setDataBoard] = React.useState<IColumn[]>(startDataBoard.columns);

  return (
    <Container maxWidth="xl" sx={{ mt: '1rem', height: '83.5vh' }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        justifyContent="flex-start"
      >
        {dataBoard
          .sort((a, b) => a.order - b.order)
          .map((column) => (
            <BoardColumn key={column.id} column={column} />
          ))}
        <Button variant="outlined" size="large" sx={{ height: 50, width: 300 }}>
          + new colomn
        </Button>
      </Stack>
    </Container>
  );
};

export default SingleBoardPage;
