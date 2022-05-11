import { useState, forwardRef, useEffect } from 'react';
import { Stack, Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useAppSelector } from '../../hooks/redux.hooks';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarMessage = () => {
  const [open, setOpen] = useState(false);
  const { rejectMsg: rejectMsgAuth } = useAppSelector((state) => state.auth);
  const { rejectMsg: rejectMsgBoards } = useAppSelector((state) => state.boards);
  const { rejectMsg: rejectMsgColumns } = useAppSelector((state) => state.columns);

  useEffect(() => {
    if (rejectMsgAuth || rejectMsgBoards || rejectMsgColumns) {
      setOpen(true);
    }
  }, [rejectMsgAuth, rejectMsgBoards, rejectMsgColumns]);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
          {rejectMsgAuth || rejectMsgBoards || rejectMsgColumns}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default SnackbarMessage;
