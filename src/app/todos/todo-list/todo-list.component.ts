import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TodoListItemComponent } from "./todo-list-item/todo-list-item.component";
import { TodoService } from "../../services/todo.service";
import { Todo } from "../../interfaces/todo.interface";
import { map, takeUntil } from "rxjs";
import { AddNewTodoComponent } from "./add-new-todo/add-new-todo.component";
import { UnsubscribeComponent } from "../../shared/unsubscribeComponent";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { SideNavComponent } from "../../shared/side-nav/side-nav.component";

@Component({
  selector: "app-todo-list",
  standalone: true,
  imports: [TodoListItemComponent, AddNewTodoComponent, SideNavComponent],
  templateUrl: "./todo-list.component.html",
  styleUrl: "./todo-list.component.scss",
})
export class TodoListComponent extends UnsubscribeComponent implements OnInit {
  public dialogRef!: MatDialogRef<any>;
  public activeCategory?: string | null | undefined;

  public todos?: Todo[];

  public constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private dialog: MatDialog
  ) {
    super();
  }

  public ngOnInit(): void {
    this.getActiveToDoCategory();
    this.getToDoList();
  }

  private getToDoList(): void {
    this.todoService.toDoList$
      .pipe(
        takeUntil(this.destroy$),
        map((todos) =>
          this.activeCategory === "all"
            ? todos
            : todos.filter((todo) => todo.categoryName === this.activeCategory)
        )
      )
      .subscribe((toDos) => {
        this.todos = toDos;
        console.log(this.todos);
      });
  }

  private getActiveToDoCategory(): void {
    this.route.queryParamMap.subscribe((paramMap) => {
      this.activeCategory = paramMap.get("category");
    });
  }

  public onOpenAddToDoDialog(): void {
    this.dialogRef = this.dialog.open(AddNewTodoComponent, {
      height: "360px",
      width: "300px",
      panelClass: "my-dialog",
    });

    this.dialogRef.afterClosed().subscribe((toDoData) => {
      if (toDoData) {
        console.log("Form data:", toDoData);
        this.todoService.addNewToDoItem(toDoData);
      }
    });
  }
}
