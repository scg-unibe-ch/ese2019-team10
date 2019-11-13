import {BelongsToMany, BelongsTo, Column, HasMany, Model, Table, ForeignKey} from 'sequelize-typescript';
import {User} from './user.model';
import {City} from './city.model';
import {Service} from './service.model';
import {EventService} from './EventService';
import {EventUser} from './EventUser';

@Table
export class Event extends Model<Event> {
  @Column
  public name!: string;

  @Column
  public description!: string;

  @Column
  public date!: string;

  @BelongsToMany(() => Service, () => EventService)
  public service!: Service[];

  @BelongsTo(() => User)
  public userId!: User[];

  @ForeignKey(() => User)
  @Column
  public uId!: number;

  @BelongsTo(() => City)
  public cityId!: City;

  @ForeignKey(() => City)
  @Column
  public cId!: number;
}
