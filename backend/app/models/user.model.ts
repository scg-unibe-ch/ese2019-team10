import {Column, HasMany, HasOne, Model, Table} from 'sequelize-typescript';
import {Service} from './service.model';
import {City} from './city.model';

@Table
export class User extends Model<User> {
  @Column
  public fristname!: string;

  @Column
  public lastname!: string;

  @Column
  public address!: string;

  @HasOne(() => City, 'id')
  public cityId!: number;

  @Column
  public password_hash!: string;

  @Column
  public approved!: boolean;

  @HasMany(() => Service, 'id')
  public services!: number[];
}
