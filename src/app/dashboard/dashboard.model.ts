export interface Task {
  createdAt: string;
  id: string;
  name: string;
}

export interface Log {
  end?: string;
  id?: string;
  start?: string;
  task?: Task;
  taskId?: number;
  taskName?: string;
}
