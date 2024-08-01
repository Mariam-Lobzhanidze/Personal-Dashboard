export interface Category {
  id: string;
  title: string;
  icon?: string;
  activeTodosCount: number;
  type: "user" | "default";
}
