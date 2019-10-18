import {Column, ForeignKey, Model, Table} from 'sequelize-typescript';
import {User} from './user.model';
import {Service} from './service.model';

@Table
export class ServiceUser extends Model<ServiceUser> {
  @ForeignKey(() => User)
  @Column
  public userId!: number;

  @ForeignKey(() => Service)
  @Column
  public serviceId!: number;
}
