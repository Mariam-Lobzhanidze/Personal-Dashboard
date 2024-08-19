import { Injectable } from "@angular/core";
import { Todo } from "../interfaces/todo.interface";
import { BehaviorSubject } from "rxjs";
import { Category } from "../interfaces/category.interface";
import { SharedService } from "./shared.service";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  //categories
  private defaultCategories: Category[] = [
    { id: "1", title: "all", icon: "all.svg", activeTodosCount: 0, type: "default" },
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

  public constructor(private sharedService: SharedService) {}

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

  //categories methods
  public addUserCategory(category: Category): void {
    if (
      [...this.userCategories, ...this.defaultCategories].some(
        (cat) => cat.title.toLowerCase() === category.title.toLowerCase()
      )
    ) {
      this.sharedService.showSnackbar("Category with this name already exists", 5000, "top");
      return;
    }

    this.userCategories = [category, ...this.userCategories];
    this.updateCategories();
  }

  public updateUserCategory(categoryId: string, updatedCategory: Partial<Category>): void {
    this.userCategories = this.userCategories.map((category) =>
      category.id === categoryId ? { ...category, ...updatedCategory } : category
    );
    this.updateCategories();
  }

  public deleteUserCategory(categoryId: string | undefined): void {
    this.userCategories = this.userCategories.filter((category) => category.id !== categoryId);
    this.updateCategories();
  }

  private updateCategories(): void {
    this.categoriesSubject.next([...this.userCategories, ...this.defaultCategories]);
  }

  //reminders for to do list items

  public scheduleReminder(dueDate: Date, message: string, musicUrl: string) {
    const currentTime = new Date().getTime();
    const reminderTime = dueDate.getTime();
    const timeDifference = reminderTime - currentTime;

    if (timeDifference > 0) {
      setTimeout(() => {
        this.triggerReminder(message, musicUrl);
      }, timeDifference);
    } else {
      this.sharedService.showSnackbar(
        "Choose a future time. The selected time has already passed!",
        5000,
        "top"
      );
    }
  }

  private triggerReminder(message: string, musicUrl: string) {
    this.sharedService.showSnackbar(message, 5000, "top");
    const audio = new Audio(musicUrl);
    audio.play();
  }
}
