import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITask, ITaskResponse } from '../../types/board';
import { BASE_URL } from '../../constants/baseUrl';
import { localStorageGetUser, localStorageGetUserToken } from '../../utils/localStorage';

// type ITaskResponse = {
//   id: string;
//   title: string;
//   order: number;
//   description: string;
//   userId: string;
//   boardId: string;
//   columnId: string;
// };

type IDataDeleteTask = {
  tasks: ITask[];
  boardId: string;
  columnId: string;
  taskId: string;
};

export const createTask = createAsyncThunk<ITaskResponse, ITaskResponse, { rejectValue: string }>(
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
        body: JSON.stringify({
          title: data.title,
          order: data.order,
          description: data.description,
          userId: data.userId,
        }),
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

export const deleteTask = createAsyncThunk<
  IDataDeleteTask,
  IDataDeleteTask,
  { rejectValue: string }
>('board/deleteTask', async (data, { rejectWithValue }) => {
  const token = localStorageGetUserToken();

  const response = await fetch(
    `${BASE_URL}boards/${data.boardId}/columns/${data.columnId}/tasks/${data.taskId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const resp = await response.json();
    return rejectWithValue(
      `bad server response, error code: ${resp?.statusCode} message: ${resp?.message}`
    );
  }
  const orderDeleteTask = data.tasks.find((task) => task.id === data.taskId)?.order || 0;
  const TasksWhithoutDelete = data.tasks.filter((el) => el.id !== data.taskId);
  const filterTasks = TasksWhithoutDelete.filter((el) => el.order > orderDeleteTask);
  decreaseOrdersOnServer(filterTasks, data.boardId, data.columnId);
  return await response.json();
});

export const updateTask = createAsyncThunk<ITaskResponse, ITaskResponse, { rejectValue: string }>(
  'board/updateTask',
  async (data, { rejectWithValue }) => {
    const token = localStorageGetUserToken();

    const response = await fetch(
      `${BASE_URL}boards/${data.boardId}/columns/${data.columnId}/tasks/${data.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: data.title,
          order: data.order,
          description: data.description,
          userId: data.userId,
          boardId: data.boardId,
          columnId: data.columnId,
        }),
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

const decreaseOrdersOnServer = async (tasks: ITask[], boardId: string, columnId: string) => {
  const token = localStorageGetUserToken();
  const userId = localStorageGetUser()?.id;
  const resultPromise = tasks.map((item) => {
    return fetch(`${BASE_URL}boards/${boardId}/columns/${columnId}/tasks/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: item.title,
        order: item.order - 1,
        description: item.description,
        userId: userId,
        boardId: boardId,
        columnId: columnId,
      }),
    });
  });

  const response = await Promise.all(resultPromise);
  console.log(response);
};
