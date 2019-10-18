import {Column, ForeignKey, Model, Table} from 'sequelize-typescript';
import {User} from './user.model';
import {Event} from './event.model';

@Table
export class EventUser extends Model<EventUser> {
  @ForeignKey(() => User)
  @Column
  public userId!: number;

  @ForeignKey(() => Event)
  @Column
  public eventId!: number;
}
