import { Avatar, Paper, styled } from '@mui/material';
import ModalWindow from '../ModalWindow';
import TaskFull from '../TaskFull';
import React from 'react';
import { ITask } from '../../types/board';
import { useAppSelector } from '../../hooks/redux.hooks';

const Task = ({ task }: { task: ITask }) => {
  const [isOpenModalTaskFull, setIsOpenModalTaskFull] = React.useState(false);
  const { usersAll } = useAppSelector((state) => state.boards);

  const currentUser = usersAll?.find((user) => user.id === task.userId)?.name || '';

  const TitleTask = styled(Paper)(({ theme }) => ({
    ...theme.typography.h6,
    textAlign: 'left',
    paddingLeft: theme.spacing(2),
    color: theme.palette.text.secondary,
    height: 60,
    width: '100%',
    lineHeight: '60px',
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: '0.6rem',
  }));

  function stringToColor(string: string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${
        name.split(' ').length > 1 ? name.split(' ')[0][0] + name.split(' ')[1][0] : name[0]
      }`,
    };
  }

  return (
    <>
      <TitleTask onClick={() => setIsOpenModalTaskFull(true)}>
        {task.title}
        <Avatar {...stringAvatar(currentUser)} />
      </TitleTask>
      <ModalWindow open={isOpenModalTaskFull} onClose={() => setIsOpenModalTaskFull(false)}>
        <TaskFull onClose={() => setIsOpenModalTaskFull(false)} task={task} />
      </ModalWindow>
    </>
  );
};

export default Task;
