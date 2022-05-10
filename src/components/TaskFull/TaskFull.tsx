import {
  Box,
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from '@mui/material';
import { IFileAttached, ITask } from '../pages/SingleBoardPage';
import React from 'react';
import { useForm } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';

type IFormTaskData = {
  title: string;
  description: string;
  done: boolean;
  files: IFileAttached;
};

type IFormInputFile = {
  file?: File;
  filename: string;
  fileSize: number;
};

const TaskFull = ({
  onClose,
  task,
  dataTasks,
  setDataTasks,
}: {
  onClose: () => void;
  task: ITask;
  dataTasks: ITask[];
  setDataTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormTaskData>();

  const [downloadFiles, setDownloadFiles] = React.useState<IFormInputFile[]>(task.files);
  const [checkedDone, setCheckedDone] = React.useState(task.done);

  const onSubmit = (data: IFormTaskData) => {
    const newFiles: IFileAttached[] = downloadFiles.map((item) => ({
      filename: item.filename,
      fileSize: item.fileSize,
    }));

    console.log(data);
    const newDataTasks = dataTasks.map((item) => {
      if (item.id === task.id) {
        const newTask = { ...item };
        newTask.title = data.title;
        newTask.description = data.description;
        newTask.done = Boolean(data.done);
        newTask.files = newFiles;
        return newTask;
      }
      return item;
    });
    onClose();
    setDataTasks(newDataTasks);
  };

  const onDelete = () => {
    const newDataTasks = dataTasks.filter((item) => item.id !== task.id);
    setDataTasks(newDataTasks);
    onClose();
  };

  const handleDeleteFile = (name: string) => {
    console.log('Delete file: ', name);
    console.log(downloadFiles);
    const newDownloadFiles = downloadFiles.filter((item) => item.filename !== name);
    console.log(newDownloadFiles);
    setDownloadFiles(newDownloadFiles);
  };

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    const { files } = e.target;
    if (files) {
      const newFile: IFormInputFile = {
        file: files[0],
        filename: files[0].name,
        fileSize: files[0].size,
      };
      setDownloadFiles([...downloadFiles, newFile]);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ width: '500px' }}>
        <DialogTitle>Edit task</DialogTitle>
        <DialogContent sx={{ pb: 0 }}>
          <TextField
            autoFocus
            defaultValue={task.title}
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            error={Boolean(errors.title)}
            helperText={errors.title ? errors.title.message : ''}
            {...register('title', {
              required: { value: true, message: 'this field is required' },
              minLength: {
                value: 6,
                message: 'Your task name must be at least 6 characters long.',
              },
            })}
          />
          <TextField
            defaultValue={task.description}
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            multiline={true}
            rows={4}
            {...register('description', { required: false })}
          />
          <FormControlLabel
            value={true}
            control={
              <Checkbox
                checked={checkedDone}
                onClick={() => setCheckedDone(!checkedDone)}
                {...register('done', { required: false })}
              />
            }
            label="Done"
            labelPlacement="end"
          />

          {downloadFiles.length > 0 && (
            <TableContainer component={Paper}>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Filename</TableCell>
                    <TableCell align="right">Size</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {downloadFiles.map((item) => (
                    <TableRow
                      key={item.filename}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {item.filename}
                      </TableCell>
                      <TableCell align="right">{item.fileSize}</TableCell>
                      <TableCell align="right">
                        {
                          <Tooltip title="Delete file">
                            <IconButton
                              aria-label="delete file"
                              color="primary"
                              size="large"
                              sx={{
                                p: 0,
                              }}
                              onClick={() => handleDeleteFile(item.filename)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          <Divider />
          <Button variant="outlined" component="label" sx={{ mt: 1 }}>
            + Add File
            <input
              type="file"
              hidden
              {...register('files', { required: false })}
              onChange={handleUploadFile}
            />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDelete} sx={{ color: 'red' }}>
            Delete task
          </Button>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Ok</Button>
        </DialogActions>
      </Box>
    </form>
  );
};

export default TaskFull;
