type IBoard = {
  id: string;
  title: string;
};

const urlBackEnd = 'https://safe-refuge-49235.herokuapp.com/';

const CreateNewBoard = async (title: string) => {
  console.log('Создание доски');

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
    console.log('Доска создана', json);
    return json;
  } else if (response.status === 404) {
    const result = await response.json();
    console.log('Ошибка', result.message);
  } else if (response.status === 401) {
    const result = await response.json();
    console.log('Ошибка', result.message);
  }
};

const DeleteBoard = async (id: string): Promise<void> => {
  console.log('Удаление доски');

  const token = localStorage.getItem('token');

  const response = await fetch(urlBackEnd + 'boards/' + id, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 204) {
    console.log('Доска удалена');
  } else if (response.status === 404) {
    const result = await response.json();
    console.log('Ошибка. Доска не найдена', result.message);
  }
};

const GetBoards = async (): Promise<IBoard[]> => {
  console.log('Получение досок');

  const token = localStorage.getItem('token');

  const response = await fetch(urlBackEnd + 'boards', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    const json = await response.json();
    console.log('Доски получены', json);
    return json;
  } else if (response.status === 404) {
    const result = await response.json();
    console.log('Ошибка', result.message);
  }
  return [];
};

const UpdateBoard = async (id: string, title: string): Promise<void> => {
  console.log('Переименование доски');

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
  console.log(result);
};

export { CreateNewBoard, GetBoards, DeleteBoard, UpdateBoard };
