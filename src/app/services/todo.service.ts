import { Injectable } from "@angular/core";
import { Todo } from "../interfaces/todo.interface";
import { Observable, of } from "rxjs";
import { Category } from "../interfaces/category.interface";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  public categories: Category[] = [
    { id: 1, title: "Work", icon: "work.svg", activeTodosCount: 5 },
    { id: 2, title: "Personal", icon: "person.svg", activeTodosCount: 2 },
    { id: 3, title: "Shopping", icon: "shopping.svg", activeTodosCount: 3 },
    { id: 4, title: "Sport", icon: "sport.svg", activeTodosCount: 3 },
    { id: 5, title: "Family", icon: "family.svg", activeTodosCount: 3 },
    { id: 6, title: "hobby", icon: "hobby.svg", activeTodosCount: 3 },
  ];

  // private todos: Todo[] = [
  //   { id: 1, description: "Finish project", categoryId: 1, createdAt: new Date(), completed: false },
  //   {
  //     id: 2,
  //     description: "Buy groceries",
  //     categoryId: 2,
  //     createdAt: new Date(),
  //     completed: false,
  //   },
  //   {
  //     id: 3,
  //     description: "Read book",
  //     categoryId: 3,
  //     createdAt: new Date(),
  //     completed: false,
  //   },
  // ];

  // public getToDos(): Observable<Todo[]> {
  //   return of(this.todos);
  // }
  constructor() {}
}
