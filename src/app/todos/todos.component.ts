import { Component, OnInit } from "@angular/core";
import { CategoryTileComponent } from "./category-tiles/category-tile/category-tile.component";
import { Category } from "../interfaces/category.interface";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { TodoListComponent } from "./todo-list/todo-list.component";
import { TodoService } from "../services/todo.service";

@Component({
  selector: "app-todos",
  standalone: true,
  imports: [CategoryTileComponent, TodoListComponent, RouterModule],
  templateUrl: "./todos.component.html",
  styleUrl: "./todos.component.scss",
})
export class TodosComponent implements OnInit {
  public toDoCategories: Category[] = [];

  public selectedCategoryId?: number;

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private todoService: TodoService
  ) {}

  public ngOnInit(): void {
    this.toDoCategories = this.todoService.categories;
  }

  public onNavigateToDoList(category: Category): void {
    this.selectedCategoryId = category.id;
    this.router.navigate(["list"], { relativeTo: this.route, queryParams: { category: category.title } });
  }
}
