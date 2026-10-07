export type TodoPriority = 'low' | 'medium' | 'high';

export interface Todo {
  id: string;
  title: string;
  description: string;
  priority: TodoPriority;
  createdAt: string;
  updatedAt: string;
}
