import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { ActivatedRoute } from "@angular/router";
import { Todo } from "../../../interfaces/todo.interface";
import { TodoService } from "../../../services/todo.service";
import { generateId } from "../../../shared/utils";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatDatepickerModule } from "@angular/material/datepicker";

@Component({
  selector: "app-add-new-todo",
  standalone: true,
  imports: [MatInputModule, ReactiveFormsModule, MatButtonModule, MatDatepickerModule],

  templateUrl: "./add-new-todo.component.html",
  styleUrl: "./add-new-todo.component.scss",
})
export class AddNewTodoComponent implements OnInit {
  private isEdited = false;
  readonly minDate = new Date();
  private activeCategory!: string;
  public form!: FormGroup;

  public constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private todoService: TodoService,
    public dialogRef: MatDialogRef<AddNewTodoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { description: string; dueDate: Date; id: string }
  ) {}

  public ngOnInit(): void {
    this.form = this.fb.group({
      description: this.fb.control("", Validators.required),
      dueDate: this.fb.control(""),
    });

    this.isEdited = !!this.data;

    if (this.data) {
      this.form.patchValue(this.data);
    }

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
      dueDate: this.form.value.dueDate,
    };
    console.log("new Item", toDoItem);

    if (toDoItem.dueDate) {
      const description = this.form.get("description")?.value;

      // Schedule the reminder
      this.todoService.scheduleReminder(
        toDoItem.dueDate,
        `Reminder: ${description}`,
        "assets/sounds/reminder.wav",
        11,
        5
      );
    }

    if (this.form.valid) {
      if (!this.isEdited) {
        this.todoService.addNewToDoItem(toDoItem);
      } else {
        this.todoService.updateToDoItem(this.data.id, {
          description: this.form.value.description,
          dueDate: this.form.value.dueDate,
        });
      }
      this.dialogRef.close();
    }
  }
}
