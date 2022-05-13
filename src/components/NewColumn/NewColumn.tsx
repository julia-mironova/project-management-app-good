import { Box, Button, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
<<<<<<< HEAD:src/components/FormNewColumn/FormNewColumn.tsx
import { createColumn } from '../../store/slices/columnSlice';
import { useTranslation } from 'react-i18next';
=======
import { createColumn } from '../../store/slices/columnReducer';
>>>>>>> 96de855... refactor: column reduser:src/components/NewColumn/NewColumn.tsx

type formData = {
  title: string;
};

const NewColumn = ({ onClose }: { onClose: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>();

<<<<<<< HEAD:src/components/FormNewColumn/FormNewColumn.tsx
  const { t } = useTranslation();

  const { columns } = useAppSelector((state) => state.columns);
=======
  const { columns } = useAppSelector((state) => state.boards.singleBoard);
>>>>>>> 96de855... refactor: column reduser:src/components/NewColumn/NewColumn.tsx
  const dispatch = useAppDispatch();
  const { boardId } = useParams();

  const onSubmit = ({ title }: formData) => {
    if (boardId) {
      dispatch(createColumn({ boardId: boardId, title, order: columns.length + 1 }));
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ width: '400px' }}>
        <DialogTitle>{t('COLUMN.CREATE_COLUMN_HEADER')}</DialogTitle>
        <DialogContent>
          <TextField
            label={t('TITLE')}
            fullWidth={true}
            variant="outlined"
            error={errors.title ? true : false}
            helperText={errors.title ? errors.title.message : ''}
            {...register('title', {
<<<<<<< HEAD:src/components/FormNewColumn/FormNewColumn.tsx
              required: { value: true, message: `${t('FORM.REQUIRE_MSG')}` },
=======
              required: { value: true, message: 'this field is required' },
              minLength: {
                value: 2,
                message: 'Your column name must be at least 2 characters long.',
              },
>>>>>>> 96de855... refactor: column reduser:src/components/NewColumn/NewColumn.tsx
            })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{t('CANCEL_BTN')}</Button>
          <Button type="submit">{t('COLUMN.CREATE_COLUMN_BTN')}</Button>
        </DialogActions>
      </Box>
    </form>
  );
};

export default NewColumn;
