import {Column, HasOne, Model, Table} from 'sequelize-typescript';
import {Country} from './country.model';

@Table
export class City extends Model<City> {
  @Column
  public name!: string;

  @HasOne(() => Country, 'id')
  public countryId!: number;
}
