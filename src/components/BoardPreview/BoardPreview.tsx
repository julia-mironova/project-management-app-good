import { Card, CardActionArea, CardContent, CardMedia, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';
import dataPictures from '../dataPictures';
import BackAPI from '../backAPI';

type IBoard = {
  id: string;
  title: string;
};

const BoardPreview = ({ board }: { board: IBoard }) => {
  const handleDeleteBoard = async () => {
    console.log('Delete board', board);
    await BackAPI.deleteBoard(board.id);
  };

  const handleEditBoard = async () => {
    console.log('Edit board', board);
  };

  return (
    <Card sx={{ maxWidth: 495, border: 2 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={`pictures/${dataPictures[+board.title?.slice(0, 2)]}`}
          alt={board.id}
          sx={{ pt: 5, pl: 0, pr: 5, pb: 0 }}
        />
        <CardContent>
          <TextField
            defaultValue={board.title.slice(2)}
            disabled
            variant="standard"
            sx={{
              border: 0,
              textAlign: 'center',
              color: 'black',
            }}
          />
          <IconButton aria-label="delete" onClick={handleDeleteBoard}>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="edit" onClick={handleEditBoard}>
            <EditIcon />
          </IconButton>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BoardPreview;
