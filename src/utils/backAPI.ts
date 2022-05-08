type IBoard = {
  id: string;
  title: string;
};

class BackAPI {
  static urlBackEnd = 'https://safe-refuge-49235.herokuapp.com/';

  static member = {
    name: 'Vasya2',
    login: 'user002',
    password: 'userpass@123',
  };
  static async signUp(data: typeof this.member) {
    console.log('Данные для регистрации', data);
    const response = await fetch(this.urlBackEnd + 'signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    console.log(json);

    if (json.statusCode === 409) {
      this.signIn(data);
    }
  }

  static async signIn(data: typeof this.member) {
    const dataWithOutName = {
      login: data.login,
      password: data.password,
    };

    console.log('Данные для получения токена', data);
    const response = await fetch(this.urlBackEnd + 'signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataWithOutName),
    });
    const json = await response.json();
    console.log(json);
    localStorage.setItem('token', json.token);
  }

  static async createNewBoard(title: string) {
    console.log('Создание доски');
    const response = await fetch(this.urlBackEnd + 'boards', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: title }),
    });
    const json = await response.json();
    console.log(json);
  }

  static async getBoards(): Promise<IBoard[]> {
    console.log('Получение досок');
    const response = await fetch(this.urlBackEnd + 'boards', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const result = await response.json();
    console.log(result);
    return result;
  }

  static async updateBoard(id: string, title: string): Promise<void> {
    console.log('Переименование доски');
    const response = await fetch(this.urlBackEnd + 'boards/' + id, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: title }),
    });
    const result = await response.json();
    console.log(result);
  }

  static async deleteBoard(id: string): Promise<void> {
    console.log('Удаление доски');
    const response = await fetch(this.urlBackEnd + 'boards/' + id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (response.status === 204) {
      console.log('Доска удалена');
    } else if (response.status === 404) {
      const result = await response.json();
      console.log('Ошибка. Доска не найдена', result.message);
    }
  }
}

export default BackAPI;
