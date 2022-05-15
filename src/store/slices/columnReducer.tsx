import { createAsyncThunk } from '@reduxjs/toolkit';
import { boardState, IColumn } from '../../types/board';
import { BASE_URL } from '../../constants/baseUrl';
import { localStorageGetUserToken } from '../../utils/localStorage';

type createColumn = {
  boardId: string;
  title: string;
  order: number;
};
type updateColumn = {
  boardId: string;
  columnId: string;
  title: string;
  order: number;
};

type responseCreateColumn = {
  id: string;
  title: string;
  order: number;
};

type deleteColumn = {
  boardId: string;
  columnId: string;
  order: number;
};

/* export const getAllColumns = createAsyncThunk<
  responseCreateColumn,
  string,
  { rejectValue: string }
>('column/getAllColumns', async (boardId, { rejectWithValue }) => {
  const token = localStorageGetUserToken();
  const response = await fetch(`${BASE_URL}boards/${boardId}/columns`, {
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
}); */

export const createColumn = createAsyncThunk<
  responseCreateColumn,
  createColumn,
  { rejectValue: string }
>('column/createColumn', async (data, { rejectWithValue }) => {
  const token = localStorageGetUserToken();
  const response = await fetch(`${BASE_URL}boards/${data.boardId}/columns`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title: data.title, order: data.order }),
  });

  if (!response.ok) {
    const resp = await response.json();
    return rejectWithValue(
      `bad server response, error code: ${resp?.statusCode} message: ${resp?.message}`
    );
  }
  return await response.json();
});

export const updateColumn = createAsyncThunk<
  responseCreateColumn,
  updateColumn,
  { rejectValue: string; state: { boards: boardState } }
>('column/updateColumn', async (data, { rejectWithValue, getState }) => {
  const columns = getState().boards.singleBoard.columns;
  const target = columns.find((el) => el.id === data.columnId);

  const token = localStorageGetUserToken();
  const response = await fetch(`${BASE_URL}boards/${data.boardId}/columns/${data.columnId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title: data.title, order: data.order }),
  });

  if (!response.ok) {
    const resp = await response.json();
    return rejectWithValue(
      `bad server response, error code: ${resp?.statusCode} message: ${resp?.message}`
    );
  }
  return Object.assign({}, target, { order: data.order });
});

export const deleteColumn = createAsyncThunk<
  IColumn[],
  deleteColumn,
  { rejectValue: string; state: { boards: boardState } }
>('column/deleteColumn', async (data, { rejectWithValue, getState }) => {
  const token = localStorageGetUserToken();
  const columns = getState().boards.singleBoard.columns;
  const filteredColumn = columns.filter((el) => el.id !== data.columnId);

  const response = await fetch(`${BASE_URL}boards/${data.boardId}/columns/${data.columnId}`, {
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
  //type reject = ReturnType<typeof rejectWithValue>;

  columnLoop(data.boardId, filteredColumn, token, rejectWithValue);
  return magics(filteredColumn);
});

const magics = (arr: Array<IColumn>) => {
  return arr.map((el, i) => {
    return Object.assign({}, el, { order: i + 1 });
  });
};

const columnLoop = async (
  boardId: string,
  columns: IColumn[],
  token: string,
  rejectWithValue: (value: string) => void
) => {
  let i = 0;
  const acc = [] as IColumn[];
  for (const item of columns) {
    i++;
    const response = await fetch(`${BASE_URL}boards/${boardId}/columns/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: item.title, order: i }),
    });
    if (!response.ok) {
      const resp = await response.json();
      return rejectWithValue(
        `bad server response, error code: ${resp?.statusCode} message: ${resp?.message}`
      );
    }
    const data = await response.json();
    acc.push(data);
  }
  return acc;
};

/*

if (columns.length !== data.order) {
  await Promise.all(
    filteredColumn.map(async (el, index) => {
      await dispatch(
        updateColumn({
          boardId: data.boardId,
          columnId: el.id,
          order: index + 1,
          title: el.title,
        })
      );
    })
  );
  return data.columnId;
}
return undefined; */
