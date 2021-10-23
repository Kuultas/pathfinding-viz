let walls = [];

export const recursiveMaze = (grid, x1, x2, y1, y2) => {
  // console.log(grid);
  let maze = getSubgrid(grid, x1 + 1, x2 - 1, y1 + 1, y2 - 1);
  divide(maze, 0, maze[0].length, 0, maze.length);

  return getWalls(maze);
};

const divide = (grid, x1, x2, y1, y2) => {
  if (grid.length < 1) return;

  const width = grid[0].length;
  const height = grid.length;

  // base case
  if (width < 2 || height < 2) return grid;

  // choose a direction in which to draw a wall
  const wallDirection =
    width < height
      ? "horizontal"
      : height < width
      ? "vertical"
      : Math.floor(getRndInt(1, 2)) === 1
      ? "horizontal"
      : "vertical";

  // based on the direction, choose a location
  const wallPosition =
    wallDirection === "vertical"
      ? Math.floor(width / 2)
      : Math.floor(height / 2);

  // choose a position in the wall to make a gap
  const gapPosition =
    wallDirection === "vertical"
      ? getRndInt(0, height - 1)
      : getRndInt(0, width - 1);

  // make the wall
  wallDirection === "vertical"
    ? makeWallWithGap(getCol(grid, wallPosition), gapPosition)
    : makeWallWithGap(getRow(grid, wallPosition), gapPosition);

  // // make recursive calls on resulting subgrids
  if (wallDirection === "vertical") {
    let leftHalf = getSubgrid(grid, x1, wallPosition, y1, y2);
    let rightHalf = getSubgrid(grid, wallPosition + 1, x2, y1, y2);
    console.log(wallDirection, wallPosition, gapPosition);
    console.log([leftHalf, rightHalf]);
    if (
      leftHalf.length > 1 &&
      rightHalf.length > 1 &&
      leftHalf[0].length > 1 &&
      rightHalf[0].length > 1
    ) {
      divide(leftHalf, 0, leftHalf[0].length, 0, leftHalf.length);
      divide(rightHalf, 0, rightHalf[0].length, 0, rightHalf.length);
    }
  } else {
    let topHalf = getSubgrid(grid, x1, x2, y1, wallPosition);
    let bottomHalf = getSubgrid(grid, x1, x2, wallPosition + 1, y2);
    console.log(wallDirection, wallPosition, gapPosition);
    console.log([topHalf, bottomHalf]);
    if (
      topHalf.length > 1 &&
      bottomHalf.length > 1 &&
      topHalf[0].length > 1 &&
      bottomHalf[0].length > 1
    ) {
      divide(topHalf, 0, topHalf[0].length, 0, topHalf.length);
      divide(bottomHalf, 0, bottomHalf.length, 0, bottomHalf.length);
    }
  }
};

const getRow = (grid, position) => {
  return grid[position];
};

const getCol = (grid, position) => {
  let returnCol = [];
  for (const row of grid) {
    returnCol.push(row[position]);
  }
  return returnCol;
};

const getSubgrid = (grid, x1, x2, y1, y2) => {
  let subgrid = grid.slice(y1, y2);
  return subgrid.map((row) => row.slice(x1, x2));
};

const makeWallWithGap = (gridSegment, gapPosition) => {
  gridSegment.map((node) => (node.isWall = true));
  gridSegment[gapPosition].isWall = false;
  walls.push(gridSegment);
};

const getRndInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getWalls = (grid) => {
  let walls = [];
  for (const row of grid) {
    for (const node of row) {
      if (node.isWall) walls.push({ col: node.col, row: node.row });
    }
  }
  return walls;
};
