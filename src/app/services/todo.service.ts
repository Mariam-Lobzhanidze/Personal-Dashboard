import { Injectable } from "@angular/core";
import { Todo } from "../interfaces/todo.interface";
import { BehaviorSubject } from "rxjs";
import { Category } from "../interfaces/category.interface";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ComponentType } from "@angular/cdk/portal";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  //categories
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

  //todos

  private todos: Todo[] = [];

  private toDoListSubject = new BehaviorSubject<Todo[]>(this.todos);
  public toDoList$ = this.toDoListSubject.asObservable();

  public constructor(private dialog: MatDialog) {}

  public addNewToDoItem(item: Todo): void {
    this.todos = [item, ...this.todos];
    this.updateToDos();
  }

  public updateToDoItem(id: string | undefined, updatedData: Partial<Todo>): void {
    this.todos = this.todos.map((todo) => (todo.id === id ? { ...todo, ...updatedData } : todo));
    this.updateToDos();
  }

  public deleteTodo(id: string | undefined): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.updateToDos();
  }

  private updateToDos(): void {
    this.toDoListSubject.next([...this.todos]);
  }

  //categories
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

  public openDialog<T>(component: ComponentType<T>, data?: any): MatDialogRef<T> {
    const dialogRef = this.dialog.open(component, {
      height: "360px",
      width: "300px",
      panelClass: "my-dialog",
      data: data,
    });

    return dialogRef;
  }
}
