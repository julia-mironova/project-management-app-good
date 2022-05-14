import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Divider, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { ITasksResp, IColumnsResp } from '../../types/board';
import ModalWindow from '../ModalWindow';
import FormNewTask from '../FormNewTask';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { getAllTasks } from '../../store/slices/tasksSlice';
import { deleteAsyncColumn, updateAsyncColumn } from '../../store/slices/columnSlice';
import ConformModal from '../ConformModal';

type IFormInputChangeName = {
  title: string;
};

const BoardColumn = ({ column }: { column: IColumnsResp }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenModalAddNewTask, setisOpenModalAddNewTask] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputChangeName>();

  const [isOpenConformModal, setIsOpenConformModal] = React.useState(false);
  const { tasks } = useAppSelector((state) => state.tasks);
  const { boardId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (boardId) {
      dispatch(getAllTasks({ boardId: boardId, columnId: column.id }));
    }
  }, [boardId, column.id, dispatch]);

  const handleDeleteColumn = async () => {
    if (boardId) {
      dispatch(deleteAsyncColumn({ boardId: boardId, columnId: column.id }));
    }
  };

  const changeNameColumn = async (e: IFormInputChangeName) => {
    if (boardId) {
      dispatch(
        updateAsyncColumn({
          boardId: boardId,
          columnId: column.id,
          columnBody: { title: e.title, order: column.order },
        })
      );
    }
    setIsEdit(false);
  };

  return (
    <Stack
      spacing={2}
      sx={{
        width: '400px',
        minWidth: '400px',
        border: '1px solid gainsboro',
        borderRadius: 2,
        padding: 2,
        backgroundColor: '#f5f5f5',
        height: '70vh',
      }}
    >
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', height: '33px' }}>
        {isEdit ? (
          <form onSubmit={handleSubmit(changeNameColumn)}>
            <Box
              sx={{
                width: '300px',
                display: 'flex',
                justifyContent: 'space-between',
                height: '33px',
                border: '1px solid gray',
                borderRadius: 2,
              }}
            >
              <TextField
                defaultValue={column.title}
                variant="standard"
                error={errors.title ? true : false}
                helperText={errors.title ? errors.title.message : ''}
                sx={{
                  cursor: 'default',
                  color: 'black',
                  width: '75%',
                  background: 'white',
                  borderRadius: 1,
                  pl: 1,
                }}
                {...register('title', {
                  required: { value: true, message: 'this field is required' },
                })}
              />
              <Box>
                <Tooltip title="Change name">
                  <IconButton
                    aria-label="change name"
                    color="primary"
                    size="large"
                    sx={{
                      p: 0.5,
                    }}
                    type="submit"
                  >
                    <CheckCircleIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Cancel">
                  <IconButton
                    aria-label="cancel"
                    color="primary"
                    size="large"
                    sx={{
                      p: 0.5,
                    }}
                    onClick={() => setIsEdit(false)}
                  >
                    <CancelIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </form>
        ) : (
          <Typography
            align="left"
            noWrap={true}
            color="gray"
            sx={{
              width: '70%',
              fontSize: '1.5rem',
              fontWeight: 'bold',
            }}
            onClick={() => setIsEdit(true)}
          >
            {column.title}
          </Typography>
        )}

        <Box>
          <Tooltip title="Add new task">
            <IconButton
              aria-label="add new task"
              color="primary"
              size="large"
              sx={{
                p: 0,
                pr: 1,
              }}
              onClick={() => setisOpenModalAddNewTask(true)}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete column">
            <IconButton
              aria-label="delete column"
              color="primary"
              size="large"
              sx={{
                p: 0,
              }}
              onClick={() => setIsOpenConformModal(true)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Divider />
      <Stack
        spacing={2}
        sx={{
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {tasks
          // .sort((a, b) => a.order - b.order)
          .map((task: ITasksResp) => (
            <p key={task.id}>{task.title}</p>
            // <ColumnTask
            //   key={task.id}
            //   task={task}
            //   dataTasks={dataTasks}
            //   setDataTasks={setDataTasks}
            // />
          ))}
      </Stack>
      <ModalWindow open={isOpenModalAddNewTask} onClose={() => setisOpenModalAddNewTask(false)}>
        <FormNewTask
          onClose={() => setisOpenModalAddNewTask(false)}
          // dataTasks={tasks}
          // setDataTasks={tasks}
        />
      </ModalWindow>
      <ConformModal
        isOpen={isOpenConformModal}
        close={() => setIsOpenConformModal(false)}
        func={handleDeleteColumn}
      />
    </Stack>
  );
};

export default BoardColumn;
