# tri-grid
Roblox-ts typings for boatbomber's [GridCreator](https://devforum.roblox.com/t/gridcreator-draw-grids-with-whatever-tradeoff-you-prefer/698328) <br/>
Triangular and fully configurable terrain



# Installation
```
$ npm i --save-dev @rbxts/tri-grid
```

# Usage
```ts
import TriGrid, { GridSettings, DrawTypeEnum } from "@rbxts/tri-grid";

// Configure Grid Type
const TerrainSettings: GridSettings = {
    Position: new Vector3(),
    Size: new Vector3(200, 5, 200),
    Resolution: 60,
    DrawType: DrawTypeEnum.SpecialMesh
}

// Create flat terrain with GridSettings
const TerrainGrid: TriGrid = new TriGrid(TerrainSettings);

// Generates green wavy terrain in new TriGrid
for (let x = 0; x < TerrainGrid.getResolution(); x++) {
    for (let z = 0; z < TerrainGrid.getResolution(); z++) {
        const Height = ((math.noise(x / 9, z / 9) + 1) * 20)
        const CurrentPoint = TerrainGrid.getPointPosition(x, z);
        // Setting point properties
        TerrainGrid.setPointPosition(x, z, new Vector3(CurrentPoint.X, Height, CurrentPoint.Z));
        TerrainGrid.setPointColor(x, z, Color3.fromRGB(17, 50, 0).Lerp(Color3.fromRGB(65, 90, 52), Height / 10));
    }
}

```
Supports SpecialMesh & QuadBeam

# Result
<div align="center">
    <img src="https://i.imgur.com/QkXAnXM.png"/>
</div>
