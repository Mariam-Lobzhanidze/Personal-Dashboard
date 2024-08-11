import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TodoListItemComponent } from "./todo-list-item/todo-list-item.component";
import { TodoService } from "../../services/todo.service";
import { Todo } from "../../interfaces/todo.interface";
import { map, Observable, switchMap, takeUntil, tap } from "rxjs";
import { AddNewTodoComponent } from "./add-new-todo/add-new-todo.component";
import { UnsubscribeComponent } from "../../shared/unsubscribeComponent";
// import { MatDialog } from "@angular/material/dialog";
import { SideNavComponent } from "../../shared/side-nav/side-nav.component";
import { MatChipsModule } from "@angular/material/chips";
import { Category } from "../../interfaces/category.interface";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-todo-list",
  standalone: true,
  imports: [TodoListItemComponent, AddNewTodoComponent, SideNavComponent, MatChipsModule, CommonModule],
  templateUrl: "./todo-list.component.html",
  styleUrl: "./todo-list.component.scss",
})
export class TodoListComponent extends UnsubscribeComponent implements OnInit {
  public activeCategory?: string | null | undefined;
  public categories$?: Observable<Category[]>;

  public todos?: Todo[];

  public constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    // private dialog: MatDialog,
    private router: Router
  ) {
    super();
  }

  public ngOnInit(): void {
    this.categories$ = this.todoService.categories$;

    this.route.queryParamMap
      .pipe(
        takeUntil(this.destroy$),
        tap((paramMap) => {
          this.activeCategory = paramMap.get("category") || "all";
        }),
        switchMap(() =>
          this.todoService.toDoList$.pipe(
            map((todos) =>
              this.activeCategory === "all"
                ? todos
                : todos.filter((todo) => todo.categoryName === this.activeCategory)
            )
          )
        )
      )
      .subscribe((toDos) => {
        this.todos = toDos;
      });
  }

  public onOpenAddToDoDialog(): void {
    this.todoService.openDialog(AddNewTodoComponent);
  }

  public onCategorySelect(title: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: title },
    });
  }
}
