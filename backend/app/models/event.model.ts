import {BelongsToMany, BelongsTo, Column, HasMany, Model, Table, ForeignKey} from 'sequelize-typescript';
import {User} from './user.model';
import {Service} from './service.model';
import {EventService} from './EventService';

@Table
export class Event extends Model<Event> {
  @Column
  public name!: string;

  @Column
  public description!: string;

  @Column
  public date!: string;

  @Column
  public place!: string;

  @BelongsToMany(() => Service, () => EventService)
  public service!: Service[];

  @BelongsTo(() => User)
  public user!: User[];

  @ForeignKey(() => User)
  @Column
  public userId!: number;

  @HasMany(() => EventService)
  public eventServices!: EventService[];

  /*@BelongsTo(() => City)
  public cityId!: City;

  @ForeignKey(() => City)
  @Column
  public cId!: number;*/

  post_(event_data: any): void {
    this.name = event_data['name'];
    this.description = event_data['description'];
    this.date = event_data['date'];
    this.place = event_data['place'];
    this.userId = event_data['userId'];
  }
}
