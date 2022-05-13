import { Paper, styled } from '@mui/material';
import ModalWindow from '../ModalWindow';
import TaskFull from '../TaskFull';
import React from 'react';
import { ITask } from '../../types/board';

const Task = ({ task }: { task: ITask }) => {
  const [isOpenModalTaskFull, setIsOpenModalTaskFull] = React.useState(false);

  const TitleTask = styled(Paper)(({ theme }) => ({
    ...theme.typography.h6,
    textAlign: 'left',
    paddingLeft: theme.spacing(2),
    color: theme.palette.text.secondary,
    height: 60,
    width: '100%',
    lineHeight: '60px',
    borderRadius: theme.shape.borderRadius,
    // textDecoration: task.done ? 'line-through' : 'none',
  }));

  return (
    <>
      <TitleTask onClick={() => setIsOpenModalTaskFull(true)}>{task.title}</TitleTask>
      <ModalWindow open={isOpenModalTaskFull} onClose={() => setIsOpenModalTaskFull(false)}>
        <TaskFull onClose={() => setIsOpenModalTaskFull(false)} task={task} />
      </ModalWindow>
    </>
  );
};

export default Task;
