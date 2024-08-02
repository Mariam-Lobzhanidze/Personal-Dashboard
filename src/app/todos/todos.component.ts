import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TodoListComponent } from "./todo-list/todo-list.component";
import { CategoryTilesComponent } from "./category-tiles/category-tiles.component";

@Component({
  selector: "app-todos",
  standalone: true,
  imports: [CategoryTilesComponent, TodoListComponent, RouterModule],
  templateUrl: "./todos.component.html",
  styleUrl: "./todos.component.scss",
})
export class TodosComponent {
  public constructor() {}
}
