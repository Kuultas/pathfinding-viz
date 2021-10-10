import { useState, useEffect } from "react";
import styled from "styled-components";
import Node from "./Node";

const StyledGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(${(props) => props.rows}, 35px);
  grid-template-columns: repeat(${(props) => props.cols}, 35px);
  column-gap: 1px;
  row-gap: 1px;
`;

const Grid = ({ cols, rows }) => {
  // grid state
  const [nodes, setNodes] = useState([]);
  const [walls, setWalls] = useState([]);
  const [sourceNode, setSourceNode] = useState({ col: 1, row: 1 });
  const [targetNode, setTargetNode] = useState({ col: 4, row: 4 });

  // activity state
  const [currentMouseTarget, setCurrentMouseTarget] = useState({
    row: 0,
    col: 0,
  });
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [sourceIsMoving, setSourceIsMoving] = useState(false);
  const [targetIsMoving, setTargetIsMoving] = useState(false);

  const isSource = (col, row) => {
    return col === sourceNode.col && row === sourceNode.row;
  };

  const isTarget = (col, row) => {
    return col === targetNode.col && row === targetNode.row;
  };

  const getWallIndex = (col, row) => {
    return walls.findIndex((item) => item.col === col && item.row === row);
  };

  const toggleWall = (col, row) => {
    const wall = { col: col, row: row };
    const wallIndex = getWallIndex(col, row);
    console.log(wallIndex);

    if (wallIndex < 0) {
      setWalls([...walls, wall]);
      console.log(walls);
    } else {
      const tempWalls = [
        ...walls.slice(0, wallIndex),
        ...walls.slice(wallIndex + 1),
      ];
      setWalls(tempWalls);
      console.log(walls);
    }
  };

  const handleClick = (e) => {
    if (
      isSource(currentMouseTarget.col, currentMouseTarget.row) ||
      isTarget(currentMouseTarget.col, currentMouseTarget.row)
    )
      return;
    toggleWall(currentMouseTarget.col, currentMouseTarget.row);
  };

  const handleMouseDown = (e) => {
    if (isSource(currentMouseTarget.col, currentMouseTarget.row)) {
      setSourceIsMoving(true);
      return;
    } else if (isTarget(currentMouseTarget.col, currentMouseTarget.row)) {
      setTargetIsMoving(true);
      return;
    }

    setMouseIsPressed(true);
  };

  const handleMouseOver = (e) => {
    if (e.target.id === "mainGrid") return;

    const result = e.target.id.split("-");
    result.map((node) => parseInt(node));
    setCurrentMouseTarget({
      col: parseInt(result[0]),
      row: parseInt(result[1]),
    });

    if (!mouseIsPressed) return;

    if (
      isSource(currentMouseTarget.col, currentMouseTarget.row) ||
      isTarget(currentMouseTarget.col, currentMouseTarget.row)
    )
      return;

    if (sourceIsMoving || targetIsMoving) return;

    toggleWall(currentMouseTarget.col, currentMouseTarget.row);
  };

  const handleMouseUp = (e) => {
    setMouseIsPressed(false);

    if (sourceIsMoving) {
      setSourceNode({
        col: currentMouseTarget.col,
        row: currentMouseTarget.row,
      });
      if (getWallIndex(currentMouseTarget.col, currentMouseTarget.row) >= 0) {
        toggleWall(currentMouseTarget.col, currentMouseTarget.row);
      }

      setSourceIsMoving(false);
    }

    if (targetIsMoving) {
      setTargetNode({
        col: currentMouseTarget.col,
        row: currentMouseTarget.row,
      });
      if (getWallIndex(currentMouseTarget.col, currentMouseTarget.row) >= 0) {
        toggleWall(currentMouseTarget.col, currentMouseTarget.row);
      }

      setTargetIsMoving(false);
    }

    if (
      isSource(currentMouseTarget.col, currentMouseTarget.row) ||
      isTarget(currentMouseTarget.col, currentMouseTarget.row)
    )
      return;
  };

  const handleMouseLeave = (e) => {
    setMouseIsPressed(false);
  };

  const createNode = (col, row) => {
    return {
      col,
      row,
      isSource: isSource(col, row),
      isTarget: isTarget(col, row),
      distance: row === sourceNode.row && col === sourceNode.col ? 0 : Infinity,
      isWall: getWallIndex(col, row) >= 0,
      isVisited: false,
    };
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
              key={`node-${col}-${row}`}
              isSource={node.isSource}
              isTarget={node.isTarget}
              isWall={node.isWall}
            ></Node>
          );
          currentRow.push(node);
        }
        nodeCells.push(currentRow);
      }

      setNodes(nodeCells);
    };
    setupGrid();
  }, [
    cols,
    rows,
    walls,
    sourceNode.row,
    sourceNode.col,
    targetNode.row,
    targetNode.col,
  ]);

  return (
    <>
      <button onClick={() => console.log(nodes)}>click</button>
      <StyledGrid
        id="mainGrid"
        rows={rows}
        cols={cols}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseOver={handleMouseOver}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {nodes.map((row) => {
          return row.map((node) => node.element);
        })}
      </StyledGrid>
    </>
  );
};

export default Grid;
