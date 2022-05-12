import { Box, Button, DialogActions, DialogTitle } from '@mui/material';
import React from 'react';

const ConformForm = ({ choose }: { choose: (arg: boolean) => void }) => {
  return (
    <Box sx={{ width: '400px' }}>
      <DialogTitle>Are you sure you want to delete?</DialogTitle>
      <DialogActions>
        <Button onClick={() => choose(false)}>Cancel</Button>
        <Button onClick={() => choose(true)}>Yes</Button>
      </DialogActions>
    </Box>
  );
};

export default ConformForm;
