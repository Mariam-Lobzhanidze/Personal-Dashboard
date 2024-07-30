import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { ActivatedRoute } from "@angular/router";
import { Todo } from "../../../interfaces/todo.interface";
import { TodoService } from "../../../services/todo.service";
import { generateId } from "../../../shared/utils";

@Component({
  selector: "app-add-new-todo",
  standalone: true,
  imports: [MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: "./add-new-todo.component.html",
  styleUrl: "./add-new-todo.component.scss",
})
export class AddNewTodoComponent implements OnInit {
  private activeCategory!: string;
  public form!: FormGroup;

  public constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private toDoService: TodoService
  ) {}

  public ngOnInit(): void {
    this.form = this.fb.group({
      description: this.fb.control(""),
    });

    this.getActiveCategory();
  }

  private getActiveCategory(): void {
    this.route.queryParams.subscribe((params) => {
      this.activeCategory = params["category"];
    });
  }

  public submit() {
    const toDoItem: Todo = {
      id: generateId(),
      description: this.form.value.description,
      categoryName: this.activeCategory,
      completed: false,
      createdAt: new Date(),
      dueDate: new Date(),
    };

    this.toDoService.addNewToDoItem(toDoItem);
  }
}
