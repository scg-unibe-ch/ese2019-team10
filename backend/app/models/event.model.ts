import {Column, HasMany, Model, Table} from 'sequelize-typescript';
import {User} from './user.model';

@Table
export class Event extends Model<Event> {
  @Column
  public name!: string;

  @HasMany(() => User, 'id')
  public userId!: number;
}
