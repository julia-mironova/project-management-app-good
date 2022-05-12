import { IColumnBody } from '../types/board';
import { localStorageGetUserToken } from '../utils/localStorage';
import { BASE_URL } from '../constants/baseUrl';

const getUserById = async (id: string, token: string): Promise<Response> => {
  const response = await fetch(`${BASE_URL}users/${id}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const getBoardById = async (id: string): Promise<Response> => {
  const token = localStorageGetUserToken();
  const response = await fetch(`${BASE_URL}boards/${id}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

//columns
const getAllColumnsRequest = async (boardId: string): Promise<Response> => {
  const token = localStorageGetUserToken();
  const response = await fetch(`${BASE_URL}boards/${boardId}/columns`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const postColumn = async (boardId: string, columnBody: IColumnBody): Promise<Response> => {
  const token = localStorageGetUserToken();
  const response = await fetch(`${BASE_URL}boards/${boardId}/columns`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(columnBody),
  });
  return response;
};

const deleteColumnRequest = async (boardId: string, columnId: string): Promise<Response> => {
  const token = localStorageGetUserToken();
  const response = await fetch(`${BASE_URL}boards/${boardId}/columns/${columnId}`, {
    method: 'Delete',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const updateColumnRequest = async (
  boardId: string,
  columnId: string,
  columnBody: IColumnBody
): Promise<Response> => {
  const token = localStorageGetUserToken();
  const response = await fetch(`${BASE_URL}boards/${boardId}/columns/${columnId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(columnBody),
  });
  return response;
};

//tasks
const getAllTasksRequest = async (boardId: string, columnId: string): Promise<Response> => {
  const token = localStorageGetUserToken();
  const response = await fetch(`${BASE_URL}boards/${boardId}/columns/${columnId}/tasks`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export {
  getUserById,
  getBoardById,
  postColumn,
  getAllColumnsRequest,
  deleteColumnRequest,
  updateColumnRequest,
  getAllTasksRequest,
};
