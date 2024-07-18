import { Component } from "@angular/core";
import { ToDoCategoryTileComponent } from "./to-do-category-tile/to-do-category.component";
import { Category } from "../interfaces/category.interface";
import { Router } from "@angular/router";
import { TodoListComponent } from "./todo-list/todo-list.component";

@Component({
  selector: "app-todos",
  standalone: true,
  imports: [ToDoCategoryTileComponent, TodoListComponent],
  templateUrl: "./todos.component.html",
  styleUrl: "./todos.component.scss",
})
export class TodosComponent {
  public selectedCategoryId?: number;
  public constructor(private router: Router) {}

  public toDoCategories: Category[] = [
    { id: 1, title: "Work", icon: "work.svg", activeTodosCount: 5 },
    { id: 2, title: "Personal", icon: "person.svg", activeTodosCount: 2 },
    { id: 3, title: "Shopping", icon: "shopping.svg", activeTodosCount: 3 },
    { id: 4, title: "Sport", icon: "sport.svg", activeTodosCount: 3 },
    { id: 5, title: "Family", icon: "family.svg", activeTodosCount: 3 },
    { id: 6, title: "hobby", icon: "hobby.svg", activeTodosCount: 3 },
  ];

  public navigateToCategory(category: Category): void {
    this.selectedCategoryId = category.id;
    this.router.navigate([], {
      queryParams: { category: category.title },
    });
  }
}
