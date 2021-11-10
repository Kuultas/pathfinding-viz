import { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import Node from './Node';
import { ConfigContext } from '../contexts/ConfigContext';
import { dijkstra, getPath } from '../algorithms/dijkstra';
import { recursiveMaze } from '../algorithms/recursiveMaze';

const StyledGrid = styled.div`
    display: grid;
    width: 95vw;
    height: 85vh;
    grid-template-columns: repeat(${(props) => props.cols}, 1fr);
    grid-template-rows: repeat(${(props) => props.rows}, 1fr);
`;

const TempUIButton = styled.button`
    background-color: #3a3a3a;
    border: none;
    border-radius: 5px;
    padding: 5px;
    margin: 5px;
    cursor: pointer;
`;

const Grid = ({ cols, rows }) => {
    const ctx = useContext(ConfigContext);
    const { config } = ctx;
    const [grid, setGrid] = useState([]);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    const [sourceIsMoving, setSourceIsMoving] = useState(false);
    const [targetIsMoving, setTargetIsMoving] = useState(false);
    const [reset, setReset] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);

    const resetToggle = () => {
        setReset(!reset);
    };

    const toggleWall = (col, row) => {
        if (grid[row][col].isSource || grid[row][col].isTarget) return;
        const newGrid = grid.slice();
        newGrid[row][col].isWall = !newGrid[row][col].isWall;
        setGrid(newGrid);
    };

    const getSourceNode = (grid) => {
        for (const row of grid) {
            for (const node of row) {
                if (node.isSource) return node;
            }
        }
    };

    const clearSource = () => {
        const newGrid = grid.slice();
        newGrid.forEach((row) => {
            row.forEach((node) => {
                node.isSource = false;
            });
        });
        setGrid(newGrid);
    };

    const getTargetNode = (grid) => {
        for (const row of grid) {
            for (const node of row) {
                if (node.isTarget) return node;
            }
        }
    };

    const clearTarget = () => {
        const newGrid = grid.slice();
        newGrid.forEach((row) => {
            row.forEach((node) => {
                node.isTarget = false;
            });
        });
        setGrid(newGrid);
    };

    const clearWalls = () => {
        const newGrid = grid.slice();
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                newGrid[row][col].isWall = false;
            }
        }
        setGrid(newGrid);
    };

    const clearVisited = () => {
        const newGrid = grid.slice();
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                newGrid[row][col].isVisited = false;
            }
        }
        setGrid(newGrid);
    };

    const clearPath = () => {
        const newGrid = grid.slice();
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                newGrid[row][col].isPath = false;
            }
        }
        setGrid(newGrid);
    };

    const clearDistance = () => {
        const newGrid = grid.slice();
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                newGrid[row][col].distance = Infinity;
            }
        }
        setGrid(newGrid);
    };

    const clearPrevious = () => {
        const newGrid = grid.slice();
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                newGrid[row][col].previousNode = null;
            }
        }
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
            const newGrid = grid.slice();
            clearSource();
            newGrid[row][col].isSource = true;
            setGrid(newGrid);

            if (hasAnimated) visualizeDijkstra(grid, getSourceNode(grid));
        }
        if (targetIsMoving) {
            const newGrid = grid.slice();
            clearTarget();
            newGrid[row][col].isTarget = true;
            setGrid(newGrid);

            if (hasAnimated) visualizeDijkstra(grid, getSourceNode(grid));
        }

        if (mouseIsPressed) toggleWall(col, row);
    };

    const handleMouseUp = () => {
        setMouseIsPressed(false);
        setSourceIsMoving(false);
        setTargetIsMoving(false);
    };

    const animateDijkstra = (grid, sourceNode) => {
        setHasAnimated(true);

        clearDistance();
        clearPrevious();
        clearPath();
        clearVisited();

        getSourceNode(grid).isWall = false;
        getTargetNode(grid).isWall = false;

        const visitedNodes = dijkstra(grid, sourceNode);
        const nodesInShortestPathOrder = getPath(getTargetNode(grid));

        clearVisited();

        for (let i = 0; i <= visitedNodes.length - 1; i++) {
            if (visitedNodes[i].isTarget) {
                setTimeout(() => {
                    animatePath(nodesInShortestPathOrder);
                }, 15 * i * config.speed);
                return;
            }
            setTimeout(() => {
                const newGrid = grid.slice();
                const node = visitedNodes[i];
                node.isVisited = true;
                setGrid(newGrid);
            }, 15 * i * config.speed);
        }
    };

    const visualizeDijkstra = (grid, sourceNode) => {
        clearDistance();
        clearPrevious();
        clearPath();
        clearVisited();

        const visitedNodes = dijkstra(grid, sourceNode);
        const nodesInShortestPathOrder = getPath(getTargetNode(grid));

        clearVisited();

        for (const node of visitedNodes) {
            node.isVisited = true;
        }

        for (const node of nodesInShortestPathOrder) {
            node.isPath = true;
        }
    };

    const animatePath = (pathNodes) => {
        for (let i = 0; i < pathNodes.length; i++) {
            setTimeout(() => {
                const newGrid = grid.slice();
                const node = pathNodes[i];
                node.isPath = true;
                setGrid(newGrid);
            });
        }
    };

    const animateRecursiveMaze = (grid) => {
        let wallNodes = recursiveMaze(grid, 0, grid[0].length, 0, grid.length);

        clearVisited();
        clearPath();
        clearWalls();

        for (let i = 0; i < wallNodes.length; i++) {
            setTimeout(() => {
                const newGrid = grid.slice();
                const node = wallNodes[i];
                node.isWall = true;
                setGrid(newGrid);
            }, 15 * i * config.speed);
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
    }, [cols, rows, reset]);

    return (
        <>
            <div>
                <TempUIButton onClick={resetToggle}>reset</TempUIButton>
                <TempUIButton
                    onClick={() => animateDijkstra(grid, getSourceNode(grid))}
                >
                    dijkstra
                </TempUIButton>
                <TempUIButton onClick={() => animateRecursiveMaze(grid)}>
                    recursive maze
                </TempUIButton>
            </div>
            <StyledGrid id='mainGrid' rows={rows} cols={cols}>
                {grid.map((row) => {
                    return row.map((node) => (
                        <Node
                            col={node.col}
                            row={node.row}
                            colors={ctx.config.colors}
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

export default Grid;
