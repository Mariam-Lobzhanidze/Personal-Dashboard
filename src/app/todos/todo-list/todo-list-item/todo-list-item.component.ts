import { Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { Todo } from "../../../interfaces/todo.interface";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-todo-list-item",
  standalone: true,
  imports: [MatCheckboxModule, FormsModule, MatIconModule, MatButtonModule],
  templateUrl: "./todo-list-item.component.html",
  styleUrl: "./todo-list-item.component.scss",
})
export class TodoListItemComponent {
  @Input() checked?: boolean;
  @Input() listItem?: Todo;
}
