import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TodoList} from '../todo-list';
import {TodoItem} from '../todo-item';
import {HttpClient, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  @Input()
  todoList: TodoList;
  todoItem: TodoItem = new TodoItem(null, null, '', false);
  todoItems: TodoItem[] = [];
  @Output()
  destroy = new EventEmitter<TodoList>();

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.httpClient.get('http://localhost:3000/todoitem', {
      params:  new HttpParams().set('todoListId', '' + this.todoList.id)
    }).subscribe((instances: any) => {
      this.todoItems = instances.map((instance) => new TodoItem(instance.id, instance.todoListId, instance.name, instance.done));
    });
  }

  onSave() {
    this.httpClient.put('http://localhost:3000/todolist/' + this.todoList.id, {
      name: this.todoList.name
    }).subscribe();
  }

  onDestroy() {
    this.httpClient.delete('http://localhost:3000/todolist/' + this.todoList.id).subscribe(() => {
      this.destroy.emit(this.todoList);
    });
  }

  onTodoItemCreate() {
    this.todoItem.todoListId = this.todoList.id;
    this.httpClient.post('http://localhost:3000/todoitem', {
      todoListId: this.todoItem.todoListId,
      name: this.todoItem.name,
      done: this.todoItem.done
    }).subscribe((instance: any) => {
      this.todoItem.id = instance.id;
      this.todoItems.push(this.todoItem);
      this.todoItem = new TodoItem(null, this.todoList.id, '', false);
    });
  }

  onTodoItemDestroy(todoItem: TodoItem) {
    this.todoItems.splice(this.todoItems.indexOf(todoItem), 1);
  }
}
