import { createTask } from './taskResucer';
import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';
import { localStorageGetUserToken } from '../../utils/localStorage';
import { BASE_URL } from '../../constants/baseUrl';
import { boardState, IBoard, IBoardPreview } from '../../types/board';
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
    const data: IBoard = await response.json();
    data.columns.sort((a, b) => {
      if (a.order < b.order) return -1;
      if (a.order > b.order) return 1;
      return 0;
    });

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
        state.pending = false;
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.singleBoard.columns = action.payload;
        state.pending = false;
      })
      .addCase(updateColumn.fulfilled, (state, action) => {
        state.pending = false;
        state.singleBoard.columns = state.singleBoard.columns.map((el) => {
          return el.id === action.payload.id ? action.payload : el;
        });
      })
      /* tasks reducer */
      .addCase(createTask.fulfilled, (state, action) => {
        state.singleBoard.columns = state.singleBoard.columns.map((el) => {
          if (el.id === action.payload.columnId) {
            el.tasks?.map((el) => {
              return el.id === action.payload.id ? action.payload : el;
            });
            return el;
          } else {
            return el;
          }
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

/* const cash = [] as IColumn[];
          action.payload.forEach((payloadElement, idx) => {
            state.singleBoard.columns.forEach((column) => {
              if (column.id === payloadElement.id) {
                cash.push({
                  id: action.payload[idx].id,
                  order: action.payload[idx].order,
                  title: action.payload[idx].title,
                  tasks: column.tasks,
                });
              }
            });
          });

          state.singleBoard.columns = cash;
          state.singleBoard.columns = state.singleBoard.columns.filter(
            (el) => el.id !== action.payload
          );
        } else {
          state.singleBoard.columns.pop();*/
