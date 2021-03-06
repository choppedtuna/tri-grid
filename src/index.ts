import { HttpService, Workspace } from "@rbxts/services";
import { DrawType } from "DrawTypes";
import BeamQuad from "DrawTypes/BeamQuad";
import MeshTriangle from "DrawTypes/SpecialMesh";
import WedgeTriangle from "DrawTypes/WedgePart";
import Point from "Point";

export interface GridSettings {
	Parent?: Instance
	Position: Vector3
	Size: Vector3
	Resolution: number
	DrawType: DrawTypeEnum
}

export enum DrawTypeEnum {
	'SpecialMesh',
	'QuadBeam',
	'WedgePart'
}

class TriGrid {
	private resolution: number;
	private size: Vector3;
	private position: Vector3;
	private drawType: DrawTypeEnum;
	private draws: Array<MeshTriangle | BeamQuad | WedgeTriangle>[][];
	private points: Point[][];

	private container: Instance;

	private pos_X: number;
	private pos_Y: number;
	private pos_Z: number;

	private size_X: number;
	private size_Y: number;
	private size_Z: number;

	private setCF: CFrame;

	private halfSize: Vector3;

	constructor(Settings: GridSettings) {
		if (Settings.Parent !== undefined) {
			this.container = Settings.Parent;
		} else {
			this.container = new Instance('Model');
			this.container.Parent = Workspace;
			this.container.Name = 'TriGridGeneration';
		}

		this.resolution = math.clamp(Settings.Resolution ?? 20, 10, 150);
		this.size = Settings.Size;
		this.position = Settings.Position;

		this.pos_X = this.position.X;
		this.pos_Y = this.position.Y;
		this.pos_Z = this.position.Z;

		this.size_X = this.size.X;
		this.size_Y = this.size.Y;
		this.size_Z = this.size.Z;

		this.drawType = Settings.DrawType;

		this.setCF = new CFrame(this.position);

		this.halfSize = this.size.div(2);

		this.draws = [];
		this.points = [];

		for (let x = 0; x < this.resolution; x++) {
			this.points[x] = [];
			for (let z = 0; z < this.resolution; z++) {
				const point: Point = new Point(
					new Vector3(
						((x - 1) / (this.resolution - 1) * this.size_X) + (this.pos_X - (this.size_X / 2)),
						this.pos_Y,
						((z - 1) / (this.resolution - 1) * this.size_Z) + (this.pos_Z - (this.size_Z / 2))
					),
					Color3.fromRGB(math.random(40, 50), math.random(90, 100), math.random(125, 140))
				);

				this.points[x][z] = point;

			}
		}

		for (let x = 0; x <= this.resolution + 1; x++) {
			this.draws[x] = [];
			for (let z = 0; z <= this.resolution + 1; z++) {
				this.draws[x][z] = new Array<DrawType>();
			}
		}

		if (this.drawType === DrawTypeEnum.QuadBeam) {

			for (let x = 0; x < this.resolution - 1; x++) {
				for (let z = 0; z < this.resolution - 1; z++) {

					const Quad = new BeamQuad(this.container, this.points[x][z], this.points[x][z + 1], this.points[x + 1][z + 1], this.points[x + 1][z], x, z);

					this.draws[x][z].push(Quad);
					this.draws[x][z + 1].push(Quad);
					this.draws[x + 1][z + 1].push(Quad);
					this.draws[x + 1][z].push(Quad);

				}
			}

		} else {

			for (let x = 0; x < this.resolution - 1; x++) {
				for (let z = 0; z < this.resolution - 1; z++) {

					let TriA;
					let TriB;

					if (this.drawType === DrawTypeEnum.SpecialMesh) {

						TriA = new MeshTriangle(this.container, this.points[x][z], this.points[x][z + 1], this.points[x + 1][z + 1]);
						TriB = new MeshTriangle(this.container, this.points[x][z], this.points[x + 1][z], this.points[x + 1][z + 1]);
	
					} else {

						TriA = new WedgeTriangle(this.container, this.points[x][z], this.points[x][z + 1], this.points[x + 1][z + 1])
						TriB = new WedgeTriangle(this.container, this.points[x][z], this.points[x + 1][z], this.points[x + 1][z + 1])

					}

					this.draws[x][z].push(TriA);
					this.draws[x][z + 1].push(TriA);
					this.draws[x + 1][z + 1].push(TriA);

					this.draws[x][z].push(TriB);
					this.draws[x + 1][z].push(TriB);
					this.draws[x + 1][z + 1].push(TriB);

				}
			}

		}

	}

	public getOrigin(): Vector3 {
		return this.position;
	}

	public destroy(): void {
		this.draws = [];
		this.points = [];
		this.container.Destroy();
	}

	public getResolution(): number {
		return this.resolution;
	}

	public getPoints(): Point[][] {
		return this.points;
	}

	public getDraws(): Array<DrawType>[][] {
		return this.draws;
	}

	public setPointPosition(x: number, z: number, Position: Vector3): void {
		const point = this.points[x][z];
		point.setPosition(Position);
		this.draws[x][z].forEach(quad => {
			quad.Update();
		})
	}

	public setPointMaterial(x: number, z: number, Material: Enum.Material) {
		const point = this.points[x][z];
		point.setMaterial(Material);
		this.draws[x][z].forEach(quad => {
			quad.Update();
		})
	}

	public getPointPosition(x: number, z: number): Vector3 {
		const point = this.points[x][z];
		return point.getPosition();
	}

	public setPointColor(x: number, z: number, Color: Color3): void {
		const point = this.points[x][z];
		point.setColor(Color);
		this.draws[x][z].forEach(quad => {
			quad.Update();
		})
	}

}

export default TriGrid;
