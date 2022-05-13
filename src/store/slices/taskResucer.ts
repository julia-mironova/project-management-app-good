import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../constants/baseUrl';
import { localStorageGetUserToken } from '../../utils/localStorage';

type createTask = {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
};

export const createTask = createAsyncThunk<createTask, createTask, { rejectValue: string }>(
  'board/createTask',
  async (data, { rejectWithValue }) => {
    const token = localStorageGetUserToken();
    const response = await fetch(
      `${BASE_URL}boards/${data.boardId}/columns/${data.columnId}/tasks`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const resp = await response.json();
      return rejectWithValue(
        `bad server response, error code: ${resp?.statusCode} message: ${resp?.message}`
      );
    }

    return await response.json();
  }
);
