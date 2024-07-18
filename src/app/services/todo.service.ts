import { Injectable } from "@angular/core";
import { Todo } from "../interfaces/todo.interface";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  private todos: Todo[] = [
    { id: 1, description: "Finish project", categoryId: 1, createdAt: new Date(), completed: false },
    {
      id: 2,
      description: "Buy groceries",
      categoryId: 2,
      createdAt: new Date(),
      completed: false,
    },
    {
      id: 3,
      description: "Read book",
      categoryId: 3,
      createdAt: new Date(),
      completed: false,
    },
  ];

  public getToDos(): Observable<Todo[]> {
    return of(this.todos);
  }
  constructor() {}
}
