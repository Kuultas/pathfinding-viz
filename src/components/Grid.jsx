import { useState, useEffect } from "react";
import styled from "styled-components";
import Node from "./Node";

const StyledGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(${(props) => props.rows}, 50px);
  grid-template-columns: repeat(${(props) => props.cols}, 50px);
  column-gap: 5px;
  row-gap: 5px;
`;

const GridForm = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
`;

const GridInput = styled.input`
  width: 10%;
  border: 1px solid lightcoral;
  border-radius: 5px;
  padding: 10px 10px;
  margin: 10px 5px;
`;

const GridButton = styled.button`
  border: 1px solid lightcoral;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 5px;
  cursor: pointer;
`;

const Grid = () => {
  // store input values
  const [colInp, setColInp] = useState(0);
  const [rowInp, setRowInp] = useState(0);

  // main input values set only when generate grid button pressed
  const [cols, setCols] = useState(10);
  const [rows, setRows] = useState(10);

  // array of cells grid size is based upon
  const [cells, setCells] = useState([]);

  // track selected cells
  const [selectedCells, setSelectedCells] = useState([]);

  // designate a start and end node
  const [startNode, setStartNode] = useState([]);
  const [endNode, setEndNode] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCols(colInp);
    setRows(rowInp);
  };

  useEffect(() => {
    const loadCells = () => {
      const gridCells = [];
      for (let x = 0; x < rows; x++) {
        for (let y = 0; y < cols; y++) {
          gridCells.push(
            <Node
              key={"".concat(x.toString(), ", ", y.toString())}
              x={x}
              y={y}
            ></Node>
          );
        }
      }

      setCells(gridCells);
    };
    loadCells();
  }, [rows, cols]);

  return (
    <>
      <GridForm id="gridSizeForm" onSubmit={handleSubmit}>
        <GridInput
          type="number"
          min="1"
          max="15"
          id="rowInput"
          onChange={(e) => setRowInp(e.target.value)}
          placeholder="rows"
          required
        />
        <GridInput
          type="number"
          min="1"
          max="35"
          id="colInput"
          onChange={(e) => setColInp(e.target.value)}
          placeholder="cols"
          required
        />
        <GridButton id="gridSizeBtn" type="submit">
          generate grid
        </GridButton>
      </GridForm>
      <StyledGrid id="mainGrid" cols={cols} rows={rows}>
        {cells}
      </StyledGrid>
    </>
  );
};

export default Grid;
