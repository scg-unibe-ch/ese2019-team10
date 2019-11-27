import {Column, ForeignKey, Model, Table} from 'sequelize-typescript';
import {Event} from './event.model';
import {Service} from './service.model';

@Table
export class EventService extends Model<EventService> {
  @Column
  public startDate!: string;

  @Column
  public booked!: boolean;

  @Column
  public responded!: boolean;

  @Column
  public endDate!: string;

  @Column
  public startTime!: string;

  @Column
  public endTime!: string;

  @Column
  public message!: string;

  @Column
  public reply!: string;

  @ForeignKey(() => Event)
  @Column
  public eventId!: number;

  @ForeignKey(() => Service)
  @Column
  public serviceId!: number;

  post_(eventService_data: any): void {
    this.startDate = eventService_data['startDate'];
    this.endDate = eventService_data['endDate'];
    this.startTime = eventService_data['startTime'];
    this.endTime = eventService_data['endTime'];
    this.eventId = eventService_data['eventId'];
    this.serviceId = eventService_data['serviceId'];
    this.message = eventService_data['message'];
    this.booked = false;
    this.responded = false;
  }
}
