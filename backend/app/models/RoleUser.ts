import {Column, ForeignKey, Model, Table} from 'sequelize-typescript';
import {User} from './user.model';
import {Role} from './role.model';

@Table
export class RoleUser extends Model<RoleUser> {
  @ForeignKey(() => User)
  @Column
  public userId!: number;

  @ForeignKey(() => Role)
  @Column
  public roleId!: number;
}
