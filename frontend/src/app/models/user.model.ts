import {Deserializable} from './deserializable.model';
import {Service} from './service.model';
import {Event} from './event.model';


export class User implements Deserializable {
  public email: string;
  public password: string;
  public id: number;
  public userId: number;
  public firstName: string;
  public lastName: string;
  public gender: string;
  public birthday: string;
  public phone: string;
  public street: string;
  public city: string;
  public postalCode: number;
  public country: string;
  public isAdmin: boolean;
  public isServiceProvider: boolean;
  public isEventManager: boolean;
  public services: Service[];
  public events: Event[];


  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

  getFullName() {
    return this.firstName + ' ' + this.lastName;
  }

  getFullCity() {
    return this.postalCode + ' ' + this.city;
  }
}
