import { Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Todo } from "../../../interfaces/todo.interface";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { TodoService } from "../../../services/todo.service";
import { MatMenuModule } from "@angular/material/menu";
import { EditMenuComponent } from "../../../shared/edit-menu/edit-menu.component";

@Component({
  selector: "app-todo-list-item",
  standalone: true,
  imports: [FormsModule, MatIconModule, MatButtonModule, CommonModule, MatMenuModule, EditMenuComponent],
  templateUrl: "./todo-list-item.component.html",
  styleUrl: "./todo-list-item.component.scss",
})
export class TodoListItemComponent {
  @Input() listItem?: Todo;
  public menuItems: { icon: string; title: string }[] = [
    {
      icon: "edit",
      title: "Edit",
    },
    {
      icon: "delete",
      title: "Delete",
    },
    {
      icon: "notifications",
      title: "Disable",
    },
  ];

  public constructor(private todoService: TodoService) {}

  public onDetermineCompletionState(toDoItemId: string | undefined, completed: boolean): void {
    this.todoService.updateToDoCompletionState(toDoItemId, completed);
  }
}
