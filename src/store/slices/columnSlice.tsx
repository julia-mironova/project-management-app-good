import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllColumnsRequest,
  postColumn,
  deleteColumnRequest,
  updateColumnRequest,
} from '../../api/requests';
import { IColumnsResp, IColumnBody } from '../../types/board';

const initialState: columnState = {
  columns: [],
  rejectMsg: '',
  pending: false,
};

export const getAllColumns = createAsyncThunk(
  'column/getAllColumns',
  async (boardId: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await getAllColumnsRequest(boardId);

      if (!response.ok) {
        const resp = await response.json();
        throw new Error(
          `bad server response, error code: ${resp?.statusCode} message: ${resp?.message}`
        );
      }

      const result: IColumnsResp[] = await response.json();
      dispatch(setColumns(result));
    } catch (err) {
      const msg = (err as Error).message;
      return rejectWithValue(msg);
    }
  }
);

export const createColumn = createAsyncThunk(
  'column/createColumn',

  async (data: { boardId: string; columnBody: IColumnBody }, { dispatch, rejectWithValue }) => {
    try {
      const response = await postColumn(data.boardId, data.columnBody);

      if (!response.ok) {
        const resp = await response.json();
        throw new Error(
          `bad server response, error code: ${resp?.statusCode} message: ${resp?.message}`
        );
      }
      const result: IColumnsResp = await response.json();
      dispatch(setSingleColumn(result));
    } catch (err) {
      const msg = (err as Error).message;
      return rejectWithValue(msg);
    }
  }
);

export const deleteAsyncColumn = createAsyncThunk(
  'column/deleteAsyncColumn',

  async (data: { boardId: string; columnId: string }, { dispatch, rejectWithValue }) => {
    try {
      const response = await deleteColumnRequest(data.boardId, data.columnId);

      if (!response.ok) {
        const resp = await response.json();
        throw new Error(
          `bad server response, error code: ${resp?.statusCode} message: ${resp?.message}`
        );
      }
      dispatch(deleteColumn(data.columnId));
    } catch (err) {
      const msg = (err as Error).message;
      return rejectWithValue(msg);
    }
  }
);

export const updateAsyncColumn = createAsyncThunk(
  'column/updateAsyncColumn',

  async (
    data: { boardId: string; columnId: string; columnBody: IColumnBody },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await updateColumnRequest(data.boardId, data.columnId, data.columnBody);

      if (!response.ok) {
        const resp = await response.json();
        throw new Error(
          `bad server response, error code: ${resp?.statusCode} message: ${resp?.message}`
        );
      }
      dispatch(updateColumn({ id: data.columnId, body: data.columnBody }));
    } catch (err) {
      const msg = (err as Error).message;
      return rejectWithValue(msg);
    }
  }
);

const pending = (state: columnState) => {
  state.pending = true;
  state.rejectMsg = '';
};
const reject = (state: columnState, action: PayloadAction<string>) => {
  state.pending = false;
  state.rejectMsg = action.payload;
};
const fulfilled = (state: columnState) => {
  state.pending = false;
};

export const columnSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setColumns: (state: columnState, action: PayloadAction<IColumnsResp[]>) => {
      state.columns = action.payload;
    },
    setSingleColumn: (state: columnState, action: PayloadAction<IColumnsResp>) => {
      state.columns = [...state.columns, action.payload];
    },
    deleteColumn: (state: columnState, action: PayloadAction<string>) => {
      state.columns = state.columns.filter((column) => column.id !== action.payload);
    },
    updateColumn: (
      state: columnState,
      action: PayloadAction<{ id: string; body: IColumnBody }>
    ) => {
      state.columns = state.columns.map((column) =>
        column.id === action.payload.id
          ? { ...column, title: action.payload.body.title }
          : { ...column }
      );
    },
  },
  extraReducers: {
    [getAllColumns.pending.type]: pending,
    [getAllColumns.rejected.type]: reject,
    [getAllColumns.fulfilled.type]: fulfilled,
    [createColumn.pending.type]: pending,
    [createColumn.rejected.type]: reject,
    [createColumn.fulfilled.type]: fulfilled,
    [deleteAsyncColumn.pending.type]: pending,
    [deleteAsyncColumn.rejected.type]: reject,
    [deleteAsyncColumn.fulfilled.type]: fulfilled,
    [updateAsyncColumn.pending.type]: pending,
    [updateAsyncColumn.rejected.type]: reject,
    [updateAsyncColumn.fulfilled.type]: fulfilled,
  },
});

export const { setColumns, setSingleColumn, deleteColumn, updateColumn } = columnSlice.actions;

export default columnSlice.reducer;

interface columnState {
  columns: IColumnsResp[];
  rejectMsg: string;
  pending: boolean;
}
