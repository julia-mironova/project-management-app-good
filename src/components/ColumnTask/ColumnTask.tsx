import { Paper, styled } from '@mui/material';
import ModalWindow from '../ModalWindow';
import TaskFull from '../TaskFull';
import React from 'react';
import { ITask } from '../../types/board';

const ColumnTask = ({
  task,
  dataTasks,
  setDataTasks,
}: {
  task: ITask;
  dataTasks: ITask[];
  setDataTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
}) => {
  const [isOpenModalTaskFull, setIsOpenModalTaskFull] = React.useState(false);

  const Task = styled(Paper)(({ theme }) => ({
    ...theme.typography.h6,
    textAlign: 'left',
    paddingLeft: theme.spacing(2),
    color: theme.palette.text.secondary,
    height: 60,
    width: '100%',
    lineHeight: '60px',
    borderRadius: theme.shape.borderRadius,
    textDecoration: task.done ? 'line-through' : 'none',
  }));

  return (
    <>
      <Task onClick={() => setIsOpenModalTaskFull(true)}>{task.title}</Task>
      <ModalWindow open={isOpenModalTaskFull} onClose={() => setIsOpenModalTaskFull(false)}>
        <TaskFull
          onClose={() => setIsOpenModalTaskFull(false)}
          task={task}
          dataTasks={dataTasks}
          setDataTasks={setDataTasks}
        />
      </ModalWindow>
    </>
  );
};

export default ColumnTask;
