import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ENVIRONMENT_CONFIG } from '@todo-app-ha/tokens';
import { TodoItem } from '@todo-app-ha/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  private readonly environment = inject(ENVIRONMENT_CONFIG);
  private readonly http = inject(HttpClient);
  private readonly subUrl = `${this.environment.apiUrl}/todos`;

  getTodos(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(
      `${this.subUrl}?clientId=${this.environment.clientId}`
    );
  }

  postTodo(text: string): Observable<any> {
    return this.http.post(`${this.subUrl}`, {
      clientId: this.environment.clientId,
      text,
      completed: false,
    });
  }
}
