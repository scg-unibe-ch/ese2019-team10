import {Table, Column, Model, HasMany} from 'sequelize-typescript';
import {TodoItem} from './todoitem.model';

@Table
export class TodoList extends Model<TodoList> {

  @Column
  name!: string;

  @HasMany(() => TodoItem)
  todoItems!: TodoItem[];

  toSimplification(): any {
    return {
      'id': this.id,
      'name': this.name
    };
  }

  fromSimplification(simplification: any): void {
    this.name = simplification['name'];
  }

}
