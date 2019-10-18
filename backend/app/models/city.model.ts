import {Column, ForeignKey, HasOne, Model, Table} from 'sequelize-typescript';
import {Country} from './country.model';

@Table
export class City extends Model<City> {
  @Column
  public name!: string;

  @ForeignKey(() => Country)
  @Column
  public countryId!: number;
}
