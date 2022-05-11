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
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import dataPictures from '../../dataPictures';

interface IFormInput {
  title: string;
}

const FormCreateBoard: FC<{ onClose: () => void; handlerCreateBoard: (title: string) => void }> = ({
  onClose,
  handlerCreateBoard,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const [changedImg, setChangedImg] = useState(0);

  const onSubmit = (data: IFormInput) => {
    const titleWithBoardNumber = `${String(changedImg).padStart(2, '0')}${data.title}`;
    handlerCreateBoard(titleWithBoardNumber);
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
              value: 3,
              message: 'Your board name must be at least 3 characters long.',
            },
          })}
        />
        <Typography variant="body1" sx={{ color: 'red' }}>
          {errors?.title && errors?.title?.message}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit">Create board</Button>
      </DialogActions>
    </form>
  );
};

export { FormCreateBoard };
