import {Deserializable} from './deserializable.model';

export class Event implements Deserializable {
  public id: number;
  public name: string;
  public category: string;
  public description: string;
  public date: string;
  public place: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
