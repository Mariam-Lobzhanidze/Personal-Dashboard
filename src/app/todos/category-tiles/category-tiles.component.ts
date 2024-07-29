import { Component } from "@angular/core";
import { Category } from "../../interfaces/category.interface";
import { TodoService } from "../../services/todo.service";
import { CommonModule } from "@angular/common";
import { CategoryTileComponent } from "./category-tile/category-tile.component";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-category-tiles",
  standalone: true,
  imports: [CategoryTileComponent, CommonModule],
  templateUrl: "./category-tiles.component.html",
  styleUrl: "./category-tiles.component.scss",
})
export class CategoryTilesComponent {
  public categories?: Category[];

  public constructor(
    private todoService: TodoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.categories = this.todoService.categories;
  }

  public onLoadToDoListByCategory(activeCategory: Category): void {
    this.router.navigate(["list"], {
      relativeTo: this.route,
      queryParams: { category: activeCategory.title },
    });
  }
}
