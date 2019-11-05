import {Deserializable} from './deserializable.model';

export class Service implements Deserializable {
  public id: number;
  public name: string;
  public category: string;
  public description: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
