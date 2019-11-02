import {Deserializable} from './deserializable.model';

export class Event implements Deserializable {
  public id: number;
  public category: string;
  public description: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
