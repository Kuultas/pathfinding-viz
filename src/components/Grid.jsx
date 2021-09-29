import { useState, useEffect, useContext } from "react";
import styled, { css } from "styled-components";
import { ConfigContext } from "../contexts/ConfigContext";
import Node from "./Node";

const StyledGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(${(props) => props.rows}, 50px);
  grid-template-columns: repeat(${(props) => props.cols}, 50px);
  column-gap: 5px;
  row-gap: 5px;
`;

const Grid = ({ cols, rows }) => {
  const [nodes, setNodes] = useState([]);
  const [nodeArr, setNodeArr] = useState([]);
  const [walls, setWalls] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [startNode, setStartNode] = useState({ x: 0, y: 2 });
  const [targetNode, setTargetNode] = useState({ x: 9, y: 2 });
  const [hoverTarget, setHoverTarget] = useState({});

  // alg stuff
  const [currentShortest, setCurrentShortest] = useState([]);
  const [exploredPaths, setExploredPaths] = useState([]);

  const findNodeIndex = (arr, x, y) => {
    const index = arr.findIndex((i) => i.x == x && i.y == y);
    return index;
  };

  const checkStart = (x, y) => {
    return x == startNode.x && y == startNode.y;
  };

  const checkEnd = (x, y) => {
    return x == targetNode.x && y == targetNode.y;
  };

  const checkWall = (x, y) => {
    const coords = { x: x, y: y };
    const index = walls.findIndex(
      (wall) => wall.x == coords.x && wall.y == coords.y
    );
    return index !== -1;
  };

  const toggleWall = (x, y) => {
    const index = findNodeIndex(walls, x, y);
    const wall = { x: x, y: y };
    if (index === -1) {
      setWalls([...walls, wall]);
    } else {
      const tempWalls = [...walls.slice(0, index), ...walls.slice(index + 1)];
      setWalls(tempWalls);
    }
  };

  const handleMouseDown = (e) => {
    setMouseIsPressed(true);
    if (checkStart(hoverTarget.x, hoverTarget.y)) return;
    if (checkEnd(hoverTarget.x, hoverTarget.y)) return;
    toggleWall(hoverTarget.x, hoverTarget.y);
  };

  const handleMouseOver = (e) => {
    if (e.target.id === "mainGrid") return;
    const x = e.target.id[5];
    const y = e.target.id[7];
    setHoverTarget({ x, y });
    if (!mouseIsPressed) return;
    if (checkStart(x, y)) return;
    if (checkEnd(x, y)) return;
    const idx = findNodeIndex(walls, x, y);
    toggleWall(x, y, idx);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  const handleMouseLeave = () => {
    setMouseIsPressed(false);
  };

  useEffect(() => {
    const loadCells = () => {
      const tempNodeArr = [];
      const gridCells = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          let startCheck = checkStart(x, y);
          let endCheck = checkEnd(x, y);
          let wallCheck = checkWall(x, y);
          tempNodeArr.push([x, y]);
          gridCells.push(
            <Node
              key={`node-${x}-${y}`}
              x={x}
              y={y}
              isStart={startCheck}
              isEnd={endCheck}
              isWall={wallCheck}
            ></Node>
          );
        }
      }
      setNodes(gridCells);
      setNodeArr(tempNodeArr);
    };
    loadCells();
  }, [cols, rows, walls]);

  return (
    <StyledGrid
      id="mainGrid"
      rows={rows}
      cols={cols}
      onMouseDown={handleMouseDown}
      onMouseOver={handleMouseOver}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {nodes}
    </StyledGrid>
  );
};

export default Grid;
