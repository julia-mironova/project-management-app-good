import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
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
import { IFileAttached, ITask } from '../../types/board';
import React from 'react';
import { useForm } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import ConformModal from '../ConformModal';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { deleteTask, updateTask } from '../../store/slices/taskResucer';
import { localStorageGetUser } from '../../utils/localStorage';
import { useTranslation } from 'react-i18next';
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

type IPropsTaskFull = {
  onClose: () => void;
  task: ITask;
};

const TaskFull = ({ onClose, task }: IPropsTaskFull) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormTaskData>();
  const dispatch = useAppDispatch();

  const [downloadFiles, setDownloadFiles] = React.useState<IFileAttached[]>(task.files || []);
  const [isOpenConformModal, setIsOpenConformModal] = React.useState(false);
  const { id, columns } = useAppSelector((state) => state.boards.singleBoard);
  const { t } = useTranslation();

  const onSubmit = (data: IFormTaskData) => {
    const userId = localStorageGetUser()?.id;
    const indexColumns = columns.findIndex((item) => item.tasks?.find((t) => t.id === task.id));

    const newTask = {
      ...task,
      title: data.title,
      description: data.description,
      userId: userId,
      boardId: id,
      columnId: columns[indexColumns].id || '',
    };

    dispatch(updateTask(newTask));
    onClose();
  };

  const onDelete = async () => {
    const indexColumns = columns.findIndex((item) => item.tasks?.find((t) => t.id === task.id));

    const data = {
      tasks: columns[indexColumns]?.tasks || [],
      boardId: id,
      taskId: task.id,
      columnId: columns[indexColumns].id || '',
    };

    dispatch(deleteTask(data));
    onClose();
  };

  const handleDeleteFile = (name: string) => {
    const newDownloadFiles = downloadFiles.filter((item) => item.filename !== name);
    setDownloadFiles(newDownloadFiles);
  };

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
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
              required: { value: true, message: `${t('FORM.REQUIRE_MSG')}` },
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
          <Button onClick={() => setIsOpenConformModal(true)} sx={{ color: 'red' }}>
            Delete task
          </Button>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Ok</Button>
        </DialogActions>
        <ConformModal
          isOpen={isOpenConformModal}
          close={() => setIsOpenConformModal(false)}
          func={onDelete}
        />
      </Box>
    </form>
  );
};

export default TaskFull;
