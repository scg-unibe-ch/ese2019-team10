import {Column, HasMany, Model, Table} from 'sequelize-typescript';
import {Service} from './service.model';

@Table
export class Category extends Model<Category> {
  @Column
  public name!: string;

  @HasMany(() => Service)
  public services!: Service[];

  /**
   * Create new category with given name to the Category table if there is no category with that name yet.
   *
   * @param categoryName the name of the category that shall be created
   */
  createIfNotExits(categoryName: string) {
    Category.findOne({where: {name: categoryName}}).then(
      role => {
        if (role === null) {
          const instance: Category = new Category();
          instance.name = categoryName;
          instance.save().then(() => { console.log('Created category "' + categoryName + '"'); });
        }
      }
    );
  }
}

