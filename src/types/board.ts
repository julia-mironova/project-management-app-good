export type IFileAttached = {
  filename: string;
  fileSize: number;
};

export type ITask = {
  id: string;
  title: string;
  order: number;
  done: boolean;
  description: string;
  userId: string;
  files: IFileAttached[];
};

export type IColumn = {
  id: string;
  title: string;
  order: number;
  tasks: ITask[];
};

export type IBoardFull = {
  id: string;
  title: string;
  columns: IColumn[];
};

export type IColumnResp = {
  id: string;
  title: string;
  order: number;
};

export type IColumnBody = {
  title: string;
  order: number;
};
