import { useParams } from 'react-router-dom';
import { Button, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { localStorageGetUser } from '../../utils/localStorage';
import { useForm } from 'react-hook-form';
// import { useAppSelector } from '../../hooks/redux.hooks';
import { useTranslation } from 'react-i18next';
import { createTask } from '../../store/slices/taskResucer';
import { ITaskResponse } from '../../types/board';

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
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { boardId } = useParams();
  // const { id } = useAppSelector((state) => state.auth);
  const { singleBoard } = useAppSelector((state) => state.boards);

  const onSubmit = (data: IFormInputNewTask) => {
    const currentColumn = singleBoard?.columns?.find((item) => item.id === columnId);
    const maxOrder = currentColumn?.tasks?.length || 0;
    const userId = localStorageGetUser().id;
    if (boardId) {
      const newTask: ITaskResponse = {
        id: '',
        title: data.title,
        order: maxOrder + 1,
        description: data.description,
        userId: userId,
        boardId: boardId,
        columnId: columnId,
      };
      dispatch(createTask(newTask));
    }

    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>Create new task</DialogTitle>
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
              value: 3,
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
          error={errors.title ? true : false}
          helperText={errors.title ? errors.title.message : ''}
          {...register('description', {
            required: { value: true, message: `${t('FORM.REQUIRE_MSG')}` },
          })}
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
