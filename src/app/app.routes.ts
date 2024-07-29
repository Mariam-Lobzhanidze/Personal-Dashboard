import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "todos",
    pathMatch: "full",
  },
  {
    path: "todos",
    loadComponent: () => import("./todos/todos.component").then((mod) => mod.TodosComponent),
    children: [
      {
        path: "",
        loadComponent: () =>
          import("./todos/category-tiles/category-tiles.component").then((mod) => mod.CategoryTilesComponent),
      },
      {
        path: "list",
        loadComponent: () =>
          import("./todos/todo-list/todo-list.component").then((mod) => mod.TodoListComponent),
      },
    ],
  },

  {
    path: "notes",
    loadComponent: () => import("./notes/notes.component").then((mod) => mod.NotesComponent),
  },
  {
    path: "**",
    redirectTo: "todos",
  },
];
