import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TodoItem} from '../../todo-item';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input()
  todoItem: TodoItem;
  @Output()
  destroy = new EventEmitter<TodoItem>();

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
  }

  onSave() {
    this.httpClient.put('http://localhost:3000/todoitem/' + this.todoItem.id, {
      name: this.todoItem.name,
      todoListId: this.todoItem.todoListId,
      done: this.todoItem.done
    }).subscribe();
  }

  onDestroy() {
    this.httpClient.delete('http://localhost:3000/todoitem/' + this.todoItem.id).subscribe(() => {
      this.destroy.emit(this.todoItem);
    });
  }
}
