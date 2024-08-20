import { Component, OnInit } from "@angular/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
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
  public dueDateOptions = [
    { label: "Due Today", value: "today", selected: false },
    { label: "Due Tomorrow", value: "tomorrow", selected: false },
    { label: "Upcoming", value: "upcoming", selected: false },
    { label: "Overdue", value: "overdue", selected: false },
  ];

  public completionState: "active" | "completed" = "active";

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

      const selectedDueDates = params.getAll("dueDate");
      this.dueDateOptions.forEach((option) => {
        option.selected = selectedDueDates.includes(option.value);
      });
      this.calculateCompletionRate();
    });
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

  public onDueDateChange(): void {
    const selectedDueDates = this.dueDateOptions
      .filter((option) => option.selected)
      .map((option) => option.value);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { dueDate: selectedDueDates },
      queryParamsHandling: "merge",
    });
  }
}
