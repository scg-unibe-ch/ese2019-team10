import {Deserializable} from './deserializable.model';

export class LoginUser  {

  email: string;
  password: string;

  deserialize(input: any): LoginUser {
    Object.assign(this, input);
    return this;
  }

}
