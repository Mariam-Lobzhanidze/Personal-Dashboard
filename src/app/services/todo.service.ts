import { Injectable } from "@angular/core";
import { Todo } from "../interfaces/todo.interface";
import { BehaviorSubject, Subject } from "rxjs";
import { Category } from "../interfaces/category.interface";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ComponentType } from "@angular/cdk/portal";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  //reminders
  private reminderSubject = new Subject<{ message: string; musicUrl: string }>();

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

  public constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

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

  //reminders

  public scheduleReminder(
    dueDate: Date,
    message: string,
    musicUrl: string,
    reminderHour: number = 9,
    reminderMinute: number = 0
  ) {
    const reminderDate = new Date(dueDate);
    reminderDate.setHours(reminderHour, reminderMinute, 0, 0); // Set time to the desired hour (e.g., 9 AM)

    const currentTime = new Date().getTime();
    const reminderTime = reminderDate.getTime();
    const timeDifference = reminderTime - currentTime;
    console.log(currentTime, reminderTime, timeDifference);

    if (timeDifference > 0) {
      setTimeout(() => {
        this.triggerReminder(message, musicUrl);
      }, timeDifference);
    } else {
      console.warn("The due date is in the past or the reminder time has passed today. Reminder not set.");
    }
  }

  private triggerReminder(message: string, musicUrl: string) {
    this.snackBar.open(message, "Close", {
      duration: 5000,
    });
    const audio = new Audio(musicUrl);
    audio.play();
  }
}
