import { Injectable } from "@angular/core";
import { Todo } from "../interfaces/todo.interface";
import { BehaviorSubject, takeUntil, takeWhile, timer } from "rxjs";
import { Category } from "../interfaces/category.interface";
import { SharedService } from "./shared.service";
import { UnsubscribeComponent } from "../shared/unsubscribeComponent";

@Injectable({
  providedIn: "root",
})
export class TodoService extends UnsubscribeComponent {
  private audio?: HTMLAudioElement;
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

  public constructor(private sharedService: SharedService) {
    super();
    this.getTodosFromLocalStorage();
    // this.userCategories = this.userCategoriesFromStorage;
    // this.updateCategories();
  }

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
    this.saveTodosToLocalStorage();
  }

  private saveTodosToLocalStorage(): void {
    const todos = JSON.stringify(this.todos);
    localStorage.setItem("todos", todos);
  }

  private getTodosFromLocalStorage(): void {
    const todos = localStorage.getItem("todos");
    if (todos) {
      this.todos = JSON.parse(todos).map((todo: Todo) => ({
        ...todo,
        dueDate: todo.dueDate ? new Date(todo.dueDate) : null,
        createdAt: todo.createdAt ? new Date(todo.createdAt) : null,
      }));

      this.updateToDos();
    }
  }

  //categories methods
  private saveCategoriesToLocalStorage(): void {
    const categories = JSON.stringify(this.userCategories);
    localStorage.setItem("userCategories", categories);
  }

  private get userCategoriesFromStorage(): any {
    const categories = JSON.parse(localStorage.getItem("userCategories") as string);

    return categories;
  }

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
    this.saveCategoriesToLocalStorage();
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

  //reminder for to do list items

  public scheduleReminder(dueDate: Date, createdAt: Date, message: string, musicUrl: string): void {
    const reminderTime = dueDate.getTime();

    const currentTime = createdAt.getTime();

    const timeDifference = reminderTime - currentTime;

    if (timeDifference > 0) {
      timer(timeDifference)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.triggerReminder(message, musicUrl);
        });
    } else {
      this.sharedService.showSnackbar("Reminder time is in the past.", 5000, "top");
    }
  }

  private triggerReminder(message: string, musicUrl: string): void {
    let snackBarRef = this.sharedService.showSnackbar(message, 35000, "top");
    snackBarRef.onAction().subscribe(() => {
      this.audio?.pause();
      if (this.audio) {
        this.audio.currentTime = 0;
      }
    });

    this.audio = new Audio(musicUrl);
    this.audio.play();
  }
}
