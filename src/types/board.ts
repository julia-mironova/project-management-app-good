export type IFileAttached = {
  filename: string;
  fileSize: number;
};

export type ITaskResp = {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files: IFileAttached[];
};

export type ITasksResp = {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  id: string;
};

export type ITaskBody = {
  title: string;
  order: number;
  description: string;
  userId: string;
};

export type IColumn = {
  id: string;
  title: string;
  order: number;
  tasks: ITaskResp[];
};

export type IBoardFull = {
  id: string;
  title: string;
  columns: IColumn[];
};

export type IColumnsResp = {
  id: string;
  title: string;
  order: number;
};

export type IColumnBody = {
  title: string;
  order: number;
};

// {
//   "title": "take onion",
//   "order": 3,
//   "description": "take onion 2 pcs",
//   "userId": "c6d7428a-07e0-4317-8c99-96317807798c"
// }
