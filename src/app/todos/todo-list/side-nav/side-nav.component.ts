import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { TodoService } from "../../../services/todo.service";
import { UnsubscribeComponent } from "../../../shared/unsubscribeComponent";
import { takeUntil } from "rxjs";
import { MatRadioModule } from "@angular/material/radio";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { CommonModule } from "@angular/common";
import { MatDividerModule } from "@angular/material/divider";

@Component({
  selector: "app-side-nav",
  standalone: true,
  imports: [
    FormsModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatRadioModule,
    MatCheckboxModule,
    CommonModule,
    MatDividerModule,
  ],
  templateUrl: "./side-nav.component.html",
  styleUrl: "./side-nav.component.scss",
})
export class SideNavComponent extends UnsubscribeComponent implements OnInit {
  @Output() public todoItemStateChange = new EventEmitter<string>();

  @Input() public completionState: "active" | "completed" | "all" = "all";

  public completionRate?: number;
  public activeCategory?: string | null;

  public constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  public ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.activeCategory = params.get("category");

      this.calculateCompletionRate();
    });
  }

  public onTodoItemStateChange(value: "active" | "completed" | "all") {
    this.completionState = value;
    this.todoItemStateChange.emit(this.completionState);
  }

  private calculateCompletionRate(): void {
    this.todoService.toDoList$.pipe(takeUntil(this.destroy$)).subscribe((todos) => {
      if (this.activeCategory !== "all") {
        const todosInActiveCategory = todos.filter((todo) => todo.categoryName === this.activeCategory);
        const totalLength = todosInActiveCategory.length;
        const completedItemsLength = todosInActiveCategory.filter((todo) => todo.completed).length;

        this.completionRate = totalLength > 0 ? Math.round((completedItemsLength / totalLength) * 100) : 0;
      } else {
        this.completionRate =
          todos.length > 0
            ? Math.round((todos.filter((todo) => todo.completed).length / todos.length) * 100)
            : 0;
      }
    });
  }
}
