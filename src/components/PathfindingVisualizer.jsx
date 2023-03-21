import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Node from './Node';
import { dijkstra, getPath } from '../algorithms/dijkstra';
import { recursiveMaze } from '../algorithms/recursiveMaze';
import LegendPanel from './LegendPanel';
import OptionsPanel from './OptionsPanel';
import { isMobile } from 'react-device-detect';

const Grid = styled.div`
    display: grid;
    width: 99vw;
    height: 88vh;
    grid-template-columns: repeat(${(props) => props.cols}, 1fr);
    grid-template-rows: repeat(${(props) => props.rows}, 1fr);
    margin-top: 1vh;
`;

const createNode = (col, row) => {
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

const initializeGrid = (rows, cols) => {
    const newGrid = [];
    for (let row = 0; row < rows; row++) {
        const currentRow = [];
        for (let col = 0; col < cols; col++) {
            currentRow.push(createNode(col, row));
        }
        newGrid.push(currentRow);
    }
    newGrid[1][1].isSource = true;
    newGrid[rows - 2][cols - 2].isTarget = true;
    return newGrid;
};

const PathfindingVisualizer = () => {
    const [rows, setRows] = useState(isMobile ? 15 : 30);
    const [cols, setCols] = useState(isMobile ? 10 : 50);
    const [grid, setGrid] = useState(() => initializeGrid(rows, cols));
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    const [sourceIsMoving, setSourceIsMoving] = useState(false);
    const [targetIsMoving, setTargetIsMoving] = useState(false);
    const [reset, setReset] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const [colors, setColors] = useState({
        visited: "#8C8C8C",
        path: "#FEB562",
        start: "#2478FF",
        end: "#FF4242",
        wall: "#6EC3D8",
    });
    const [algorithm, setAlgorithm] = useState("dijkstra");
    const [maze, setMaze] = useState("recursive-division");
    const [speed, setSpeed] = useState(1);

    useEffect(() => {
        setGrid(initializeGrid(rows, cols));
    }, [rows, cols]);

    useEffect(() => {
        setReset(false);
        setHasAnimated(false);
    }, [reset]);

    const resetToggle = () => {
        setReset(true);
    };

    const toggleWall = (col, row) => {
        if (grid[row][col].isSource || grid[row][col].isTarget) return;
        const newGrid = grid.map((row) => [...row]);
        newGrid[row][col].isWall = !newGrid[row][col].isWall;
        setGrid(newGrid);
    };

    const getSourceNode = () => {
        for (const row of grid) {
            for (const node of row) {
                if (node.isSource) return node;
            }
        }
    };

    const clearSource = () => {
        const newGrid = grid.map((row) =>
            row.map((node) => ({ ...node, isSource: false }))
        );
        setGrid(newGrid);
    };

    const getTargetNode = () => {
        for (const row of grid) {
            for (const node of row) {
                if (node.isTarget) return node;
            }
        }
    };

    const clearTarget = () => {
        const newGrid = grid.map((row) =>
            row.map((node) => ({ ...node, isTarget: false }))
        );
        setGrid(newGrid);
    };

    const clearWalls = () => {
        const newGrid = grid.map((row) =>
            row.map((node) => ({ ...node, isWall: false }))
        );
        setGrid(newGrid);
    };

    const clearVisited = () => {
        const newGrid = grid.map((row) =>
            row.map((node) => ({ ...node, isVisited: false }))
        );
        setGrid(newGrid);
    };

    const clearPath = () => {
        const newGrid = grid.map((row) =>
            row.map((node) => ({ ...node, isPath: false }))
        );
        setGrid(newGrid);
    };

    const clearDistance = () => {
        const newGrid = grid.map((row) =>
            row.map((node) => ({ ...node, distance: Infinity }))
        );
        setGrid(newGrid);
    };

    const clearPrevious = () => {
        const newGrid = grid.map((row) =>
            row.map((node) => ({ ...node, previousNode: null }))
        );
        setGrid(newGrid);
    };

    const handleMouseDown = (col, row) => {
        if (grid[row][col].isSource) setSourceIsMoving(true);
        if (grid[row][col].isTarget) setTargetIsMoving(true);
        toggleWall(col, row);
        setMouseIsPressed(true);
    };

    const handleMouseEnter = (col, row) => {
        if (sourceIsMoving) {
            const newGrid = grid.map((row) => [...row]);
            clearSource();
            newGrid[row][col].isSource = true;
            setGrid(newGrid);
            if (hasAnimated) visualizeDijkstra(grid, getSourceNode());
        }
        if (targetIsMoving) {
            const newGrid = grid.map((row) => [...row]);
            clearTarget();
            newGrid[row][col].isTarget = true;
            setGrid(newGrid);
            if (hasAnimated) visualizeDijkstra(grid, getSourceNode());
        }
        if (mouseIsPressed) toggleWall(col, row);
    };

    const handleMouseUp = () => {
        setMouseIsPressed(false);
        setSourceIsMoving(false);
        setTargetIsMoving(false);
    };

    const animateDijkstra = async (sourceNode) => {
        setHasAnimated(true);

        clearDistance();
        clearPrevious();
        clearPath();
        clearVisited();

        getSourceNode().isWall = false;
        getTargetNode().isWall = false;

        const visitedNodes = await dijkstra(grid, sourceNode);
        const nodesInShortestPathOrder = getPath(getTargetNode());

        clearVisited();

        for (let i = 0; i <= visitedNodes.length - 1; i++) {
            if (visitedNodes[i].isTarget) {
                setTimeout(() => {
                    animatePath(nodesInShortestPathOrder);
                }, 15 * i * speed);
                return;
            }
            setTimeout(() => {
                const newGrid = grid.map((row) => [...row]);
                const node = visitedNodes[i];
                node.isVisited = true;
                setGrid(newGrid);
            }, 15 * i * speed);
        }
    };

    const visualizeDijkstra = (sourceNode) => {
        clearDistance();
        clearPrevious();
        clearPath();
        clearVisited();

        const visitedNodes = dijkstra(grid, sourceNode);
        const nodesInShortestPathOrder = getPath(getTargetNode());

        clearVisited();

        const newGrid = grid.map((row) => [...row]);

        visitedNodes.forEach((node) => {
            newGrid[node.row][node.col].isVisited = true;
        });

        nodesInShortestPathOrder.forEach((node) => {
            newGrid[node.row][node.col].isPath = true;
        });

        setGrid(newGrid);
    };

    const animatePath = async (pathNodes) => {
        for (let i = 0; i < pathNodes.length; i++) {
            await new Promise((resolve) => setTimeout(resolve, 20 * speed));
            const newGrid = grid.map((row) => [...row]);
            const node = pathNodes[i];
            node.isPath = true;
            setGrid(newGrid);
        }
    };

    const animateRecursiveMaze = async () => {
        let wallNodes = recursiveMaze(grid, 0, grid[0].length, 0, grid.length);

        clearVisited();
        clearPath();
        clearWalls();

        for (let i = 0; i < wallNodes.length; i++) {
            await new Promise((resolve) => setTimeout(resolve, 15 * speed));
            const newGrid = grid.map((row) => [...row]);
            const node = wallNodes[i];
            node.isWall = true;
            setGrid(newGrid);
        }
    };

    useEffect(() => {
        const createNode = (col, row) => {
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

        const initializeGrid = () => {
            const newGrid = [];
            for (let row = 0; row < rows; row++) {
                const currentRow = [];
                for (let col = 0; col < cols; col++) {
                    currentRow.push(createNode(col, row));
                }
                newGrid.push(currentRow);
            }

            newGrid[1][1].isSource = true;
            newGrid[rows - 2][cols - 2].isTarget = true;
            return newGrid;
        };

        setGrid(initializeGrid());
    }, [cols, rows]);

    return (
        <>
            <OptionsPanel
                setRows={setRows}
                setCols={setCols}
                setAlgorithm={setAlgorithm}
                setMaze={setMaze}
                setSpeed={setSpeed}
            ></OptionsPanel>
            <LegendPanel
                animateDijkstra={() => animateDijkstra(getSourceNode())}
                animateRecursiveMaze={animateRecursiveMaze}
                reset={resetToggle}
                setColors={setColors}
                algorithm={algorithm}
                maze={maze}
            ></LegendPanel>
            <StyledGrid id="mainGrid" rows={rows} cols={cols}>
                {grid.map((row) => {
                    return row.map((node) => (
                        <Node
                            col={node.col}
                            row={node.row}
                            colors={colors}
                            key={`node-${node.col}-${node.row}`}
                            isSource={node.isSource}
                            isTarget={node.isTarget}
                            isWall={node.isWall}
                            isPath={node.isPath}
                            isVisited={node.isVisited}
                            distance={node.distance}
                            onMouseDown={(col, row) =>
                                handleMouseDown(col, row)
                            }
                            onMouseEnter={(col, row) =>
                                handleMouseEnter(col, row)
                            }
                            onMouseUp={() => handleMouseUp()}
                        ></Node>
                    ));
                })}
            </StyledGrid>
        </>
    );
};

export default PathfindingVisualizer;
                    