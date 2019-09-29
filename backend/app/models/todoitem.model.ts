import {Table, Column, Model, HasMany, BelongsTo, ForeignKey} from 'sequelize-typescript';
import {TodoList} from './todolist.model';

@Table
export class TodoItem extends Model<TodoItem> {

  @Column
  name!: string;

  @Column
  done!: boolean;

  @ForeignKey(() => TodoList)
  @Column
  todoListId!: number;

  @BelongsTo(() => TodoList)
  todoList!: TodoList;

  toSimplification(): any {
    return {
      'id': this.id,
      'name': this.name,
      'done': this.done
    };
  }

  fromSimplification(simplification: any): void {
    this.name = simplification['name'];
    this.done = simplification['done'];
    this.todoListId = simplification['todoListId'];
  }

}
