import {BelongsToMany, Column, Model, Table} from 'sequelize-typescript';
import {User} from './user.model';
import {RoleUser} from './RoleUser';

@Table
export class Role extends Model<Role> {
  @Column
  public name!: string;

  @BelongsToMany( () => User, () => RoleUser, 'id')
  public users!: User[];

  /**
   * Create new role with given name to the Role table if there is no role with that name yet.
   *
   * @param roleName the name of the role that shall be created
   */
  createIfNotExits(roleName: string) {
    Role.findOne({where: {name: roleName}}).then(
      role => {
        if (role === null) {
          const instance: Role = new Role();
          instance.name = roleName;
          instance.save().then(() => { console.log('created role "' + roleName + '"'); });
        }
      }
    );
  }
}
