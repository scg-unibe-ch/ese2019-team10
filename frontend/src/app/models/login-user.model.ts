import {Deserializable} from './deserializable.model';

export class LoginUser implements Deserializable {
  email: string;
  password: string;

  deserialize(input: any): LoginUser {
    Object.assign(this, input);
    return this;
  }
}
