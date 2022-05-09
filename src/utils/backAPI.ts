type IBoard = {
  id: string;
  title: string;
};

const urlBackEnd = 'https://safe-refuge-49235.herokuapp.com/';

const CreateNewBoard = async (title: string) => {
  const token = localStorage.getItem('token');

  const response = await fetch(urlBackEnd + 'boards', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: title }),
  });
  if (response.status === 200) {
    const json = await response.json();
    return json;
  } else if (response.status === 404) {
    const result = await response.json();
    console.log('Error', result.message);
  } else if (response.status === 401) {
    const result = await response.json();
    console.log('Error', result.message);
  }
};

const DeleteBoard = async (id: string): Promise<void> => {
  const token = localStorage.getItem('token');

  const response = await fetch(urlBackEnd + 'boards/' + id, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 404) {
    const result = await response.json();
    console.log('Error', result.message);
  }
};

const GetBoards = async (): Promise<IBoard[]> => {
  const token = localStorage.getItem('token');

  const response = await fetch(urlBackEnd + 'boards', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    const json = await response.json();
    return json;
  } else if (response.status === 404) {
    const result = await response.json();
    console.log('Error', result.message);
  }
  return [];
};

const UpdateBoard = async (id: string, title: string): Promise<void> => {
  const token = localStorage.getItem('token');

  const response = await fetch(urlBackEnd + 'boards/' + id, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: title }),
  });
  const result = await response.json();
};

export { CreateNewBoard, GetBoards, DeleteBoard, UpdateBoard };
