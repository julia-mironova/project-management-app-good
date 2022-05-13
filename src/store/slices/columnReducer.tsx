import { createAsyncThunk } from '@reduxjs/toolkit';
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
};

export const createColumn = createAsyncThunk<responseCreateColumn, createColumn>(
  'column/createColumn',
  async (data, { rejectWithValue }) => {
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
  }
);

export const updateColumn = createAsyncThunk<responseCreateColumn, updateColumn>(
  'column/updateColumn',
  async (data, { rejectWithValue }) => {
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
    return await response.json();
  }
);

export const deleteColumn = createAsyncThunk<string, deleteColumn>(
  'column/deleteColumn',
  async (data, { rejectWithValue }) => {
    const token = localStorageGetUserToken();
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
    return data.columnId;
  }
);
