import {BelongsTo, Column, Model, Table} from 'sequelize-typescript';
import {User} from './user.model';

@Table
export class Service extends Model<Service> {
  @Column
  public name!: string;

  @BelongsTo(() => User, 'id')
  public userId!: number;
}
