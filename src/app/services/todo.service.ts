import { Injectable } from "@angular/core";
import { Todo } from "../interfaces/todo.interface";
import { BehaviorSubject } from "rxjs";
import { Category } from "../interfaces/category.interface";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  private defaultCategories: Category[] = [
    { id: "1", title: "all", icon: "work.svg", activeTodosCount: 0, type: "default" },
    { id: "2", title: "work", icon: "work.svg", activeTodosCount: 0, type: "default" },
    { id: "3", title: "shopping", icon: "shopping.svg", activeTodosCount: 0, type: "default" },
    { id: "4", title: "sport", icon: "sport.svg", activeTodosCount: 0, type: "default" },
    { id: "5", title: "family", icon: "family.svg", activeTodosCount: 0, type: "default" },
  ];

  private userCategories: Category[] = [];

  private categoriesSubject = new BehaviorSubject<Category[]>([
    ...this.defaultCategories,
    ...this.userCategories,
  ]);
  public categories$ = this.categoriesSubject.asObservable();

  private todos: Todo[] = [];

  private toDoListSubject = new BehaviorSubject<Todo[]>(this.todos);
  public toDoList$ = this.toDoListSubject.asObservable();

  public constructor() {}

  public addNewToDoItem(item: Todo): void {
    this.todos.push(item);
    this.updateToDos(item);
  }

  private updateToDos(todo: Todo): void {
    this.toDoListSubject.next([...this.todos]);
  }

  public addUserCategory(category: Category): void {
    this.userCategories.unshift(category);
    this.updateCategories();
  }

  public deleteUserCategory(categoryId: string): void {
    this.userCategories.filter((category) => category.id !== categoryId);
    this.updateCategories();
  }

  private updateCategories(): void {
    this.categoriesSubject.next([...this.userCategories, ...this.defaultCategories]);
  }
}
