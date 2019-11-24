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

  post_(event_data: any): void {
    this.startDate = event_data['startDate'];
    this.endDate = event_data['endDate'];
    this.startTime = event_data['startTime'];
    this.endTime = event_data['endTime'];
    this.eventId = event_data['eventId'];
    this.serviceId = event_data['serviceId'];
  }
}
