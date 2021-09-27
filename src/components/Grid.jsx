import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Node from "./Node";
import { ConfigContext } from "../contexts/ConfigContext";

const StyledGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(${(props) => props.rows}, 50px);
  grid-template-columns: repeat(${(props) => props.cols}, 50px);
  column-gap: 5px;
  row-gap: 5px;
`;

const Grid = () => {
  const [cells, setCells] = useState([]);
  const { config, setConfig } = useContext(ConfigContext);

  useEffect(() => {
    const loadCells = () => {
      const gridCells = [];
      for (let x = 0; x < config.rows; x++) {
        for (let y = 0; y < config.cols; y++) {
          gridCells.push(<Node key={`node-${x}-${y}`} coords={[x, y]}></Node>);
        }
      }

      setCells(gridCells);
    };
    loadCells();
  }, [config.rows, config.cols]);

  return (
    <StyledGrid id="mainGrid" cols={config.cols} rows={config.rows}>
      {cells}
    </StyledGrid>
  );
};

export default Grid;
