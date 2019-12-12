export class Player {
    
    id: number;
    name: string;
    age: number;
    skillLevel: string;
    // positionId: number;

    constructor(id: number,
                name: string,
                age: number,
                skillLevel: string
                ) {

        this.id = id;
        this.name = name;
        this.age = age;
        this.skillLevel = skillLevel;
        // this.positionId = positionId;
    }

    public toString(): string {
        return "id: "+this.id +
               "\nname: "+this.name +
               "\nage: " + this.age +
               "\nskillLevel: "+this.skillLevel;//+
            //    "\nposition: " + this.positionId;
    }
}