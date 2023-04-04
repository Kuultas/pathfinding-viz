// Node creation and grid initialization
export const createNode = (col, row) => {
    return {
        col,
        row,
        isSource: false,
        isTarget: false,
        isWall: false,
        isVisited: false,
        isPath: false,
        distance: Infinity,
        previousNode: null,
    };
};

export const initializeGrid = (rows, cols) => {
    const newGrid = [];
    for (let row = 0; row < rows; row++) {
        const currentRow = [];
        for (let col = 0; col < cols; col++) {
            currentRow.push(createNode(col, row));
        }
        newGrid.push(currentRow);
    }
    // Set the source node to (1, 1) and the target node to (rows - 2, cols - 2)
    newGrid[1][1].isSource = true;
    newGrid[rows - 2][cols - 2].isTarget = true;
    return newGrid;
};

// Grid manipulation functions
export const toggleWall = (col, row) => {
    // Don't allow walls to be placed on the source or target nodes
    if (grid[row][col].isSource || grid[row][col].isTarget) return;
    const newGrid = grid.map((row) => [...row]);
    // Toggle the wall status of the clicked node
    newGrid[row][col].isWall = !newGrid[row][col].isWall;
    setGrid(newGrid);
};

export const clearSource = () => {
    const newGrid = grid.map((row) =>
        row.map((node) => ({ ...node, isSource: false }))
    );
    setGrid(newGrid);
};

export const clearTarget = () => {
    const newGrid = grid.map((row) =>
        row.map((node) => ({ ...node, isTarget: false }))
    );
    setGrid(newGrid);
};

export const clearWalls = () => {
    const newGrid = grid.map((row) =>
        row.map((node) => ({ ...node, isWall: false }))
    );
    setGrid(newGrid);
};

export const clearVisited = () => {
    const newGrid = grid.map((row) =>
        row.map((node) => ({ ...node, isVisited: false }))
    );
    setGrid(newGrid);
};

export const clearPath = () => {
    const newGrid = grid.map((row) =>
        row.map((node) => ({ ...node, isPath: false }))
    );
    setGrid(newGrid);
};

export const clearDistance = () => {
    const newGrid = grid.map((row) =>
        row.map((node) => ({ ...node, distance: Infinity }))
    );
    setGrid(newGrid);
};

export const clearPrevious = () => {
    const newGrid = grid.map((row) =>
        row.map((node) => ({ ...node, previousNode: null }))
    );
    setGrid(newGrid);
};

// Helper functions to get the source and target nodes
export const getSourceNode = () => {
    for (const row of grid) {
        for (const node of row) {
            if (node.isSource) return node;
        }
    }
};

export const getTargetNode = () => {
    for (const row of grid) {
        for (const node of row) {
            if (node.isTarget) return node;
        }
    }
};
