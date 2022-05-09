import { Card, CardActionArea, CardContent, CardMedia, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';
import dataPictures from '../../dataPictures';
import { DeleteBoard } from '../../utils/backAPI';

type IBoard = {
  id: string;
  title: string;
};

const BoardPreview = ({
  board,
  dataBoards,
  setDataBoards,
}: {
  board: IBoard;
  dataBoards: IBoard[];
  setDataBoards: React.Dispatch<React.SetStateAction<IBoard[]>>;
}) => {
  const [isEdit, setIsEdit] = React.useState(false);

  const handleDeleteBoard = async () => {
    await DeleteBoard(board.id);
    setDataBoards(dataBoards.filter((b) => b.id !== board.id));
  };

  const handleEditBoard = async () => {
    setIsEdit(false);
  };

  return (
    <Card sx={{ maxWidth: 495, border: 2 }}>
      <CardActionArea component="div">
        <CardMedia
          component="img"
          height="140"
          image={dataPictures[+board.title?.slice(0, 2)]}
          alt="background"
          sx={{ pt: 2, pl: 2, pr: 2, pb: 0 }}
        />
        <CardContent sx={{ pt: 2, pl: 3, pr: 2, pb: 2 }}>
          <TextField
            defaultValue={board.title.slice(2)}
            disabled={!isEdit}
            autoFocus={isEdit}
            variant="standard"
            sx={{
              border: 0,
              textAlign: 'center',
              color: 'black',
            }}
            onSubmit={handleEditBoard}
          />
          <IconButton aria-label="delete" onClick={handleDeleteBoard}>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="edit" onClick={() => setIsEdit(true)}>
            <EditIcon />
          </IconButton>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BoardPreview;
