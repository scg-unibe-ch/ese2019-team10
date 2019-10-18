import {Column, HasMany, Model, Table} from 'sequelize-typescript';
import {City} from './city.model';

@Table
export class Country extends Model<Country> {
  @Column
  public name!: string;

  @HasMany(() => City, 'id' )
  public cities!: City[];
}
