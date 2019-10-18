import {Column, HasMany, HasOne, Model, Table} from 'sequelize-typescript';
import {Service} from './service.model';
import {City} from './city.model';
import {Event} from './event.model';

@Table
export class User extends Model<User> {
  @Column
  public firstName!: string;

  @Column
  public lastName!: string;

  @Column
  public address!: string;

  @HasOne(() => City, 'id')
  public cityId!: number;

  @Column
  public passwordHash!: string;

  @Column
  public approved!: boolean;

  @Column
  public email!: string;

  @HasMany(() => Service, 'id')
  public services!: Service[];

  @HasMany(() => Event, 'id')
  public events!: Event[];
}
