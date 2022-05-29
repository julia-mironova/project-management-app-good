import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Tooltip, IconButton, Typography } from '@mui/material';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useTranslation } from 'react-i18next';
import { generateUserInitials } from '../../utils/generateUserInitials';
import { useAppSelector } from '../../hooks/redux.hooks';

const HeaderTooltip = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isLoggedIn, name } = useAppSelector((state) => state.auth);

  return (
    <Tooltip title={t('HEADER.OPEN_SETTINGS')}>
      <IconButton
        onClick={() => {
          isLoggedIn && navigate('/edit-profile');
        }}
        sx={{ p: 0 }}
      >
        {
          isLoggedIn && (
            <Box
              justifyContent="center"
              alignItems="center"
              sx={{
                display: 'flex',
                width: { xs: '2rem', sm: '3rem' },
                height: { xs: '2rem', sm: '3rem' },
                borderRadius: '50%',
                bgcolor: 'white',
                transition: '.4s',
                '&:hover': { bgcolor: 'primary.contrastText' },
              }}
            >
              <Typography
                color="primary.contrastText"
                sx={{
                  fontWeight: '700',
                  fontSize: '1.25rem',
                  transition: '.4s',
                  '&:hover': { color: 'white' },
                }}
              >
                {name && generateUserInitials(name)}
              </Typography>
            </Box>
          )
          // : (
          //   <AccountCircleIcon
          //     sx={{
          //       color: 'white',
          //       width: '3rem',
          //       height: '3rem',
          //       transition: '.4s',
          //       '&:hover': { color: 'primary.contrastText' },
          //     }}
          //   />
          // )
        }
      </IconButton>
    </Tooltip>
  );
};

export default HeaderTooltip;
