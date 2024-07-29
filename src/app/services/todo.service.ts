import { Injectable } from "@angular/core";
import { Todo } from "../interfaces/todo.interface";
import { BehaviorSubject, Observable, of } from "rxjs";
import { Category } from "../interfaces/category.interface";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  public categories: Category[] = [
    { id: 1, title: "work", icon: "work.svg", activeTodosCount: 5 },
    { id: 2, title: "personal", icon: "person.svg", activeTodosCount: 2 },
    { id: 3, title: "shopping", icon: "shopping.svg", activeTodosCount: 3 },
    { id: 4, title: "sport", icon: "sport.svg", activeTodosCount: 3 },
    { id: 5, title: "family", icon: "family.svg", activeTodosCount: 3 },
    { id: 6, title: "hobby", icon: "hobby.svg", activeTodosCount: 3 },
  ];

  private todos: Todo[] = [];
  public filteredTodoListsSubject = new BehaviorSubject<Todo[]>(this.todos);

  public constructor() {}

  // public getToDoListByCategory(category: string | null | undefined): Observable<Todo[]> {
  //   const toDoListItemsByCategory = this.todos.filter((todo) => todo.categoryName === category);
  //   return of(toDoListItemsByCategory);
  // }

  public addNewToDoItem(item: Todo): void {
    this.todos.push(item);
  }

  public get toDoList(): Todo[] {
    return this.todos;
  }
}
