import {Column, HasMany, HasOne, Model, Table} from 'sequelize-typescript';
import {Service} from './service.model';
import {City} from './city.model';
import {Event} from './event.model';
import {sha3_256} from 'js-sha3';

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

  post_(user_data: any): void {
    const sha3Hash: string = sha3_256(user_data['password']);

    this.firstName = user_data['firstName'];
    this.lastName = user_data['lastName'];
    this.email = user_data['email'];
    this.address = user_data['street'];
    this.passwordHash = sha3Hash;
  }
}
