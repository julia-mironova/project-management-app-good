import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  InputAdornment,
  IconButton,
  TextField,
  Box,
  Container,
  Typography,
  Button,
  Avatar,
  CssBaseline,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createToken, createUser } from '../../store/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { NavLink, useNavigate } from 'react-router-dom';
import { localStorageSetUser, localStorageSetUserToken } from '../../utils/localStorage';

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<propsSubmitSignUp>({ mode: 'onSubmit' });

  const [showPassword, setShowPassword] = useState(false);
  const { id, name, token, rejectMsg, pending } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: propsSubmitSignUp) => {
    await dispatch(
      createUser({
        login: data.email,
        password: data.password,
        name: data.name,
      })
    );
    if (rejectMsg) {
      await dispatch(createToken({ login: data.email, password: data.password }));
      navigate('/boards');
    }
  };

  useEffect(() => {
    return () => {
      localStorageSetUser({ id: id, name: name });
      localStorageSetUserToken(token);
    };
  }, [id, name, token]);

  return (
    <Container maxWidth="xs" sx={{ mt: '1rem', pb: 3, height: 'calc(100vh - 140px)' }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <TextField
            error={Boolean(errors?.name?.message)}
            helperText={errors?.name?.message ? errors?.name?.message : ' '}
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            autoFocus
            {...register('name', {
              required: { value: true, message: 'this field is required' },
              minLength: {
                value: 3,
                message: 'Your name must be at least 3 characters long',
              },
            })}
          />
          <TextField
            error={Boolean(errors?.email?.message)}
            helperText={errors?.email?.message ? errors?.email?.message : ' '}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            {...register('email', {
              required: { value: true, message: 'this field is required' },
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'incorrect email',
              },
            })}
          />
          <TextField
            error={Boolean(errors.password)}
            helperText={errors.password?.message ? errors.password?.message : ' '}
            margin="normal"
            required
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((prevState) => !prevState)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...register('password', {
              required: { value: true, message: 'this field is required' },
              minLength: {
                value: 6,
                message: 'Your password must be at least 6 characters long',
              },
            })}
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            endIcon={<SendIcon />}
            loading={pending}
            loadingPosition="end"
          >
            Sign Up
          </LoadingButton>
          <Button component={NavLink} to={'/login'}>
            <Typography variant="body2">{'You have an account? Login.'}</Typography>
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export type propsSubmitSignUp = {
  email: string;
  password: string;
  name: string;
};
