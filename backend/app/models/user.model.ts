import {BelongsToMany, Column, HasMany, HasOne, Model, Table} from 'sequelize-typescript';
import {Service} from './service.model';
import {City} from './city.model';
import {Event} from './event.model';
import {sha3_256} from 'js-sha3';
import {Role} from './role.model';
import {RoleUser} from './RoleUser';

@Table
export class User extends Model<User> {
  @Column
  public firstName!: string;

  @Column
  public lastName!: string;

  @Column
  public street!: string;

  /* @HasOne(() => City, 'id')
  public cityId!: number;*/

  @Column
  public passwordHash!: string;

  @Column
  public approved!: boolean;

  @Column
  public email!: string;

  @Column
  public phone!: string;

  @Column
  public birthday!: string;

  @Column
  public gender!: string;

  @Column
  public city!: string;

  @Column
  public postalCode!: string;

  @Column
  public country!: string;

  @BelongsToMany(() => Role, () => RoleUser)
  public role!: Role[];

  @HasMany(() => Service)
  public services!: Service[];

  @HasMany(() => Event)
  public events!: Event[];

  post_(user_data: any): void {
    const sha3Hash: string = sha3_256(user_data['password']);

    this.firstName = user_data['firstName'];
    this.lastName = user_data['lastName'];
    this.email = user_data['email'];
    this.phone = user_data['phone'];
    this.street = user_data['street'];
    this.birthday = user_data['birthday'];
    this.gender = user_data['gender'];
    this.city = user_data['city'];
    this.postalCode = user_data['postalCode'];
    this.country = user_data['country'];
    this.passwordHash = sha3Hash;
    this.approved = false;
  }
}
