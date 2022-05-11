import { Card, CardContent, CardMedia, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { FC } from 'react';
import dataPictures from '../../dataPictures';
import { useNavigate } from 'react-router-dom';
import { IBoard } from '../../store/slice/boardSlice';

const BoardPreview: FC<{ board: IBoard; handlerDelete: (id: string) => void }> = ({
  board,
  handlerDelete,
}) => {
  const [isEdit, setIsEdit] = React.useState(false);
  const navigate = useNavigate();

  const handleEditBoard = async () => {
    setIsEdit(false);
  };

  return (
    <Card sx={{ maxWidth: 495, border: 2 }}>
      <CardMedia
        onClick={() => navigate(`/boards/${board.id}`)}
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
        <IconButton aria-label="delete" onClick={() => handlerDelete(board.id)}>
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="edit" onClick={() => setIsEdit(true)}>
          <EditIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default BoardPreview;
