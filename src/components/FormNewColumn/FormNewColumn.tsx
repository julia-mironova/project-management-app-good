import { Box, Button, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
// import { IColumn } from '../../types/board';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { createColumn } from '../../store/slices/columnSlice';

type IFormInputNewTask = {
  title: string;
  description: string;
};

const FormNewColumn = ({ onClose }: { onClose: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputNewTask>();

  const { columns } = useAppSelector((state) => state.columns);
  const dispatch = useAppDispatch();
  const { boardId } = useParams();

  const onSubmit = (data: IFormInputNewTask) => {
    const maxOrder = columns.length;
    const newColumn = {
      title: data.title,
      order: maxOrder + 1,
    };
    if (boardId) {
      dispatch(createColumn({ boardId: boardId, columnBody: newColumn }));
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ width: '400px' }}>
        <DialogTitle>Create new column</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth={true}
            variant="outlined"
            error={errors.title ? true : false}
            helperText={errors.title ? errors.title.message : ''}
            {...register('title', {
              required: { value: true, message: 'this field is required' },
            })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Create column</Button>
        </DialogActions>
      </Box>
    </form>
  );
};

export default FormNewColumn;
