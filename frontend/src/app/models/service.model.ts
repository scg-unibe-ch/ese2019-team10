import {Deserializable} from './deserializable.model';

export class Service implements Deserializable {
  public id: number;
  public name: string;
  public category: string;
  public description: string;
  public price: string;
  public availability: string;
  public place: string;
  public quantity: string;
  show: boolean;
  available: boolean;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
