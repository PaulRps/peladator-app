export class Player {
    
    id: number;
    name: String;
    age: number;
    skillLevel: number;
    positionId: number;

    constructor(id: number,
                  name: String,
                  age: number,
                  skillLevel: number,
                  positionId: number) {

        this.id = id;
        this.name = name;
        this.age = age;
        this.skillLevel = skillLevel;
        this.positionId = positionId;
    }
}