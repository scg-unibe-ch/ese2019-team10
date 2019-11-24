import {Deserializable} from './deserializable.model';

export class Event implements Deserializable {
  public id: number;
  public eventId: number;
  public name: string;
  public category: {
    id,
    name
  };
  public categoryId: number;
  public description: string;
  public date: string;
  public place: string;
  public show: boolean;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
