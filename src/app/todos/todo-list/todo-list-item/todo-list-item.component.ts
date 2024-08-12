import { Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Todo } from "../../../interfaces/todo.interface";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { TodoService } from "../../../services/todo.service";
import { MatMenuModule } from "@angular/material/menu";
import { EditMenuComponent } from "../../../shared/edit-menu/edit-menu.component";
import { AddNewTodoComponent } from "../add-new-todo/add-new-todo.component";
import confetti from "canvas-confetti";
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
      icon: "/assets/icons/edit.svg",
      title: "edit",
    },
    {
      icon: "/assets/icons/delete.svg",
      title: "delete",
    },
    {
      icon: "/assets/icons/notify.svg",
      title: "disable",
    },
  ];

  public constructor(private todoService: TodoService) {}

  public onDetermineCompletionState(toDoItemId: string | undefined, completed: boolean): void {
    this.todoService.updateToDoItem(toDoItemId, { completed: completed });
    if (completed) {
      this.playSoundAndConfetti();
    }
  }

  private playSoundAndConfetti(): void {
    confetti({
      shapes: ["square"],
      particleCount: 100,
      spread: 100,
      origin: {
        y: 0.5,
        x: 0.5,
      },
      colors: ["#ffb759", "#65bd19", "#a3d775", "#ffd49b", "#208373"],
      gravity: 0.8,
    });

    // Clear confetti after a certain duration
    setTimeout(() => confetti.reset(), 3000);
  }

  onMenuItemClicked(action: string) {
    console.log(this.listItem?.id, action);

    switch (action) {
      case "edit":
        this.openDialogToEditTodo();
        break;
      case "delete":
        this.todoService.deleteTodo(this.listItem?.id);
        break;
      case "disable":
        break;
      case "enable":
        break;
    }
  }

  public openDialogToEditTodo() {
    this.todoService.openDialog(AddNewTodoComponent, {
      description: this.listItem?.description,
      dueDate: this.listItem?.dueDate,
      id: this.listItem?.id,
    });
  }
}
