import {BelongsToMany, HasMany, Column, BelongsTo, Model, Table, ForeignKey} from 'sequelize-typescript';
import {User} from './user.model';
import {City} from './city.model';
import {Event} from './event.model';
import {EventService} from './EventService';

@Table
export class Category extends Model<Category> {
  @Column
  public name!: string;

  @HasMany(() => Service)
  public services!: Service[];

  /**
   * Create new category with given name to the Category table if there is no category with that name yet.
   *
   * @param categorieName the name of the category that shall be created
   */
  createIfNotExits(categorieName: string) {
    Category.findOne({where: {name: categorieName}}).then(
      role => {
        if (role === null) {
          const instance: Category = new Category();
          instance.name = categorieName;
          instance.save().then(() => { console.log('Created category "' + categorieName + '"'); });
        }
      }
    );
  }

}


@Table
export class Service extends Model<Service> {
  @Column
  public name!: string;

  @Column
  public description!: string;

  @Column
  public price!: string;

  /*@Column
  public address!: string;*/

  @Column
  public available!: boolean;

  @Column
  public quantity!: string;

  @Column
  public availability!: string;

  @Column
  public place!: string;

  @BelongsToMany(() => Event, () => EventService)
  public event!: Event[];

  @BelongsTo(() => Category)
  public category!: Category;

  @ForeignKey(() => Category)
  @Column
  public categoryId!: number;

  @BelongsTo(() => User)
  public user!: User;

  @ForeignKey(() => User)
  @Column
  public userId!: number;

  /*@BelongsTo(() => City)
  public city!: City;

  @ForeignKey(() => City)
  @Column
  public cityId!: number;*/

  post_(service_data: any): void {
    this.name = service_data['name'];
    this.description = service_data['description'];
    this.price = service_data['price'];
    this.place = service_data['place'];
    this.available = service_data['available'];
    this.quantity = service_data['quantity'];
    this.availability = service_data['availability'];
    this.categoryId = service_data['categoryId'];
    this.userId = service_data['userId'];
  }

}
