import { Box, Button, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { IColumn } from '../pages/SingleBoardPage';
import React from 'react';
import { useForm } from 'react-hook-form';

type IFormInputNewTask = {
  title: string;
  description: string;
};

const FormNewColumn = ({
  onClose,
  dataColumns,
  setDataColumns,
}: {
  onClose: () => void;
  dataColumns: IColumn[];
  setDataColumns: React.Dispatch<React.SetStateAction<IColumn[]>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputNewTask>();

  const onSubmit = (data: IFormInputNewTask) => {
    const maxOrder = dataColumns.reduce((acc, curr) => (acc > curr.order ? acc : curr.order), 0);

    const newColumn = {
      id: `${Math.random()}`,
      title: data.title,
      order: maxOrder + 1,
      tasks: [],
    };

    setDataColumns([...dataColumns, newColumn]);
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
              minLength: {
                value: 6,
                message: 'Your column name must be at least 6 characters long.',
              },
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
