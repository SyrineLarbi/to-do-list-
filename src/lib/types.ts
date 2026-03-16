export type TaskStatus = "not-started" | "in-progress" | "done";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  createdAt: number;
}

export interface Project {
  id: string;
  name: string;
  tasks: Task[];
  createdAt: number;
}
