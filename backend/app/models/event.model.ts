import {BelongsToMany, Column, HasMany, Model, Table} from 'sequelize-typescript';
import {User} from './user.model';
import {EventUser} from './EventUser';

@Table
export class Event extends Model<Event> {
  @Column
  public name!: string;

  @BelongsToMany(() => User, () => EventUser)
  public userId!: User[];
}
