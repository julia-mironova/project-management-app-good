import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  ImageList,
  ImageListItem,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import dataPictures from '../../dataPictures';
import { CreateNewBoard } from '../../utils/backAPI';

interface IFormInput {
  title: string;
}

type IBoard = {
  id: string;
  title: string;
};

const FormNewBoard = ({
  onClose,
  dataBoards,
  setDataBoards,
}: {
  onClose: () => void;
  dataBoards: IBoard[];
  setDataBoards: React.Dispatch<React.SetStateAction<IBoard[]>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const [changedImg, setChangedImg] = useState(-1);

  const onSubmit = (data: IFormInput) => {
    data.title = changedImg + data.title;
    console.log('Create new board', data);
    CreateNewBoard(data.title);
    setDataBoards([...dataBoards, { id: data.title, title: data.title }]);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>Create new board</DialogTitle>
      <DialogContent>
        <ImageList sx={{ width: 500, height: 400, gap: 5 }} cols={4} rowHeight={130}>
          {dataPictures.map((item, i) => (
            <ImageListItem key={item} onClick={() => setChangedImg(i)}>
              <img
                src={item}
                alt="background"
                loading="lazy"
                style={
                  changedImg === i
                    ? {
                        borderRadius: 10,
                        borderColor: 'primary.main',
                        opacity: 0.5,
                      }
                    : {}
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Board name"
          type="text"
          fullWidth
          variant="standard"
          {...register('title', {
            required: { value: true, message: 'this field is required' },
            minLength: {
              value: 6,
              message: 'Your board name must be at least 6 characters long.',
            },
          })}
        />
        <Typography variant="body1" sx={{ color: 'red' }}>
          {errors?.title && (errors?.title?.message || 'Error')}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit">Create board</Button>
      </DialogActions>
    </form>
  );
};

export default FormNewBoard;
