import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://safe-refuge-49235.herokuapp.com/';

const initialState: AuthState = {
  isLoggedIn: false,
  token: '',
  pending: false,
  rejectMsg: '',
  id: '',
  name: 'Bill Smith',
};

export const createUser = createAsyncThunk(
  'auth/createAsyncUser',
  async (data: ICreateUser, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const resp = await response.json();
        throw new Error(
          `bad server response, error code: ${resp?.statusCode} message: ${resp?.message}`
        );
      }

      const result: ICreateUserResponse = await response.json();
      dispatch(setUser(result));
    } catch (err) {
      const msg = (err as Error).message;
      return rejectWithValue(msg);
    }
  }
);
export const createToken = createAsyncThunk(
  'auth/createToken',
  async (data: ICreateToken, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const resp = await response.json();
        throw new Error(
          `bad server response, error code: ${resp?.statusCode} message: ${resp?.message}`
        );
      }

      const result: ICreateTokenResponse = await response.json();
      dispatch(setToken(result));
    } catch (err) {
      const msg = (err as Error).message;
      return rejectWithValue(msg);
    }
  }
);

const pending = (state: AuthState) => {
  state.pending = true;
  state.rejectMsg = '';
};
const reject = (state: AuthState, action: PayloadAction<string>) => {
  state.pending = false;
  state.rejectMsg = action.payload;
};
const fulfilled = (state: AuthState) => {
  state.pending = false;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<ICreateUserResponse>) => {
      state.id = action.payload.id;
      state.login = action.payload.login;
      state.name = action.payload.name;
    },
    setToken: (state, action: PayloadAction<ICreateTokenResponse>) => {
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
  },
  extraReducers: {
    [createUser.pending.type]: pending,
    [createUser.rejected.type]: reject,
    [createUser.fulfilled.type]: fulfilled,
    [createToken.pending.type]: pending,
    [createToken.rejected.type]: reject,
    [createToken.fulfilled.type]: fulfilled,
  },
});

export const { setUser, setToken } = authSlice.actions;

export default authSlice.reducer;

interface AuthState {
  isLoggedIn: boolean;
  token: string;
  pending: boolean;
  rejectMsg: string | null;
  id: string;
  login?: string;
  name?: string;
}

type ICreateUser = {
  login: string;
  password: string;
  name: string;
};
type ICreateToken = {
  login: string;
  password: string;
};

type ICreateUserResponse = {
  id: string;
  name: string;
  login: string;
};
type ICreateTokenResponse = {
  token: string;
};
