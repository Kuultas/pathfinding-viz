import { jsxNamespacedName } from "@babel/types";
import { useState, useContext } from "react";
import styled from "styled-components";
import { ConfigContext } from "../contexts/ConfigContext";

const OptionsContainer = styled.div`
  width: 100%;
  display: flex;
`;

const GridForm = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const GridInput = styled.input`
  border: 1px solid lightcoral;
  border-radius: 5px;
  text-align: center;
`;

const GridButton = styled.button`
  border: 1px solid lightcoral;
  border-radius: 5px;
  cursor: pointer;
`;

const Options = () => {
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [xStart, setXStart] = useState(0);
  const [yStart, setYStart] = useState(0);
  const [xEnd, setXEnd] = useState(0);
  const [yEnd, setYEnd] = useState(0);

  const { config, setConfig } = useContext(ConfigContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfig({
      ...config,
      rows: rows,
      cols: cols,
      startNode: [parseInt(xStart), parseInt(yStart)],
      endNode: [parseInt(xEnd), parseInt(yEnd)],
    });
  };

  return (
    <OptionsContainer>
      <GridForm onSubmit={handleSubmit}>
        <GridInput
          type="number"
          min="1"
          max="15"
          placeholder="rows"
          onChange={(e) => setRows(e.target.value)}
          required
        ></GridInput>
        <GridInput
          type="number"
          min="1"
          max="35"
          placeholder="cols"
          onChange={(e) => setCols(e.target.value)}
          required
        ></GridInput>
        <GridInput
          type="number"
          min="1"
          max="35"
          placeholder="x"
          onChange={(e) => setXStart(e.target.value)}
          required
        ></GridInput>
        <GridInput
          type="number"
          min="1"
          max="35"
          placeholder="y"
          onChange={(e) => setYStart(e.target.value)}
          required
        ></GridInput>
        <GridInput
          type="number"
          min="1"
          max="35"
          placeholder="x"
          onChange={(e) => setXEnd(e.target.value)}
          required
        ></GridInput>
        <GridInput
          type="number"
          min="1"
          max="35"
          placeholder="y"
          onChange={(e) => setYEnd(e.target.value)}
          required
        ></GridInput>
        <GridButton type="submit">new grid</GridButton>
      </GridForm>
    </OptionsContainer>
  );
};

export default Options;
