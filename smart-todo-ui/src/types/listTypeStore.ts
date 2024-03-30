export interface Task {
  id: string;
  title: string;
  timestamp: number;
  completed: boolean;
}

export interface List {
  id: string;
  name: string;
  tasks: Task[];
}
