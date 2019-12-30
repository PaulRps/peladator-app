export class Player {
    id: number;
    name: string;
    age: number;
    shirtNumber: number;
    position: any;
    skillLevel: any;
    isSelected: boolean;

    public setId(id) {
        this.id = id;
        return this;
    }

    public setName(name: string) {
        this.name = name;
        return this;
    }

    public setAge(age: number) {
        this.age = age;
        return this;
    }

    public setShirtNumber(number) {
        this.shirtNumber = number;
        return this;
    }

    public setPosition(position) {
        this.position = position;
        return this;
    }

    public setSkillLevel(skillLevel) {
        this.skillLevel = skillLevel;
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
        return 'id: ' + this.id +
            '\nname: ' + this.name +
            '\nage: ' + this.age +
            '\nskillLevel: ' + this.skillLevel; // +
        //    "\nposition: " + this.positionId;
    }
}
