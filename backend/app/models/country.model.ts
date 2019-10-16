import {Column, Model, Table} from 'sequelize-typescript';

@Table
export class Country extends Model<Country> {
  @Column
  public name!: string;
}
