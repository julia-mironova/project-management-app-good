import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { localStorageGetUserToken } from '../../utils/localStorage';
import { BASE_URL } from '../../constants/baseUrl';

const initialState: boardState = {
  boards: [],
  rejectMsg: '',
  pending: false,
};

export const getAllBoards = createAsyncThunk(
  'board/createAsyncUser',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorageGetUserToken();
      const response = await fetch(`${BASE_URL}boards`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const resp = await response.json();
        throw new Error(
          `bad server response, error code: ${resp?.statusCode} message: ${resp?.message}`
        );
      }

      const result: IBoard[] = await response.json();
      dispatch(setAllBoards(result));
    } catch (err) {
      const msg = (err as Error).message;
      return rejectWithValue(msg);
    }
  }
);

export const createBoard = createAsyncThunk(
  'board/createAsyncUser',
  async (title: string, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorageGetUserToken();
      const response = await fetch(`${BASE_URL}boards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: title }),
      });

      if (!response.ok) {
        const resp = await response.json();
        throw new Error(
          `bad server response, error code: ${resp?.statusCode} message: ${resp?.message}`
        );
      }

      const result: IBoard = await response.json();
      dispatch(setBoard(result));
    } catch (err) {
      const msg = (err as Error).message;
      return rejectWithValue(msg);
    }
  }
);
export const updateAsyncBoard = createAsyncThunk(
  'board/createAsyncUser',
  async (title: string, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorageGetUserToken();
      const response = await fetch(`${BASE_URL}boards`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: title }),
      });

      if (!response.ok) {
        const resp = await response.json();
        throw new Error(
          `bad server response, error code: ${resp?.statusCode} message: ${resp?.message}`
        );
      }

      const result: IBoard = await response.json();
      dispatch(setBoard(result));
    } catch (err) {
      const msg = (err as Error).message;
      return rejectWithValue(msg);
    }
  }
);
export const deleteAsyncBoard = createAsyncThunk(
  'board/createAsyncUser',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorageGetUserToken();
      const response = await fetch(`${BASE_URL}boards/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const resp = await response.json();
        throw new Error(
          `bad server response, error code: ${resp?.statusCode} message: ${resp?.message}`
        );
      }
      dispatch(deleteBoard(id));
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
    setAllBoards: (state: boardState, action: PayloadAction<IBoard[]>) => {
      state.boards = action.payload;
    },
    setBoard: (state: boardState, action: PayloadAction<IBoard>) => {
      state.boards = [...state.boards, action.payload];
    },
    updateBoard: (state: boardState, action: PayloadAction<IBoard>) => {
      const cash = state.boards.filter((el) => el.id !== action.payload.id);
      state.boards = [...cash, action.payload];
    },
    deleteBoard: (state: boardState, action: PayloadAction<string>) => {
      state.boards = state.boards.filter((el) => el.id !== action.payload);
    },
  },
  extraReducers: {
    [getAllBoards.pending.type]: pending,
    [getAllBoards.rejected.type]: reject,
    [getAllBoards.fulfilled.type]: fulfilled,
    [createBoard.pending.type]: pending,
    [createBoard.rejected.type]: reject,
    [createBoard.fulfilled.type]: fulfilled,
    [updateAsyncBoard.pending.type]: pending,
    [updateAsyncBoard.rejected.type]: reject,
    [updateAsyncBoard.fulfilled.type]: fulfilled,
    [deleteAsyncBoard.pending.type]: pending,
    [deleteAsyncBoard.rejected.type]: reject,
    [deleteAsyncBoard.fulfilled.type]: fulfilled,
  },
});

export const { setAllBoards, setBoard, deleteBoard, updateBoard } = boardSlice.actions;

export default boardSlice.reducer;

interface boardState {
  boards: IBoard[];
  rejectMsg: string;
  pending: boolean;
}
export type IBoard = {
  id: string;
  title: string;
};
