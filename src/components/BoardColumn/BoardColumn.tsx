import { Box, IconButton, Stack, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import { IColumn, ITask } from '../pages/SingleBoardPage';
import ColumnTask from '../ColumnTask';
import ModalWindow from '../ModalWindow';
import FormNewTask from '../FormNewTask';

const BoardColumn = ({
  column,
  dataBoard,
  setDataBoard,
}: {
  column: IColumn;
  dataBoard: IColumn[];
  setDataBoard: React.Dispatch<React.SetStateAction<IColumn[]>>;
}) => {
  const [isEdit, setIsEdit] = React.useState(false);
  const [isOpenModalAddNewTask, setisOpenModalAddNewTask] = React.useState(false);
  const [dataTasks, setDataTasks] = React.useState(column.tasks);

  const handleDeleteColumn = async () => {
    const newDataBoard = dataBoard.filter((col) => col.id !== column.id);
    setDataBoard(newDataBoard);
  };

  const handleEditBoard = async () => {
    setIsEdit(false);
  };

  return (
    <Stack
      spacing={2}
      sx={{
        width: '400px',
        border: '1px solid gray',
        borderRadius: 2,
        padding: 2,
        backgroundColor: 'lightgray',
        height: '81vh',
      }}
    >
      <Box sx={{ width: '100%' }}>
        <TextField
          defaultValue={column.title}
          disabled={!isEdit}
          autoFocus={isEdit}
          variant="standard"
          sx={{
            border: 0,
            textAlign: 'center',
            color: 'black',
            width: '78%',
            background: `${isEdit ? 'white' : 'lightgray'}`,
            borderRadius: 1,
          }}
          onClick={() => setIsEdit(true)}
          onBlur={handleEditBoard}
        />
        <IconButton aria-label="add new task" onClick={() => setisOpenModalAddNewTask(true)}>
          <AddIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={handleDeleteColumn}>
          <DeleteIcon />
        </IconButton>
      </Box>
      {dataTasks
        .sort((a, b) => a.order - b.order)
        .map((task: ITask) => (
          <ColumnTask key={task.id} task={task} />
        ))}
      <ModalWindow open={isOpenModalAddNewTask} onClose={() => setisOpenModalAddNewTask(false)}>
        <FormNewTask
          onClose={() => setisOpenModalAddNewTask(false)}
          dataTasks={dataTasks}
          setDataTasks={setDataTasks}
        />
      </ModalWindow>
    </Stack>
  );
};

export default BoardColumn;
