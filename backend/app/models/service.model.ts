import {BelongsToMany, Column, BelongsTo, Model, Table, ForeignKey} from 'sequelize-typescript';
import {User} from './user.model';
import {Event} from './event.model';
import {EventService} from './EventService';
import {Category} from './category.model';

@Table
export class Service extends Model<Service> {
  @Column
  public name!: string;

  @Column
  public description!: string;

  @Column
  public price!: string;

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
