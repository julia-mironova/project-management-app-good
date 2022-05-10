import { Paper, styled } from '@mui/material';
import { ITask } from '../pages/SingleBoardPage';

const ColumnTask = ({ task }: { task: ITask }) => {
  const Task = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'left',
    paddingLeft: theme.spacing(2),
    color: theme.palette.text.secondary,
    height: 60,
    width: '100%',
    lineHeight: '60px',
    borderRadius: theme.shape.borderRadius,
  }));

  return <Task>{task.title}</Task>;
};

export default ColumnTask;
