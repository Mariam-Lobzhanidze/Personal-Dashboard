export interface Todo {
  id: string;
  description: string;
  completed: boolean;
  categoryId?: number;
  categoryName: string;
  createdAt?: Date;
  dueDate?: Date;
}
