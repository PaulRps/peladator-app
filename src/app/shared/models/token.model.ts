import { RoleEnum } from 'src/app/shared/models/role.enum';
export class Token {
  id: number;
  type: string;
  value: string;
  role: RoleEnum;

  public static Build() {
    return new Token();
  }

  public sId(id: number) {
    this.id = id;
    return this;
  }

  public sType(type: string) {
    this.type = type;
    return this;
  }
  public sValue(value: string) {
    this.value = value;
    return this;
  }

  public sRole(role: RoleEnum) {
    this.role = role;
    return this;
  }
}
