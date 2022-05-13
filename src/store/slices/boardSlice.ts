import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';
import { localStorageGetUserToken } from '../../utils/localStorage';
import { BASE_URL } from '../../constants/baseUrl';
import { IBoard } from '../../types/board';
import { createColumn, deleteColumn, updateColumn } from './columnReducer';

const initialSingleBoard: IBoard = {
  id: '',
  title: '',
  columns: [],
};

const initialState: boardState = {
  boards: [],
  rejectMsg: '',
  pending: false,
  singleBoard: initialSingleBoard,
};

export const getAllBoards = createAsyncThunk<IBoardPreview[], undefined, { rejectValue: string }>(
  'board/getAllBoards',
  async (_, { rejectWithValue }) => {
    const token = localStorageGetUserToken();
    const response = await fetch(`${BASE_URL}boards`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const resp = await response.json();
      return rejectWithValue(
        `bad server response, error code: ${resp?.statusCode} message: ${resp?.message}`
      );
    }

    return await response.json();
  }
);

export const createBoard = createAsyncThunk<IBoardPreview, string, { rejectValue: string }>(
  'board/createBoard',
  async (title, { rejectWithValue }) => {
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
      return rejectWithValue(
        `bad server response, error code: ${resp?.statusCode} message: ${resp?.message}`
      );
    }

    return await response.json();
  }
);

export const updateBoard = createAsyncThunk<IBoardPreview, string, { rejectValue: string }>(
  'board/updateBoard',
  async (title, { rejectWithValue }) => {
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
      return rejectWithValue(
        `bad server response, error code: ${resp?.statusCode} message: ${resp?.message}`
      );
    }

    return await response.json();
  }
);

export const deleteBoard = createAsyncThunk<string, string, { rejectValue: string }>(
  'board/deleteBoard',
  async (id, { rejectWithValue }) => {
    const token = localStorageGetUserToken();
    const response = await fetch(`${BASE_URL}boards/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const resp = await response.json();
      return rejectWithValue(
        `bad server response, error code: ${resp?.statusCode} message: ${resp?.message}`
      );
    }
    return id;
  }
);

export const getSingleBoard = createAsyncThunk<IBoard, string, { rejectValue: string }>(
  'board/getSingleBoard',
  async (id, { rejectWithValue }) => {
    const token = localStorageGetUserToken();
    const response = await fetch(`${BASE_URL}boards/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const resp = await response.json();
      return rejectWithValue(
        `bad server response, error code: ${resp?.statusCode} message: ${resp?.message}`
      );
    }
    const data = await response.json();
    return data;
  }
);

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBoards.fulfilled, (state, action) => {
        state.boards = action.payload;
        state.pending = false;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.boards.push(action.payload);
        state.pending = false;
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        state.boards = state.boards.map((el) => {
          return el.id === action.payload.id ? action.payload : el;
        });
        state.pending = false;
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.boards = state.boards.filter((el) => el.id !== action.payload);
        state.pending = false;
      })
      .addCase(getSingleBoard.fulfilled, (state, action) => {
        state.singleBoard = action.payload;
        state.pending = false;
      })
      /* column reducer */
      .addCase(createColumn.fulfilled, (state, action) => {
        state.singleBoard.columns.push(action.payload);
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.singleBoard.columns = state.singleBoard.columns.filter(
          (el) => el.id !== action.payload
        );
      })
      .addCase(updateColumn.fulfilled, (state, action) => {
        state.singleBoard.columns = state.singleBoard.columns.map((el) => {
          return el.id === action.payload.id ? action.payload : el;
        });
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.pending = false;
        state.rejectMsg = action.payload;
      })
      .addMatcher(isPending, (state) => {
        state.pending = true;
      });
  },
});

export default boardSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
function isPending(action: AnyAction) {
  return action.type.endsWith('pending');
}

interface boardState {
  boards: IBoardPreview[];
  rejectMsg: string;
  pending: boolean;
  singleBoard: IBoard;
}
export type IBoardPreview = {
  id: string;
  title: string;
};
