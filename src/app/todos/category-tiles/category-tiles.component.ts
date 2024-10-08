import { Component } from "@angular/core";
import { Category } from "../../interfaces/category.interface";
import { TodoService } from "../../services/todo.service";
import { CommonModule } from "@angular/common";
import { CategoryTileComponent } from "./category-tile/category-tile.component";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { generateId } from "../../shared/utils";
import { takeUntil } from "rxjs";
import { UnsubscribeComponent } from "../../shared/unsubscribeComponent";
import { Todo } from "../../interfaces/todo.interface";
import { AddCategoryComponent } from "./add-category/add-category.component";
import { SharedService } from "../../services/shared.service";

@Component({
  selector: "app-category-tiles",
  standalone: true,
  imports: [
    CategoryTileComponent,
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: "./category-tiles.component.html",
  styleUrl: "./category-tiles.component.scss",
})
export class CategoryTilesComponent extends UnsubscribeComponent {
  public dialogRef!: MatDialogRef<any>;

  public newCategory?: string;
  public categories?: Category[];
  private allTodos?: Todo[];

  public constructor(
    private todoService: TodoService,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.todoService.categories$.pipe(takeUntil(this.destroy$)).subscribe((categories) => {
      this.categories = categories;
      // console.log(this.categories);
    });

    this.todoService.toDoList$.pipe(takeUntil(this.destroy$)).subscribe((allTodos) => {
      this.allTodos = allTodos;
      this.updateActiveTodosCount();
    });
  }

  private updateActiveTodosCount(): void {
    if (!this.categories || !this.allTodos) {
      return;
    }

    const incompleteTodos = this.allTodos?.filter((todo) => !todo.completed) ?? [];

    this.categories.forEach((category) => {
      const activeTodosByCategory = incompleteTodos.filter((todo) => todo.categoryName === category.title);
      category.activeTodosCount =
        category.title !== "all" ? activeTodosByCategory.length : incompleteTodos.length;
    });
  }

  public onLoadToDoListByCategory(activeCategory: Category): void {
    this.router.navigate(["list"], {
      relativeTo: this.route,
      queryParams: { category: activeCategory.title },
    });
  }

  public onOpenCategoryAddDialog(): void {
    this.sharedService.openDialog(AddCategoryComponent);
  }
}
