<<<<<<< HEAD
import { useState, useContext } from 'react';
import { isMobile } from 'react-device-detect';
import Grid from './Grid';
import styled from 'styled-components';
import OptionsPanel from './OptionsPanel';
import { ConfigContext } from '../contexts/ConfigContext';
import ColorPicker from './ColorPicker';

const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const PathfindingVisualizer = () => {
    const ctx = useContext(ConfigContext);
    const { config } = ctx;

    return (
        <Container className='appContainer'>
            <OptionsPanel></OptionsPanel>
            <Grid
                cols={config.gridSize.cols}
                rows={config.gridSize.rows}
            ></Grid>
        </Container>
    );
=======
import { useState, useEffect } from "react";
import Grid from "./Grid";

import styled from "styled-components";

const OptionsPanel = styled.div`
  padding: 10px;
  display: flex;
`;

const PageTitle = styled.h1`
  margin-bottom: 0;
  width: 30%;
  text-align: center;
  font-size: 26px;
`;

const GridForm = styled.form`
  padding: 25px;

  display: flex;
  justify-content: center;

  flex-basis: 100%;
  flex: 1;
`;

const GridInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 1px;
  border: 1px solid #6e6e6e;
  border-radius: 5px;
  text-align: center;
`;

const GridButton = styled.button`
  margin: 1px;
  border: 1px solid #6e6e6e;
  border-radius: 5px;
  cursor: pointer;
`;

const PathfindingVisualizer = () => {
  const [cols, setCols] = useState(35);
  const [rows, setRows] = useState(20);
  const [config, setConfig] = useState({ cols, rows });
  const [algorithm, setAlgorithm] = useState("dijkstra");
  const [wallTemplate, setWallTemplate] = useState("recursiveMaze");

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfig({ ...config, cols: cols, rows: rows });
  };

  return (
    <>
      <PageTitle>pathfinding visualizer</PageTitle>
      <OptionsPanel>
        <GridForm onSubmit={handleSubmit}>
          <GridInput
            type="number"
            min="5"
            max="50"
            placeholder="rows"
            required
            onChange={(e) => setRows(e.target.value)}
          ></GridInput>
          <GridInput
            type="number"
            min="5"
            max="50"
            placeholder="cols"
            required
            onChange={(e) => setCols(e.target.value)}
          ></GridInput>
          <GridButton type="submit">new grid</GridButton>
        </GridForm>
      </OptionsPanel>
      <Grid cols={config.cols} rows={config.rows}></Grid>
    </>
  );
>>>>>>> dev
};

export default PathfindingVisualizer;
