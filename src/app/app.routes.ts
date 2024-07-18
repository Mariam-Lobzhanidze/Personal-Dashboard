import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "todos",
    loadComponent: () => import("./todos/todos.component").then((mod) => mod.TodosComponent),
  },
  {
    path: "notes",
    loadComponent: () => import("./notes/notes.component").then((mod) => mod.NotesComponent),
  },
];
