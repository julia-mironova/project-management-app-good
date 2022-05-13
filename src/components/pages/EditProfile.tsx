import { Visibility, VisibilityOff } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { useForm } from 'react-hook-form';
import { propsSubmitSignUp } from '../Login/SignUp';
import { useEffect, useState } from 'react';
import {
  localStorageGetUser,
  localStorageSetUser,
  localStorageSetUserToken,
} from '../../utils/localStorage';
import SendIcon from '@mui/icons-material/Send';
import { deleteCurrentUser, logOut, updateUser } from '../../store/slices/authSlice';
import ConformModal from '../ConformModal';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<propsSubmitSignUp>({ mode: 'onSubmit' });

  const [showPassword, setShowPassword] = useState(false);
  const [isOpenConformModal, setIsOpenConformModal] = useState(false);
  const { id, name, token, pending } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: propsSubmitSignUp) => {
    await dispatch(
      updateUser({
        login: data.email,
        password: data.password,
        name: data.name,
      })
    );
  };

  const deleteUser = async () => {
    await dispatch(deleteCurrentUser(id));
    await dispatch(logOut());
    navigate('/');
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
        <Typography component="h1" variant="h4">
          Edit profile
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
            defaultValue={name}
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
            defaultValue={() => localStorageGetUser().id}
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
            endIcon={<SendIcon />}
            sx={{ mt: 3, mb: 2 }}
            loading={pending}
            loadingPosition="end"
          >
            Update info
          </LoadingButton>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={() => setIsOpenConformModal(true)}
          >
            Delete user
          </Button>
          <ConformModal
            isOpen={isOpenConformModal}
            close={() => setIsOpenConformModal(false)}
            func={deleteUser}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default EditProfile;
