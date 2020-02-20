export class Player {
  id: number;
  name: string;
  age: number;
  shirtNumber: number;
  position: any;
  skillLevel: any;
  isSelected: boolean;
  paymentDate: string;

  public static Build() {
    return new Player();
  }

  public sId(id) {
    this.id = id;
    return this;
  }

  public sName(name: string) {
    this.name = name;
    return this;
  }

  public sAge(age: number) {
    this.age = age;
    return this;
  }

  public sShirtNumber(shirtNumber: number) {
    this.shirtNumber = shirtNumber;
    return this;
  }

  public sPosition(position) {
    this.position = position;
    return this;
  }

  public sSkillLevel(skillLevel) {
    this.skillLevel = skillLevel;
    return this;
  }

  public sPaymentDate(paymentDate:string) {
    this.paymentDate = paymentDate;
    return this;
  }

  public getId(): number {
    return this.id;
  }

  public getAge(): number {
    return this.age;
  }

  public getName(): string {
    return this.name;
  }

  public getShirtNumber() {
    return this.shirtNumber;
  }

  public getPosition() {
    return this.position;
  }

  public getSkillLevel() {
    return this.skillLevel;
  }

  public toString(): string {
    return 'id: ' + this.id + '\nname: ' + this.name + '\nage: ' + this.age + '\nskillLevel: ' + this.skillLevel; // +
    //    "\nposition: " + this.positionId;
  }
}
