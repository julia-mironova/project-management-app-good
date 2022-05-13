export type IBoard = {
  id: string;
  title: string;
  columns: IColumn[];
};

export type IColumn = {
  id: string;
  title: string;
  order: number;
  tasks?: ITask[];
};

export type ITask = {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  files?: IFileAttached[];
};

export type ITaskResponse = {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
};

export type IFileAttached = {
  filename: string;
  fileSize: number;
};
