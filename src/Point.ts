export default class Point {
    private position: Vector3;
    private color: Color3;
    private material: Enum.Material;

    constructor(Position: Vector3, Color: Color3, Material: Enum.Material = Enum.Material.SmoothPlastic) {
        this.position = Position;
        this.color = Color;
        this.material = Material;
    }

    // Position
    public getPosition(): Vector3 {
        return this.position;
    }
    public setPosition(Position: Vector3) {
        this.position = Position;
    }

    // Color
    public getColor(): Color3 {
        return this.color;
    }
    public setColor(Color: Color3) {
        this.color = Color;
    }
    
    // Material
    public getMaterial(): Enum.Material {
        return this.material;
    }
    public setMaterial(Material: Enum.Material) {
        this.material = Material;
    }
}
