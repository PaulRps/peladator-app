import { RoleEnum } from './player.position';

export class User {
  _id: number;
  _name: string;
  _password: string;
  _role: RoleEnum;

  constructor() {}

  public static Build(): User {
    return new User();
  }

  public id(id: number): User {
    this._id = id;
    return this;
  }

  public name(name: string): User {
    this._name = name;
    return this;
  }

  public password(password: string): User {
    this._password = password;
    return this;
  }

  public role(role: RoleEnum): User {
    this._role = role;
    return this;
  }
}
