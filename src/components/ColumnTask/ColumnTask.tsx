import { Box, IconButton, Paper, Stack, styled, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';
import { IColumn, ITask, IFileAttached } from '../pages/SingleBoardPage';

const ColumnTask = ({ task }: { task: ITask }) => {
  const [isEdit, setIsEdit] = React.useState(false);

  // const handleDeleteBoard = async () => {
  // };

  const handleEditBoard = async () => {
    setIsEdit(false);
  };

  const Task = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'left',
    paddingLeft: theme.spacing(2),
    color: theme.palette.text.secondary,
    height: 60,
    width: '100%',
    lineHeight: '60px',
    borderRadius: theme.shape.borderRadius,
  }));

  return <Task>{task.title}</Task>;
};

export default ColumnTask;
