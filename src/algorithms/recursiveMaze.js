let walls = [];

export const recursiveMaze = (grid, x1, x2, y1, y2) => {
    walls = [];
    let leftBorder = getCol(grid, 0);
    let topBorder = getRow(grid, 0);
    let rightBorder = getCol(grid, grid[0].length - 1);
    let bottomBorder = getRow(grid, grid.length - 1);
    walls.push(leftBorder);
    walls.push(topBorder);
    walls.push(rightBorder);
    walls.push(bottomBorder);
    let maze = getSubgrid(grid, x1 + 1, x2 - 1, y1 + 1, y2 - 1);
    divide(maze, 0, maze[0].length, 0, maze.length);

    return walls.flat();
};

const divide = (grid, x1, x2, y1, y2) => {
    if (grid.length < 1) return;

    const width = grid[0].length;
    const height = grid.length;

    // base case
    if (width < 2 || height < 2) return;

    // choose a direction in which to draw a wall
    const wallDirection =
        width < height
            ? 'horizontal'
            : height < width
            ? 'vertical'
            : Math.floor(Math.random() * 2) + 1 === 1
            ? 'horizontal'
            : 'vertical';

    // based on the direction, choose a location
    const wallPosition =
        wallDirection === 'vertical'
            ? getRandomIntWithParity(1, width - 2, 'odd')
            : getRandomIntWithParity(1, height - 2, 'odd');

    // choose a position in the wall to make a gap
    const gapPosition =
        wallDirection === 'vertical'
            ? getRandomIntWithParity(0, height - 1, 'even')
            : getRandomIntWithParity(0, width - 1, 'even');

    // make the wall
    wallDirection === 'vertical'
        ? makeWallWithGap(getCol(grid, wallPosition), gapPosition)
        : makeWallWithGap(getRow(grid, wallPosition), gapPosition);

    // make recursive calls on resulting subgrids
    if (wallDirection === 'vertical') {
        let leftHalf = getSubgrid(grid, x1, wallPosition, y1, y2);
        let rightHalf = getSubgrid(grid, wallPosition + 1, x2, y1, y2);
        if (leftHalf.length > 1)
            divide(leftHalf, 0, leftHalf[0].length, 0, leftHalf.length);
        if (rightHalf.length > 1)
            divide(rightHalf, 0, rightHalf[0].length, 0, rightHalf.length);
    } else {
        let topHalf = getSubgrid(grid, x1, x2, y1, wallPosition);
        let bottomHalf = getSubgrid(grid, x1, x2, wallPosition + 1, y2);
        if (topHalf.length > 1)
            divide(topHalf, 0, topHalf[0].length, 0, topHalf.length);
        if (bottomHalf.length > 1)
            divide(bottomHalf, 0, bottomHalf[0].length, 0, bottomHalf.length);
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
    walls.push(gridSegment.filter((node) => node.isWall));
};

const getRandomIntWithParity = (min, max, parity) => {
    let result = Math.floor(Math.random() * (max - min + 1)) + min;
    if (result % 2 === 0 && parity === 'even') return result;
    if (result % 2 !== 0 && parity === 'odd') return result;
    return result === max ? result - 1 : result + 1;
};
