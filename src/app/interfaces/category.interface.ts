export interface Category {
  id: string;
  title: string;
  icon?: string;
  activeTodosCount: number;
  // type: string;
  type: "user" | "default";
}
