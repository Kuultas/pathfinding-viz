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
  const [sourceNode, setSourceNode] = useState({ col: 0, row: 0 });
  const [targetNode, setTargetNode] = useState({ col: 4, row: 4 });

  // activity state
  const [currentMouseTarget, setCurrentMouseTarget] = useState({
    row: 0,
    col: 0,
  });
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [sourceIsMoving, setSourceIsMoving] = useState(false);
  const [targetIsMoving, setTargetIsMoving] = useState(false);

  const currentIsSource = () => {
    if (
      currentMouseTarget.col === sourceNode.col &&
      currentMouseTarget.row === sourceNode.row
    ) {
      return true;
    }
  };

  const currentIsTarget = () => {
    if (
      currentMouseTarget.col === targetNode.col &&
      currentMouseTarget.row === targetNode.row
    ) {
      return true;
    }
  };

  const toggleWall = (col, row) => {};

  const handleClick = (e) => {
    if (currentIsSource() || currentIsTarget()) return;
    toggleWall(currentMouseTarget.col, currentMouseTarget.row);
  };

  const handleMouseDown = (e) => {
    if (currentIsSource()) {
      setSourceIsMoving(true);
      return;
    } else if (currentIsTarget()) {
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

    if (currentIsSource() || currentIsTarget()) return;

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

      setSourceIsMoving(false);
    }

    if (targetIsMoving) {
      setTargetNode({
        col: currentMouseTarget.col,
        row: currentMouseTarget.row,
      });

      setTargetIsMoving(false);
    }

    if (currentIsSource() || currentIsTarget()) return;
  };

  const handleMouseLeave = (e) => {
    setMouseIsPressed(false);
  };

  useEffect(() => {
    const createNode = (col, row) => {
      return {
        col,
        row,
        isSource: row === sourceNode.row && col === sourceNode.col,
        isTarget: row === targetNode.row && col === targetNode.col,
        distance:
          row === sourceNode.row && col === sourceNode.col ? 0 : Infinity,
        isWall: null,
        isVisited: false,
      };
    };

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
        {nodes.map((row, rowIdx) => {
          return <div key={rowIdx}>{row.map((node) => node.element)}</div>;
        })}
      </StyledGrid>
    </>
  );
};

export default Grid;
