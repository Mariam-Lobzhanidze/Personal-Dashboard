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
export class TodosComponent {
  public constructor() {}
}
