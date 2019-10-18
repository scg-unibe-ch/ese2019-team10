import {BelongsToMany, Column, HasMany, Model, Table} from 'sequelize-typescript';
import {User} from './user.model';
import {ServiceUser} from './ServiceUser';

@Table
export class Service extends Model<Service> {
  @Column
  public name!: string;

  @BelongsToMany(() => User, () => ServiceUser)
  public userId!: number;
}
