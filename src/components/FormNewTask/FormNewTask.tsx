import { Button, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { ITask } from '../../types/board';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '../../hooks/redux.hooks';

type IFormInputNewTask = {
  title: string;
  description: string;
};

const FormNewTask = ({
  onClose,
  dataTasks,
  setDataTasks,
}: {
  onClose: () => void;
  dataTasks: ITask[];
  setDataTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputNewTask>();
  const { id } = useAppSelector((state) => state.auth);

  const onSubmit = (data: IFormInputNewTask) => {
    const maxOrder = dataTasks.reduce((acc, curr) => (acc > curr.order ? acc : curr.order), 0);

    const newTask = {
      id: `${Math.random()}`,
      title: data.title,
      description: data.description,
      order: maxOrder + 1,
      done: false,
      userId: id,
      files: [],
    };

    setDataTasks([...dataTasks, newTask]);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>Create new task</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          fullWidth={true}
          variant="outlined"
          error={errors.title ? true : false}
          helperText={errors.title ? errors.title.message : ''}
          sx={{ mb: 5 }}
          {...register('title', {
            required: { value: true, message: 'this field is required' },
            minLength: {
              value: 6,
              message: 'Your task name must be at least 6 characters long.',
            },
          })}
        />
        <TextField
          label="Description"
          fullWidth={true}
          multiline={true}
          rows={4}
          variant="outlined"
          {...register('description', { required: false })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit">Create task</Button>
      </DialogActions>
    </form>
  );
};

export default FormNewTask;
