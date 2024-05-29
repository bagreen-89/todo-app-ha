import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { SnackService } from '@todo-app-ha/helpers';
import { ENVIRONMENT_CONFIG } from '@todo-app-ha/helpers';
import { TodoItem, TodoItemUpdate } from '@todo-app-ha/types';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  private readonly environment = inject(ENVIRONMENT_CONFIG);
  private readonly http = inject(HttpClient);
  private readonly snack = inject(SnackService);
  private readonly featureUrl = `${this.environment.apiUrl}/todos`;

  getTodos(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(
      `${this.featureUrl}?clientId=${this.environment.clientId}`
    );
  }

  postTodo(text: string): Observable<TodoItem> {
    return this.http
      .post<TodoItem>(`${this.featureUrl}`, {
        clientId: this.environment.clientId,
        text,
        completed: false,
      })
      .pipe(tap(() => this.snack.showMessage('✅ ToDo created successfully.')));
  }

  deleteTodo(id: number): Observable<number> {
    return this.http
      .delete<number>(`${this.featureUrl}/${id}`)
      .pipe(tap(() => this.snack.showMessage('✅ ToDo removed successfully.')));
  }

  putTodo(id: number, updates: TodoItemUpdate): Observable<TodoItem> {
    return this.http
      .put<TodoItem>(`${this.featureUrl}/${id}`, updates)
      .pipe(tap(() => this.snack.showMessage('✅ ToDo updated successfully.')));
  }

  patchAllTodosToCompleted() {
    return this.http.patch<[]>(
      `${this.featureUrl}/mark-all-as-completed?clientId=${this.environment.clientId}`,
      {}
    );
  }
}
