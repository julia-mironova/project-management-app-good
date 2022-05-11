import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
// import { localStorageGetUserToken } from '../../utils/localStorage';
import { getAllColumnsRequest, postColumn } from '../../api/requests';
// import { BASE_URL } from '../../constants/baseUrl';
import { IColumnResp, IColumnBody } from '../../types/board';

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

      const result: IColumnResp[] = await response.json();
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
      const result: IColumnResp = await response.json();
      dispatch(setSingleColumn(result));
    } catch (err) {
      const msg = (err as Error).message;
      return rejectWithValue(msg);
    }
  }
);

// export const createBoard = createAsyncThunk(
//   'board/createAsyncUser',
//   async (title: string, { dispatch, rejectWithValue }) => {
//     try {
//       const token = localStorageGetUserToken();
//       const response = await fetch(`${BASE_URL}boards`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ title: title }),
//       });

//       if (!response.ok) {
//         const resp = await response.json();
//         throw new Error(
//           `bad server response, error code: ${resp?.statusCode} message: ${resp?.message}`
//         );
//       }

//       const result: IBoard = await response.json();
//       dispatch(setBoard(result));
//     } catch (err) {
//       const msg = (err as Error).message;
//       return rejectWithValue(msg);
//     }
//   }
// );
// export const updateAsyncBoard = createAsyncThunk(
//   'board/createAsyncUser',
//   async (title: string, { dispatch, rejectWithValue }) => {
//     try {
//       const token = localStorageGetUserToken();
//       const response = await fetch(`${BASE_URL}boards`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ title: title }),
//       });

//       if (!response.ok) {
//         const resp = await response.json();
//         throw new Error(
//           `bad server response, error code: ${resp?.statusCode} message: ${resp?.message}`
//         );
//       }

//       const result: IColumnResp[] = await response.json();
//       dispatch(setColumns(result));
//     } catch (err) {
//       const msg = (err as Error).message;
//       return rejectWithValue(msg);
//     }
//   }
// );
// export const deleteAsyncBoard = createAsyncThunk(
//   'board/createAsyncUser',
//   async (id: string, { dispatch, rejectWithValue }) => {
//     try {
//       const token = localStorageGetUserToken();
//       const response = await fetch(`${BASE_URL}boards/${id}`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         const resp = await response.json();
//         throw new Error(
//           `bad server response, error code: ${resp?.statusCode} message: ${resp?.message}`
//         );
//       }
//       dispatch(deleteBoard(id));
//     } catch (err) {
//       const msg = (err as Error).message;
//       return rejectWithValue(msg);
//     }
//   }
// );

// export const getSingleBoard = createAsyncThunk(
//   'board/getSingleBoard',
//   async (id: string, { dispatch, rejectWithValue }) => {
//     try {
//       const singleBoardResponse = await getBoardById(id);
//       if (!singleBoardResponse.ok) {
//         const resp = await singleBoardResponse.json();
//         throw new Error(
//           `bad server response, error code: ${resp?.statusCode} message: ${resp?.message}`
//         );
//       }
//       const singleBoard: IBoardFull = await singleBoardResponse.json();
//       dispatch(setBoard(singleBoard));
//     } catch (err) {
//       const msg = (err as Error).message;
//       return rejectWithValue(msg);
//     }
//   }
// );

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
    setColumns: (state: columnState, action: PayloadAction<IColumnResp[]>) => {
      state.columns = action.payload;
    },
    setSingleColumn: (state: columnState, action: PayloadAction<IColumnResp>) => {
      state.columns = [...state.columns, action.payload];
    },
    // updateBoard: (state: columnState, action: PayloadAction<IBoard>) => {
    //   const cash = state.boards.filter((el) => el.id !== action.payload.id);
    //   state.boards = [...cash, action.payload];
    // },
    // deleteBoard: (state: columnState, action: PayloadAction<string>) => {
    //   state.boards = state.boards.filter((el) => el.id !== action.payload);
    // },
    // setSingleBoard: (state: columnState, action: PayloadAction<IBoardFull>) => {
    //   state.singleBoard = action.payload;
    // },

    // setColumn: (state: columnStated, action: PayloadAction<IColumnResp>) => {
    //   state.singleBoard.columns = [...state.singleBoard.columns, action.payload];
    // },
  },
  extraReducers: {
    [getAllColumns.pending.type]: pending,
    [getAllColumns.rejected.type]: reject,
    [getAllColumns.fulfilled.type]: fulfilled,
    [createColumn.pending.type]: pending,
    [createColumn.rejected.type]: reject,
    [createColumn.fulfilled.type]: fulfilled,
    // [updateAsyncBoard.pending.type]: pending,
    // [updateAsyncBoard.rejected.type]: reject,
    // [updateAsyncBoard.fulfilled.type]: fulfilled,
    // [deleteAsyncBoard.pending.type]: pending,
    // [deleteAsyncBoard.rejected.type]: reject,
    // [deleteAsyncBoard.fulfilled.type]: fulfilled,
    // [getSingleBoard.pending.type]: pending,
    // [getSingleBoard.rejected.type]: reject,
    // [getSingleBoard.fulfilled.type]: fulfilled,
  },
});

export const { setColumns, setSingleColumn } = columnSlice.actions;

export default columnSlice.reducer;

interface columnState {
  columns: IColumnResp[];
  rejectMsg: string;
  pending: boolean;
}
