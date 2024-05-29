import {
  Component,
  ElementRef,
  ViewEncapsulation,
  inject,
  viewChild,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToDoStore } from '@todo-app-ha/todo/data-access';

@Component({
  selector: 'ha-new-todo',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './new-todo-item.component.html',
  styleUrl: './new-todo-item.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class NewTodoItemComponent {
  readonly todoStore = inject(ToDoStore);
  todoFormControl = new FormControl<string>('');
  inputElement =
    viewChild.required<ElementRef<HTMLTextAreaElement>>('inputField');

  resetText(): void {
    this.todoFormControl.setValue('');
    this.todoFormControl.reset();
  }

  createTodo(): void {
    const value = this.todoFormControl.value;
    if (!value?.length) {
      return;
    }
    this.todoFormControl.disable();
    this.todoStore
      .createTodo(value)
      .then(() => this.resetText())
      .finally(() => {
        this.todoFormControl.enable();
        this.inputElement().nativeElement.focus();
      });
  }

  handleKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        this.createTodo();
        break;
      case 'Escape':
      case 'Esc':
        this.resetText();
        break;
    }
  }
}
