import { useState, useContext, useEffect } from "react";
import Grid from "./Grid";
import OptionsPanel from "./OptionsPanel";
import styled from "styled-components";
import { ConfigContext } from "../contexts/ConfigContext";

const PageTitle = styled.h1`
  width: 75%;
  text-align: center;
  font-size: 26px;
`;

const PathfindingVisualizer = () => {
  const { config, setConfig } = useContext(ConfigContext);

  return (
    <>
      <PageTitle>Pathfinding</PageTitle>
      <OptionsPanel></OptionsPanel>
      <Grid rows={config.rows} cols={config.cols}></Grid>
    </>
  );
};

export default PathfindingVisualizer;
