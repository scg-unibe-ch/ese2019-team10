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

  post_(user_data: any): void {
    this.fristname = user_data['firstname'];
    this.lastname = user_data['lastname'];
    // this.email = user_data['email'];
    this.address = user_data['address'];
    this.password_hash = user_data['password'];
  }
}
