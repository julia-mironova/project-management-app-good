import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Divider,
  IconButton,
  ListItem,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ModalWindow from '../ModalWindow';
import FormNewTask from '../FormNewTask';
import { useForm } from 'react-hook-form';
<<<<<<< HEAD
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { deleteAsyncColumn, updateAsyncColumn } from '../../store/slices/columnSlice';
import { Draggable } from 'react-beautiful-dnd';
import ConformModal from '../ConformModal';
import { useTranslation } from 'react-i18next';
=======
import { useAppDispatch } from '../../hooks/redux.hooks';
import ConformModal from '../ConformModal';
import { IColumn } from '../../types/board';
import { deleteColumn, updateColumn } from '../../store/slices/columnReducer';
>>>>>>> 96de855... refactor: column reduser

type IFormInputChangeName = {
  title: string;
};

const Column = ({ column }: { column: IColumn }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenModalAddNewTask, setisOpenModalAddNewTask] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputChangeName>();
<<<<<<< HEAD

  const { t } = useTranslation();
=======
>>>>>>> 96de855... refactor: column reduser
  const [isOpenConformModal, setIsOpenConformModal] = React.useState(false);
  const { boardId } = useParams();
  const dispatch = useAppDispatch();

  const handleDeleteColumn = async () => {
    if (boardId) {
      dispatch(deleteColumn({ boardId: boardId, columnId: column.id }));
    }
  };

  const changeNameColumn = async (e: IFormInputChangeName) => {
    if (boardId) {
      dispatch(updateColumn({ boardId, columnId: column.id, order: column.order, title: e.title }));
    }
    setIsEdit(false);
  };

  return (
    <Draggable draggableId={column.id} index={column.order}>
      {(provided) => (
        <ListItem
          sx={{
            width: '400px',
            minWidth: '400px',
            m: 0,
            p: 0,
          }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          // className={snapshot.isDragging ? classes.draggingListItem : ''}
        >
          <Stack
            spacing={2}
            sx={{
              width: '400px',
              minWidth: '400px',
              border: '1px solid LightGray',
              borderRadius: 2,
              padding: 2,
              backgroundColor: 'Gainsboro',
              height: '81vh',
            }}
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                height: '33px',
              }}
            >
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
                        minLength: {
                          value: 6,
                          message: 'must be at least 6 characters long',
                        },
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
                overflowY: 'scroll',
                overflowX: 'hidden',
              }}
            >
              {columnTasks
                // .sort((a, b) => a.order - b.order)
                .map((task: ITasksResp, i) => (
                  <p key={i}>{task.title}</p>
                  // <ColumnTask
                  //   key={task.id}
                  //   task={task}
                  //   dataTasks={dataTasks}
                  //   setDataTasks={setDataTasks}
                  // />
                ))}
            </Stack>
            <ModalWindow
              open={isOpenModalAddNewTask}
              onClose={() => setisOpenModalAddNewTask(false)}
            >
<<<<<<< HEAD
              <FormNewTask
                columnId={column.id}
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
        </ListItem>
      )}
    </Draggable>
=======
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Divider />
      <Stack
        spacing={2}
        sx={{
          overflowY: 'scroll',
          overflowX: 'hidden',
        }}
      >
        {column.tasks?.map((task) => (
          <div key={task.id}>
            <p>{task.title}</p>
            <p>{task.description}</p>
          </div>

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
          columnId={column.id}
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
>>>>>>> 96de855... refactor: column reduser
  );
};

export default Column;
