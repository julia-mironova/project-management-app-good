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
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(columnBody),
  });
  return response;
};

export { getUserById, getBoardById, postColumn, getAllColumnsRequest };
