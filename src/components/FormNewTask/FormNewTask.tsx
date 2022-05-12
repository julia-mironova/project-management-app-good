import { useParams } from 'react-router-dom';
import { Button, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { createAsyncTask } from '../../store/slices/tasksSlice';
import { getSingleBoard } from '../../store/slices/boardSlice';
import { localStorageGetUser } from '../../utils/localStorage';
import { useForm } from 'react-hook-form';
<<<<<<< HEAD
// import { useAppSelector } from '../../hooks/redux.hooks';
import { useTranslation } from 'react-i18next';
=======
>>>>>>> e3056d3... feat: add create task action

type IFormInputNewTask = {
  title: string;
  description: string;
};

const FormNewTask = ({
  columnId,
  onClose,
}: // dataTasks,
// setDataTasks,
{
  columnId: string;
  onClose: () => void;
  // dataTasks: ITaskResp[];
  // setDataTasks: React.Dispatch<React.SetStateAction<ITaskResp[]>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputNewTask>();
<<<<<<< HEAD
  const { t } = useTranslation();
=======
  const dispatch = useAppDispatch();
  const { boardId } = useParams();
>>>>>>> e3056d3... feat: add create task action
  // const { id } = useAppSelector((state) => state.auth);
  const { singleBoard } = useAppSelector((state) => state.boards);

  const onSubmit = (data: IFormInputNewTask) => {
    // const maxOrder = dataTasks.reduce((acc, curr) => (acc > curr.order ? acc : curr.order), 0);
    const maxOrder = singleBoard.columns.filter((item) => item.id === columnId)[0].tasks.length;
    const userId = localStorageGetUser().id;
    const newTask = {
      title: data.title,
      order: maxOrder + 1,
      description: data.description,
      userId: userId,
    };

    if (boardId) {
      dispatch(createAsyncTask({ boardId: boardId, columnId: columnId, taskBody: newTask }));
      dispatch(getSingleBoard(boardId));
    }

    // setDataTasks([...dataTasks, newTask]);
    onClose();
  };

  return (
<<<<<<< HEAD
    <form
    // onSubmit={handleSubmit(onSubmit)}
    >
      <DialogTitle>{t('TASK.CREATE_TASK_HEADER')}</DialogTitle>
=======
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>Create new task</DialogTitle>
>>>>>>> e3056d3... feat: add create task action
      <DialogContent>
        <TextField
          label={t('TITLE')}
          fullWidth={true}
          variant="outlined"
          error={errors.title ? true : false}
          helperText={errors.title ? errors.title.message : ''}
          sx={{ mb: 5 }}
          {...register('title', {
            required: { value: true, message: `${t('FORM.REQUIRE_MSG')}` },
            minLength: {
              value: 6,
              message: `${t('FORM.PASSWORD_LIMIT')}`,
            },
          })}
        />
        <TextField
          label={t('TASK.DESCR')}
          fullWidth={true}
          multiline={true}
          rows={4}
          variant="outlined"
          {...register('description', { required: false })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('CANCEL_BTN')}</Button>
        <Button type="submit">{t('TASK.CREATE')}</Button>
      </DialogActions>
    </form>
  );
};

export default FormNewTask;
