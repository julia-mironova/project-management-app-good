import { useState } from 'react';
import { Box, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { indigo } from '@mui/material/colors';

const lngs: Array<string> = ['En', 'Ua', 'Ru'];

const LanguageMenu = () => {
  const [lng, setLng] = useState('En');

  const handleChange = (event: SelectChangeEvent) => {
    setLng(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <Select
        value={lng}
        onChange={handleChange}
        sx={{
          m: 1,
          p: 0,
          color: 'white',
          backgroundColor: indigo[400],
          height: '2.5rem',
          transition: '.4s',
          '&:hover': {
            backgroundColor: indigo[700],
          },
          borderRadius: '1rem',
          '& .MuiSvgIcon-root': {
            color: 'white',
          },
        }}
      >
        {lngs.map((lng) => (
          <MenuItem key={lng} value={lng}>
            {lng}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default LanguageMenu;
