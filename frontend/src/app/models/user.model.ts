import {Deserializable} from './deserializable.model';

export class User implements Deserializable {
  public email: string;
  public password: string;
  public id: number;
  public firstName: string;
  public lastName: string;
  public gender: string;
  public birthday: string;
  public phone: string;
  public street: string;
  public city: string;
  public postalCode: number;
  public country: string;
  public isServiceProvider: boolean;
  public isEventManager: boolean;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

  getFullName() {
    return this.firstName + ' ' + this.lastName;
  }
}
