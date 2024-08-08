import { Component, OnInit } from "@angular/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { TodoService } from "../../services/todo.service";
import { CommonModule } from "@angular/common";

import { UnsubscribeComponent } from "../unsubscribeComponent";
import { takeUntil } from "rxjs";

@Component({
  selector: "app-side-nav",
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatListModule, MatIconModule, MatProgressBarModule],
  templateUrl: "./side-nav.component.html",
  styleUrl: "./side-nav.component.scss",
})
export class SideNavComponent extends UnsubscribeComponent implements OnInit {
  public toDosByCategory?: any[];

  public constructor(private todoService: TodoService) {
    super();
  }

  public ngOnInit(): void {
    this.todoService.toDoList$.pipe(takeUntil(this.destroy$)).subscribe((todos) => {
      const uniqueCategoryNames = [...new Set(todos.map((todo) => todo.categoryName))];

      this.toDosByCategory = uniqueCategoryNames.map((name) => {
        const itemsInCategory = name === "all" ? todos : todos.filter((todo) => todo.categoryName === name);

        // Calculate the completion rate
        const totalItems = itemsInCategory.length;
        const completedItems = itemsInCategory.filter((todo) => todo.completed).length;
        const completionRate = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

        return {
          categoryName: name,
          // items: itemsInCategory,
          completionRate,
        };
      });

      console.log(this.toDosByCategory);
    });
  }
}
