import { Workspace } from "@rbxts/services";
import Point from "Point";

class MeshTriangle {
    private w1: BasePart;
    private w2: BasePart;
    private w1_mesh: SpecialMesh;
    private w2_mesh: SpecialMesh;

    private container: Instance;

    private a: Point;
    private b: Point;
    private c: Point;

    constructor(Container: Instance, PointA: Point, PointB: Point, PointC: Point) {
        this.container = Container;

        const w1 = new Instance('Part');
        w1.Anchored = true;
        w1.CanCollide = false;
        w1.TopSurface = Enum.SurfaceType.Smooth;
        w1.BottomSurface = Enum.SurfaceType.Smooth;

        const w1_mesh = new Instance('SpecialMesh');
        w1_mesh.MeshType = Enum.MeshType.FileMesh;
        w1_mesh.MeshId = 'rbxassetid://5352701700';
        w1_mesh.Parent = w1

        const w2 = new Instance('Part');
        w2.Anchored = true;
        w2.CanCollide = false;
        w2.TopSurface = Enum.SurfaceType.Smooth;
        w2.BottomSurface = Enum.SurfaceType.Smooth;

        const w2_mesh = new Instance('SpecialMesh');
        w2_mesh.MeshType = Enum.MeshType.FileMesh;
        w2_mesh.MeshId = 'rbxassetid://5352701700';
        w2_mesh.Parent = w2

        this.w1 = w1;
        this.w1_mesh = w1_mesh;

        this.w2 = w2;
        this.w2_mesh = w2_mesh;

        this.a = PointA;
        this.b = PointB;
        this.c = PointC;

        this.Update();

        this.w1.Parent = this.container;
        this.w2.Parent = this.container;
    }

    public Update() {
        let [a, b, c] = [this.a.getPosition(), this.b.getPosition(), this.c.getPosition()];
        let [color_a, color_b, color_c] = [this.a.getColor(), this.b.getColor(), this.c.getColor()];

        let [ab, ac, bc] = [b.sub(a), c.sub(a), c.sub(b)];
        const [abd, acd, bcd] = [ab.Dot(ab), ac.Dot(ac), bc.Dot(bc)];

        if (abd > acd && abd > bcd) {
            [c, a] = [a, c];
        } else if (acd > bcd) {
            [a, b] = [b, a];
        }

        [ab, ac, bc] = [b.sub(a), c.sub(a), c.sub(b)];

        const right: Vector3 = ac.Cross(ab).Unit;
        const up: Vector3 = bc.Cross(right).Unit;
        const back: Vector3 = bc.Unit;

        const height: number = math.abs(ab.Dot(up));

        this.w1_mesh.Scale = new Vector3(0.1, height, math.abs(ab.Dot(back)));
        this.w1.CFrame = CFrame.fromMatrix((a.add(b)).div(2), right, up, back);

        this.w2_mesh.Scale = new Vector3(0.1, height, math.abs(ac.Dot(back)));
        this.w2.CFrame = CFrame.fromMatrix((a.add(c)).div(2), right.mul(-1), up, back.mul(-1));

        this.w1.Color = new Color3(
            (color_a.R + color_b.R + color_c.R) / 3,
            (color_a.G + color_b.G + color_c.G) / 3,
            (color_a.B + color_b.B + color_c.B) / 3
        )

        this.w2.Color = new Color3(
            (color_a.R + color_b.R + color_c.R) / 3,
            (color_a.G + color_b.G + color_c.G) / 3,
            (color_a.B + color_b.B + color_c.B) / 3
        )

    }
}

export default MeshTriangle;
