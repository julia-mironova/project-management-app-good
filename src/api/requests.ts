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

export { getUserById };
