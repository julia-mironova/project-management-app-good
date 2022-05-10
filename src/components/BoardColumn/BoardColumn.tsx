import { Box, IconButton, Paper, Stack, styled, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';
import { IColumn, ITask, IFileAttached } from '../pages/SingleBoardPage';
import ColumnTask from '../ColumnTask';

const BoardColumn = ({ column }: { column: IColumn }) => {
  const [isEdit, setIsEdit] = React.useState(false);

  const handleDeleteBoard = async () => {
    console.log('delete column');
  };

  const handleEditBoard = async () => {
    console.log('edit name of column');
    setIsEdit(false);
  };

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'left',
    paddingLeft: theme.spacing(2),
    color: theme.palette.text.secondary,
    height: 60,
    width: '100%',
    lineHeight: '60px',
    borderRadius: theme.shape.borderRadius,
  }));

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
        <IconButton aria-label="edit" onClick={() => setIsEdit(true)}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={handleDeleteBoard}>
          <DeleteIcon />
        </IconButton>
      </Box>
      {column.tasks
        .sort((a, b) => a.order - b.order)
        .map((task: ITask) => (
          <ColumnTask key={task.id} task={task} />
        ))}
    </Stack>
  );
};

export default BoardColumn;
