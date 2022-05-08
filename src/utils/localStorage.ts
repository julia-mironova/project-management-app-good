interface UserInfo {
  token: string;
  id: string;
  name: string | undefined;
}

const localStorageSetUser = (userInfo: UserInfo) => {
  const stringifiedValue = JSON.stringify(userInfo);
  localStorage.setItem('userInfo', stringifiedValue);
};

const localStorageRemoveUser = (userInfo: UserInfo) => {
  localStorage.removeItem('userInfo');
};

const localStorageClear = () => {
  localStorage.clear();
};

export { localStorageClear, localStorageSetUser, localStorageRemoveUser };
