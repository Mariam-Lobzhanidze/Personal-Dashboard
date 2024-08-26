import { Component, EventEmitter, Input, Output } from "@angular/core";
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
import { SharedService } from "../../../services/shared.service";
@Component({
  selector: "app-todo-list-item",
  standalone: true,
  imports: [FormsModule, MatIconModule, MatButtonModule, CommonModule, MatMenuModule, EditMenuComponent],
  templateUrl: "./todo-list-item.component.html",
  styleUrl: "./todo-list-item.component.scss",
})
export class TodoListItemComponent {
  @Input() listItem?: Todo;
  @Output() toDoCompletionUpdate = new EventEmitter<void>();

  public menuItems: { icon: string; title: string }[] = [
    {
      icon: "/assets/icons/edit.svg",
      title: "edit",
    },
    {
      icon: "/assets/icons/delete.svg",
      title: "delete",
    },
  ];

  public constructor(private todoService: TodoService, private sharedService: SharedService) {}

  public get filteredMenuItems(): { icon: string; title: string }[] {
    if (this.listItem?.completed) {
      return this.menuItems.filter((item) => item.title !== "edit");
    }
    return this.menuItems;
  }

  public onDetermineCompletionState(toDoItemId: string | undefined, completed: boolean): void {
    this.todoService.updateToDoItem(toDoItemId, { completed: completed });
    this.toDoCompletionUpdate.emit();

    if (completed) {
      this.playConfetti();
    }
  }

  private playConfetti(): void {
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
    // console.log(this.listItem?.id, action);

    switch (action) {
      case "edit":
        this.openDialogToEditTodo();
        break;
      case "delete":
        this.todoService.deleteTodo(this.listItem?.id);
        break;
    }
  }

  public openDialogToEditTodo() {
    this.sharedService.openDialog(AddNewTodoComponent, {
      description: this.listItem?.description,
      dueDate: this.listItem?.dueDate,
      id: this.listItem?.id,
      time: {
        hours: this.listItem?.hours,
        minutes: this.listItem?.minutes,
        period: this.listItem?.period,
      },
    });
  }
}
