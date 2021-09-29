import { useContext } from "react";
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
  const { config } = useContext(ConfigContext);

  return (
    <>
      <PageTitle>Pathfinding</PageTitle>
      <OptionsPanel></OptionsPanel>
      <Grid rows={15} cols={35}></Grid>
    </>
  );
};

export default PathfindingVisualizer;
