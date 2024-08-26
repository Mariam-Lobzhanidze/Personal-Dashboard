import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TodoListItemComponent } from "./todo-list-item/todo-list-item.component";
import { TodoService } from "../../services/todo.service";
import { Todo } from "../../interfaces/todo.interface";
import { map, Observable, switchMap, takeUntil, tap } from "rxjs";
import { AddNewTodoComponent } from "./add-new-todo/add-new-todo.component";
import { UnsubscribeComponent } from "../../shared/unsubscribeComponent";
import { SideNavComponent } from "./side-nav/side-nav.component";
import { MatChipsModule } from "@angular/material/chips";
import { Category } from "../../interfaces/category.interface";
import { CommonModule } from "@angular/common";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { SharedService } from "../../services/shared.service";

@Component({
  selector: "app-todo-list",
  standalone: true,
  imports: [
    TodoListItemComponent,
    AddNewTodoComponent,
    SideNavComponent,
    MatChipsModule,
    CommonModule,
    MatProgressBarModule,
  ],
  templateUrl: "./todo-list.component.html",
  styleUrl: "./todo-list.component.scss",
})
export class TodoListComponent extends UnsubscribeComponent implements OnInit, AfterViewInit {
  @ViewChild(SideNavComponent) sideNavComponent?: SideNavComponent;

  private selectedChipEl?: HTMLElement;
  public completionRateByCategory?: number;

  public activeCategory?: string | null | undefined;
  public categories$?: Observable<Category[]>;

  public todos?: Todo[];

  public filteredTodos?: Todo[];

  public constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private router: Router,
    private sharedService: SharedService
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
        this.filteredTodos = toDos;
        // console.log(this.todos);

        const totalItems = this.todos.length;
        const completedItems = this.todos.filter((todo) => todo.completed).length;
        this.completionRateByCategory = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
      });
  }

  public ngAfterViewInit(): void {
    this.selectedChipEl?.scrollIntoView({ behavior: "smooth" });
  }

  public scrollToSelectedChip() {}

  public onOpenAddToDoDialog(): void {
    this.sharedService.openDialog(AddNewTodoComponent);
  }

  public onCategorySelect(event: any, title: string): void {
    this.selectedChipEl = event.source._elementRef.nativeElement;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: title },
      queryParamsHandling: "merge",
    });
  }

  public onBackToCategories(): void {
    this.router.navigate(["todos"]);
  }

  public removeFilters(): void {
    this.filteredTodos = this.todos;
    if (this.sideNavComponent) {
      this.sideNavComponent.completionState = "all";
    }
  }

  public filterTodosByCompletionState(value: string) {
    this.filteredTodos = this.todos?.filter((todo) =>
      value === "active" ? !todo.completed : value === "completed" ? todo.completed : true
    );
  }
}
