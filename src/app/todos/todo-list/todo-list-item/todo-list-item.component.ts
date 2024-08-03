import { Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Todo } from "../../../interfaces/todo.interface";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { TodoService } from "../../../services/todo.service";

@Component({
  selector: "app-todo-list-item",
  standalone: true,
  imports: [FormsModule, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: "./todo-list-item.component.html",
  styleUrl: "./todo-list-item.component.scss",
})
export class TodoListItemComponent {
  @Input() listItem?: Todo;

  public constructor(private todoService: TodoService) {}

  public onDetermineCompletionState(toDoItemId: string | undefined, completed: boolean): void {
    this.todoService.updateToDoCompletionState(toDoItemId, completed);
  }
}
