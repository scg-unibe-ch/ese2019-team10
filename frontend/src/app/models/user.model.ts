import {Deserializable} from './deserializable.model';

export class User implements Deserializable {
  email: string;
  password: string;
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  birthday: string;
  phone: string;
  street: string;
  city: string;
  postalCode: number;
  country: string;
  isServiceProvider: boolean;
  isEventManager: boolean;

  deserialize(input: any): User {
    Object.assign(this, input);
    return this;
  }

  getFullName() {
    return this.firstName + ' ' + this.lastName;
  }
}
