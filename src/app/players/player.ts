export class Player {
    
    id: number;
    name: String;
    age: number;
    skillLevel: String;
    // positionId: number;

    constructor(id: number,
                name: String,
                age: number,
                skillLevel: String,
                positionId: number) {

        this.id = id;
        this.name = name;
        this.age = age;
        this.skillLevel = skillLevel;
        // this.positionId = positionId;
    }

    public toString(): String {
        return "id: "+this.id +
               "\nname: "+this.name +
               "\nage: " + this.age +
               "\nskillLevel: "+this.skillLevel ;//+
            //    "\nposition: " + this.positionId;
    }
}