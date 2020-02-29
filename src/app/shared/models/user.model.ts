import { RoleEnum } from './role.enum';

export class User {
  id: number;
  name: string;
  password: string;
  role: RoleEnum;

  constructor() {}

  public static Build(): User {
    return new User();
  }

  public sId(id: number): User {
    this.id = id;
    return this;
  }

  public sName(name: string): User {
    this.name = name;
    return this;
  }

  public sPassword(password: string): User {
    this.password = password;
    return this;
  }

  public sRole(role: RoleEnum): User {
    this.role = role;
    return this;
  }
}
