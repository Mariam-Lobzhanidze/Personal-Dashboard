import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TodoListItemComponent } from "./todo-list-item/todo-list-item.component";
import { TodoService } from "../../services/todo.service";
import { Todo } from "../../interfaces/todo.interface";
import { filter, map, Observable } from "rxjs";
import { AddNewTodoComponent } from "./add-new-todo/add-new-todo.component";

@Component({
  selector: "app-todo-list",
  standalone: true,
  imports: [TodoListItemComponent, AddNewTodoComponent],
  templateUrl: "./todo-list.component.html",
  styleUrl: "./todo-list.component.scss",
})
export class TodoListComponent implements OnInit {
  public activeCategory?: string | null | undefined;

  public todos?: Todo[];

  public constructor(private route: ActivatedRoute, private todoService: TodoService) {}

  public ngOnInit(): void {
    this.getActiveToDoCategory();
    this.getToDoList();
  }

  private getToDoList(): void {
    this.todoService.filteredTodoListsSubject
      .pipe(map((todos) => todos.filter((todo) => todo.categoryName === this.activeCategory)))
      .subscribe((filteredToDos) => {
        this.todos = filteredToDos;
      });
  }

  private getActiveToDoCategory(): void {
    this.route.queryParamMap.subscribe((paramMap) => {
      this.activeCategory = paramMap.get("category");
    });
  }
}
