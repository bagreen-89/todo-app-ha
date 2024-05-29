import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ENVIRONMENT_CONFIG } from '@todo-app-ha/tokens';
import { TodoItem, TodoItemUpdate } from '@todo-app-ha/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  private readonly environment = inject(ENVIRONMENT_CONFIG);
  private readonly http = inject(HttpClient);
  private readonly featureUrl = `${this.environment.apiUrl}/todos`;

  getTodos(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(
      `${this.featureUrl}?clientId=${this.environment.clientId}`
    );
  }

  postTodo(text: string): Observable<any> {
    return this.http.post(`${this.featureUrl}`, {
      clientId: this.environment.clientId,
      text,
      completed: false,
    });
  }

  removeTodo(id: number): Observable<number> {
    return this.http.delete<number>(`${this.featureUrl}/${id}`);
  }

  updateTodo(id: number, updates: TodoItemUpdate): Observable<TodoItem> {
    return this.http.put<TodoItem>(`${this.featureUrl}/${id}`, updates);
  }

  completeAllTodos() {
    return this.http.patch<[]>(
      `${this.featureUrl}/mark-all-as-completed?clientId=${this.environment.clientId}`,
      {}
    );
  }
}
