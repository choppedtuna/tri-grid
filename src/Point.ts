export default class Point {
    private position: Vector3;
    private color: Color3;

    constructor(Position: Vector3, Color: Color3) {
        this.position = Position;
        this.color = Color;
    }

    public setPosition(Position: Vector3) {
        this.position = Position;
    }

    public getPosition(): Vector3 {
        return this.position;
    }

    public setColor(Color: Color3) {
        this.color = Color;
    }

    public getColor(): Color3 {
        return this.color;
    }
}
