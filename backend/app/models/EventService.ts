import {Column, ForeignKey, Model, Table} from 'sequelize-typescript';
import {Event} from './event.model';
import {Service} from './service.model';

@Table
export class EventService extends Model<EventService> {
  @Column
  public startDate!: string;

  @Column
  public endDate!: string;

  @Column
  public startTime!: string;

  @Column
  public endTime!: string;

  @ForeignKey(() => Event)
  @Column
  public eventId!: number;

  @ForeignKey(() => Service)
  @Column
  public serviceId!: number;
}
