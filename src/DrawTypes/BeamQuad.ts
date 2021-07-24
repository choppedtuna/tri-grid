import { CollectionService, Workspace } from "@rbxts/services";
import Point from "Point";

const TERRAIN = Workspace.Terrain;
const SPIN = CFrame.Angles(math.pi / 2, 0, 0);
const UP = new Vector3(0, 1, 0);
const BEAM = new Instance('Beam');

BEAM.LightInfluence = 1;
BEAM.Segments = 1;
BEAM.TextureSpeed = 0;
BEAM.Transparency = new NumberSequence(0);

const ColorTick = tick();

class BeamQuad {
    private container: Instance;

    private attach0: Attachment;
    private attach1: Attachment;
    private baseCF: CFrame;
    private beam: Beam;

    private a: Point;
    private b: Point;
    private c: Point;
    private d: Point;

    constructor(Container: Instance, PointA: Point, PointB: Point, PointC: Point, PointD: Point, x: number, z: number) {
        this.container = Container;

        this.attach0 = new Instance('Attachment');
        this.attach0.Name = x + ':' + z + '/0'

        this.attach1 = new Instance('Attachment');
        this.attach1.Name = x + ':' + z + '/1';

        this.baseCF = TERRAIN.CFrame;

        this.beam = BEAM.Clone();
        this.beam.Attachment0 = this.attach0;
        this.beam.Attachment1 = this.attach1;

        this.a = PointA;
        this.b = PointB;
        this.c = PointC;
        this.d = PointD;

        this.Update();
        this.Show();

    }

    public Update(): void {
        let [a, b, c, d] = [this.a.getPosition(), this.b.getPosition(), this.c.getPosition(), this.d.getPosition()];
        let [color_a, color_b, color_c, color_d] = [this.a.getColor(), this.b.getColor(), this.c.getColor(), this.d.getColor()];

        const ab = a.sub(b);
        const cd = d.sub(c);

        const axis0 = UP.sub(
            ab.Unit.mul(ab.Unit.Dot(UP))
        );

        const axis1 = UP.sub(
            cd.Unit.mul(cd.Unit.Dot(UP))
        )

        this.attach0.WorldPosition = (a.add(b)).div(2);
        this.attach1.WorldPosition = (c.add(d)).div(2);

        this.attach0.Axis = axis0;
        this.attach1.Axis = axis1;

        this.attach0.SecondaryAxis = ab;
        this.attach1.SecondaryAxis = cd;

        this.beam.Width0 = ab.Magnitude;
        this.beam.Width1 = cd.Magnitude;

        this.beam.Color = new ColorSequence(
            new Color3(
                color_a.R * color_b.R,
                color_a.G * color_b.G,
                color_a.B * color_b.B
            ),
            new Color3(
                color_c.R * color_d.R,
                color_c.G * color_d.G,
                color_c.B * color_d.B
            )
        )

    }

    public Hide(): void {
        this.beam.Parent = undefined;
        this.attach0.Parent = undefined;
        this.attach1.Parent = undefined;
    }

    public Show(): void {
        this.beam.Parent = this.container;
        this.attach0.Parent = this.container;
        this.attach1.Parent = this.container;
    }

}

export default BeamQuad;
