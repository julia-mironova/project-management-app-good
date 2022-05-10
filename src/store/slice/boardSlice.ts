import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { localStorageGetUserToken } from '../../utils/localStorage';
import { BASE_URL } from '../../constants/baseUrl';

const initialState: boardState = {
  boards: [],
  rejectMsg: '',
  pending: false,
};

export const createBoard = createAsyncThunk(
  'board/createAsyncUser',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorageGetUserToken();
      const response = await fetch(`${BASE_URL}boards`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const resp = await response.json();
        throw new Error(
          `bad server response, error code: ${resp?.statusCode} message: ${resp?.message}`
        );
      }

      const result: board[] = await response.json();
      dispatch(setBoard(result));
    } catch (err) {
      const msg = (err as Error).message;
      return rejectWithValue(msg);
    }
  }
);

const pending = (state: boardState) => {
  state.pending = true;
  state.rejectMsg = '';
};
const reject = (state: boardState, action: PayloadAction<string>) => {
  state.pending = false;
  state.rejectMsg = action.payload;
};
const fulfilled = (state: boardState) => {
  state.pending = false;
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoard: (state: boardState, action: PayloadAction<board[]>) => {
      state.boards = action.payload;
    },
  },
  extraReducers: {
    [createBoard.pending.type]: pending,
    [createBoard.rejected.type]: reject,
    [createBoard.fulfilled.type]: fulfilled,
  },
});

export const { setBoard } = boardSlice.actions;

export default boardSlice.reducer;

interface boardState {
  boards: board[];
  rejectMsg: string;
  pending: boolean;
}
type board = {
  id: string;
  title: string;
};
