import {Column, HasMany, HasOne, Model, Table} from 'sequelize-typescript';
import {Service} from './service.model';
import {City} from './city.model';
import {Event} from './event.model';

@Table
export class User extends Model<User> {
  @Column
  public firstname!: string;

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

  @Column
  public email!: string;

  @HasMany(() => Service, 'id')
  public services!: Service[];

  @HasMany(() => Event, 'id')
  public events!: Event[];

  post_(user_data: any): void {
    this.firstname = user_data['firstname'];
    this.lastname = user_data['lastname'];
    // this.email = user_data['email'];
    this.address = user_data['address'];
    this.password_hash = user_data['password'];
  }
}
