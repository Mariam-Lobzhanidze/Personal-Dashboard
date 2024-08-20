export interface Todo {
  id: string;
  description: string;
  completed: boolean;
  categoryId?: string;
  categoryName: string;
  createdAt: Date;
  dueDate: Date;
}
