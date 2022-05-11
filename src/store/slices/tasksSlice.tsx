import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllTasksRequest } from '../../api/requests';
import { ITasksResp } from '../../types/board';

const initialState: tasksState = {
  tasks: [],
  rejectMsg: '',
  pending: false,
};

export const getAllTasks = createAsyncThunk(
  'column/getAllColumns',
  async (data: { boardId: string; columnId: string }, { dispatch, rejectWithValue }) => {
    try {
      const response = await getAllTasksRequest(data.boardId, data.columnId);

      if (!response.ok) {
        const resp = await response.json();
        throw new Error(
          `bad server response, error code: ${resp?.statusCode} message: ${resp?.message}`
        );
      }

      const result: ITasksResp[] = await response.json();
      dispatch(setTasks(result));
    } catch (err) {
      const msg = (err as Error).message;
      return rejectWithValue(msg);
    }
  }
);

const pending = (state: tasksState) => {
  state.pending = true;
  state.rejectMsg = '';
};
const reject = (state: tasksState, action: PayloadAction<string>) => {
  state.pending = false;
  state.rejectMsg = action.payload;
};
const fulfilled = (state: tasksState) => {
  state.pending = false;
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state: tasksState, action: PayloadAction<ITasksResp[]>) => {
      state.tasks = action.payload;
    },
  },
  extraReducers: {
    [getAllTasks.pending.type]: pending,
    [getAllTasks.rejected.type]: reject,
    [getAllTasks.fulfilled.type]: fulfilled,
  },
});

export const { setTasks } = tasksSlice.actions;

export default tasksSlice.reducer;

interface tasksState {
  tasks: ITasksResp[];
  rejectMsg: string;
  pending: boolean;
}
