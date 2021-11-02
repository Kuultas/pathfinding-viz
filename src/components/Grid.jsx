import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Node from './Node';
import { dijkstra, getPath } from '../algorithms/dijkstra';
import { recursiveMaze } from '../algorithms/recursiveMaze';
import { ConfigContext } from '../contexts/ConfigContext';

const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(${(props) => props.cols}, 1fr);
    grid-template-rows: repeat(${(props) => props.rows}, 1fr);
    aspect-ratio: 1;
`;

const Grid = ({ cols, rows, nodeSize }) => {
    const [nodes, setNodes] = useState([]);
    const [sourceNode, setSourceNode] = useState({ col: 1, row: 1 });
    const [targetNode, setTargetNode] = useState({
        col: cols - 2,
        row: rows - 2,
    });
    const [walls, setWalls] = useState([]);
    const [visited, setVisited] = useState([]);
    const [path, setPath] = useState([]);
    const [currentMouseTarget, setCurrentMouseTarget] = useState({
        row: 0,
        col: 0,
    });
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    const [sourceIsMoving, setSourceIsMoving] = useState(false);
    const [targetIsMoving, setTargetIsMoving] = useState(false);
    const ctx = useContext(ConfigContext);

    const isSource = (col, row) => {
        return col === sourceNode.col && row === sourceNode.row;
    };

    const isTarget = (col, row) => {
        return col === targetNode.col && row === targetNode.row;
    };

    const getNodeIndex = (col, row, nodes) => {
        return nodes.findIndex((item) => item.col === col && item.row === row);
    };

    const toggleWall = (col, row) => {
        const wall = { col: col, row: row };
        const wallIndex = getNodeIndex(col, row, walls);

        if (isSource(col, row) || isTarget(col, row)) return;

        if (wallIndex < 0) {
            setWalls([...walls, wall]);
        } else {
            const tempWalls = [
                ...walls.slice(0, wallIndex),
                ...walls.slice(wallIndex + 1),
            ];
            setWalls(tempWalls);
        }

        if (nodes[row][col].isPath) {
            nodes[row][col].isPath = false;
        }
    };

    const handleClick = () => {
        toggleWall(currentMouseTarget.col, currentMouseTarget.row);
    };

    const handleMouseDown = () => {
        if (isSource(currentMouseTarget.col, currentMouseTarget.row)) {
            setSourceIsMoving(true);
        } else if (isTarget(currentMouseTarget.col, currentMouseTarget.row)) {
            setTargetIsMoving(true);
        }

        setMouseIsPressed(true);
    };

    const handleMouseOver = (e) => {
        if (e.target.id === 'ignore') return;
        if (e.target.id === 'mainGrid') return;

        const result = e.target.id.split('-');
        result.map((node) => parseInt(node));
        setCurrentMouseTarget({
            col: parseInt(result[0]),
            row: parseInt(result[1]),
        });

        if (!mouseIsPressed) return;

        if (sourceIsMoving || targetIsMoving) return;

        toggleWall(currentMouseTarget.col, currentMouseTarget.row);
    };

    const handleMouseUp = () => {
        setMouseIsPressed(false);

        if (sourceIsMoving) {
            setSourceNode({
                col: currentMouseTarget.col,
                row: currentMouseTarget.row,
            });

            if (
                getNodeIndex(
                    currentMouseTarget.col,
                    currentMouseTarget.row,
                    walls
                ) >= 0
            ) {
                toggleWall(currentMouseTarget.col, currentMouseTarget.row);
            }

            setSourceIsMoving(false);
        }

        if (targetIsMoving) {
            setTargetNode({
                col: currentMouseTarget.col,
                row: currentMouseTarget.row,
            });

            if (
                getNodeIndex(
                    currentMouseTarget.col,
                    currentMouseTarget.row,
                    walls
                ) >= 0
            ) {
                toggleWall(currentMouseTarget.col, currentMouseTarget.row);
            }

            setTargetIsMoving(false);
        }
    };

    const handleMouseLeave = () => {
        setMouseIsPressed(false);
    };

    const createNode = (col, row) => {
        return {
            isWall: getNodeIndex(col, row, walls) >= 0,
            col,
            row,
            isSource: isSource(col, row),
            isTarget: isTarget(col, row),
            distance: isSource(col, row) ? 0 : Infinity,
            isVisited: getNodeIndex(col, row, visited) >= 0,
            isPath: getNodeIndex(col, row, path) >= 0,
            previousNode: null,
        };
    };

    const animateDijkstra = (grid) => {
        const visitedNodes = dijkstra(grid);
        const pathNodes = getPath(visitedNodes);

        setVisited([]);
        setPath([]);

        for (let i = 0; i < visitedNodes.length; i++) {
            setTimeout(() => {
                setVisited([...visitedNodes.slice(0, i)]);
            }, 100);
        }

        for (let i = 0; i < pathNodes.length; i++) {
            setTimeout(() => {
                setPath([...pathNodes.slice(0, i)]);
            }, 150);
        }
    };

    const visualizeDijkstra = (grid) => {
        const visitedNodes = dijkstra(grid);
        const pathNodes = getPath(visitedNodes);

        setVisited(visitedNodes);
        setPath(pathNodes);
    };

    const animateMaze = (grid) => {
        let wallNodes = recursiveMaze(grid, 0, grid[0].length, 0, grid.length);
        wallNodes = getWalls(wallNodes);
        let borderNodes = [];

        setWalls([]);
        setVisited([]);
        setPath([]);

        setSourceNode({ col: 1, row: 1 });
        setTargetNode({ col: cols - 2, row: rows - 2 });

        // clear nodes
        setNodes(nodes.map((row) => row.map((node) => (node.isWall = false))));
        setNodes(
            nodes.map((row) => row.map((node) => (node.isVisited = false)))
        );
        setNodes(nodes.map((row) => row.map((node) => (node.isPath = false))));

        // top border
        for (let i = 0; i < grid[0].length; i++) {
            borderNodes.unshift({ col: i, row: 0 });
        }

        // right border
        for (let i = 0; i < grid.length; i++) {
            borderNodes.push({ col: grid[0].length - 1, row: i });
        }

        // bottom border
        for (let i = 0; i < grid[0].length; i++) {
            borderNodes.push({ col: i, row: grid.length - 1 });
        }

        // left border
        for (let i = 0; i < grid.length; i++) {
            borderNodes.unshift({ col: 0, row: i });
        }

        borderNodes.forEach((node) => wallNodes.unshift(node));

        // draw walls
        for (let i = 0; i < wallNodes.length; i++) {
            setTimeout(() => {
                setWalls([...wallNodes.slice(0, i)]);
            }, 10 * 4 * i);
        }
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

    useEffect(() => {
        const setupGrid = () => {
            const nodeCells = [];
            for (let row = 0; row < rows; row++) {
                let currentRow = [];
                for (let col = 0; col < cols; col++) {
                    let node = createNode(col, row);
                    node.element = (
                        <Node
                            row={row}
                            col={col}
                            colors={ctx.config.colors}
                            key={`node-${col}-${row}`}
                            isSource={node.isSource}
                            isTarget={node.isTarget}
                            isWall={node.isWall}
                            isPath={node.isPath}
                            isVisited={node.isVisited}></Node>
                    );
                    currentRow.push(node);
                }
                nodeCells.push(currentRow);
            }

            setNodes(nodeCells);
        };
        setupGrid();
    }, [ctx.config.colors, sourceNode, targetNode, walls, path, visited]);

    return (
        <>
            <button onClick={() => animateDijkstra(nodes)}>DIJKSTRA</button>
            <button onClick={() => visualizeDijkstra(nodes)}></button>
            <button onClick={() => animateMaze(nodes)}>MAZE</button>
            <StyledGrid
                id='mainGrid'
                rows={rows}
                cols={cols}
                nodeSize={nodeSize}
                onClick={handleClick}
                onMouseDown={handleMouseDown}
                onMouseOver={handleMouseOver}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}>
                {nodes.map((row) => {
                    return row.map((node) => node.element);
                })}
            </StyledGrid>
        </>
    );
};

export default Grid;
