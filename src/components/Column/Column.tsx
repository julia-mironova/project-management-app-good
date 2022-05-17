import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Divider, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ModalWindow from '../ModalWindow';
import FormNewTask from '../FormNewTask';
import { useForm } from 'react-hook-form';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import ConformModal from '../ConformModal';
import { useAppDispatch } from '../../hooks/redux.hooks';
import { IColumn } from '../../types/board';
import { deleteColumn, updateColumn } from '../../store/slices/columnReducer';
import Task from '../Task';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const [isOpenConformModal, setIsOpenConformModal] = React.useState(false);
  const { boardId } = useParams();
  const dispatch = useAppDispatch();

  const handleDeleteColumn = async () => {
    if (boardId) {
      dispatch(deleteColumn({ boardId: boardId, columnId: column.id, order: column.order }));
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
        // <ListItem
        //   sx={{
        //     width: '400px',
        //     minWidth: '400px',
        //     m: 0,
        //     p: 0,
        //   }}
        // >
        <Stack
          spacing={2}
          sx={{
            width: '400px',
            minWidth: '400px',
            border: '1px solid Gray',
            borderRadius: 2,
            padding: 2,
            backgroundColor: 'rgba(213, 217, 233, .7)',
            height: '73vh',
          }}
          component="li"
          // isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <Box
            sx={{
              width: '400px',
              minWidth: '400px',
              border: '1px solid Gray',
              borderRadius: 2,
              padding: 2,
              backgroundColor: 'rgba(213, 217, 233, .7)',
              maxHeight: '73vh',
            }}
            {...provided.dragHandleProps}
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
                      required: { value: true, message: `${t('FORM.REQUIRE_MSG')}` },
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
                  color: 'gray',
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
                  {column.title}
                </Typography>
              )}

              <Box>
                <Tooltip title={t('TASK.ADD_BTN')}>
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
                <Tooltip title={t('COLUMN.DELETE_BTN')}>
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
        <Droppable droppableId={column.id} type="QUOTE">
            {(dropProvided) => {
              return (
            <Stack
              spacing={2}
              sx={{
                paddingRight: '.8rem',
                overflowY: 'auto',
                overflowX: 'hidden',
                '&::-webkit-scrollbar': {
                  width: '.8rem',
                  backgroundColor: '#f1f1f1',
                },
                '&::-webkit-scrollbar-thumb ': {
                  backgroundColor: '#c8c8c8',
                  height: '2rem',
                },
                '&::-webkit-scrollbar-thumb:hover ': {
                  backgroundColor: '#a8a8a8',
                },
                {...dropProvided.droppableProps}
                ref={dropProvided.innerRef}
              }}
            >
              {column.tasks &&
                [...column.tasks]
                  .sort((a, b) => a.order - b.order)
                  .map((task) => <Task key={task.id} task={task} />)}
               {dropProvided.placeholder}
            </Stack>
               );
              }}
          </Droppable>
            <ModalWindow
              open={isOpenModalAddNewTask}
              onClose={() => setisOpenModalAddNewTask(false)}
            >
              <FormNewTask columnId={column.id} onClose={() => setisOpenModalAddNewTask(false)} />
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
  );
};

export default Column;
