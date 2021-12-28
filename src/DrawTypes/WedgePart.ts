import { Workspace } from '@rbxts/services';
import Point from 'Point';

class WedgeTriangle {
  private w1: WedgePart;
  private w2: WedgePart;

  private container: Instance;

  private a: Point;
  private b: Point;
  private c: Point;

  private material: Enum.Material;

  constructor(Container: Instance, PointA: Point, PointB: Point, PointC: Point) {
    this.container = Container;

    this.material = PointA.getMaterial();
    if (PointB.getMaterial() === PointC.getMaterial()) {
      this.material = PointB.getMaterial();
    }

    this.w1 = new Instance('WedgePart');
    this.w1.Anchored = true;
    this.w1.TopSurface = Enum.SurfaceType.Smooth;
    this.w1.BottomSurface = Enum.SurfaceType.Smooth;

    this.w2 = new Instance('WedgePart');
    this.w2.Anchored = true;
    this.w2.TopSurface = Enum.SurfaceType.Smooth;
    this.w2.BottomSurface = Enum.SurfaceType.Smooth;

    this.a = PointA;
    this.b = PointB;
    this.c = PointC;

    this.Update();

    this.w1.Parent = this.container;
    this.w2.Parent = this.container;
  }

  public Update() {
    let [a, b, c] = [this.a.getPosition(), this.b.getPosition(), this.c.getPosition()]
    let [color_a, color_b, color_c] = [this.a.getColor(), this.b.getColor(), this.c.getColor()];

    let [ab, ac, bc] = [b.sub(a), c.sub(a), c.sub(b)];
    const [abd, acd, bcd] = [ab.Dot(ab), ac.Dot(ac), bc.Dot(bc)];

    if (abd > acd && abd > bcd) {
      [c, a] = [a, c];
    } else if (acd > bcd && acd > abd) {
      [a, b] = [b, a];
    }

    [ab, ac, bc] = [b.sub(a), c.sub(a), c.sub(b)];

    const right: Vector3 = ac.Cross(ab).Unit;
    const up: Vector3 = bc.Cross(right).Unit;
    const back: Vector3 = bc.Unit;

    const height: number = math.abs(ab.Dot(up));

    this.w1.Size = new Vector3(0.1, height, math.abs(ab.Dot(back)));
    this.w1.CFrame = CFrame.fromMatrix((a.add(b)).div(2), right, up, back);

    this.w2.Size = new Vector3(0.1, height, math.abs(ac.Dot(back)));
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

    this.w1.Material = this.material;
    this.w2.Material = this.material;
  }
}

export default WedgeTriangle;